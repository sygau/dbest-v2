// api/bus-checker.js
module.exports = async function handler(req, res) {
  const { stop, lat, lng, radius = 400, route } = req.query;
  
  try {
    let busData = [];
    
    // If specific route provided (easiest to test)
    if (route) {
      busData = await getBusRoute(route);
    }
    // If specific stop provided
    else if (stop) {
      busData = await getBusesAtStop(stop);
    }
    // If coordinates provided (simplified version)
    else if (lat && lng) {
      // For now, return nearby popular routes since coordinate-to-stop mapping is complex
      busData = await getNearbyPopularRoutes(parseFloat(lat), parseFloat(lng));
    }
    else {
      return res.status(400).json({ 
        error: 'Provide route, stop ID, or coordinates',
        examples: {
          route: '/api/bus-checker?route=1',
          stop: '/api/bus-checker?stop=001027',
          coordinates: '/api/bus-checker?lat=22.2816&lng=114.1588'
        }
      });
    }
    
    // Analyze service status
    const analysis = analyzeBusService(busData);
    
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    res.json({
      timestamp: new Date().toISOString(),
      location: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
      totalRoutes: busData.length,
      serviceStatus: analysis.overallStatus,
      alerts: analysis.alerts,
      buses: busData,
      summary: analysis.summary
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      suggestion: 'Try: /api/bus-checker?route=1'
    });
  }
}

// Get specific route information with all stops
async function getBusRoute(route) {
  try {
    // Get Citybus route stops
    const stopsResponse = await fetch(
      `https://rt.data.gov.hk/v2/transport/citybus/route-stop/CTB/${route}/outbound`
    );
    
    if (!stopsResponse.ok) {
      throw new Error(`Route ${route} not found`);
    }
    
    const stopsData = await stopsResponse.json();
    const stops = stopsData.data || [];
    
    if (stops.length === 0) {
      return [];
    }
    
    // Get ETA for first few stops
    const busRouteData = [];
    for (let i = 0; i < Math.min(3, stops.length); i++) {
      const stop = stops[i];
      const etaData = await getBusETA(stop.stop, route);
      
      if (etaData.length > 0) {
        busRouteData.push({
          route,
          company: 'CTB',
          stopId: stop.stop,
          stopName: `Stop ${stop.seq}`,
          nextBuses: etaData.slice(0, 3).map(bus => ({
            eta: bus.eta,
            remainingTime: calculateMinutes(bus.eta),
            remarks: bus.rmk_en || 'On time',
            destination: bus.dest_en
          }))
        });
      }
    }
    
    return busRouteData;
    
  } catch (error) {
    console.warn(`Error fetching route ${route}:`, error.message);
    return [];
  }
}

// Get buses at specific stop
async function getBusesAtStop(stopId) {
  try {
    // Predefined routes for stop 001272 (organized by priority)
    const routeConfig = {
      // Main/most common priority + school routes
      priority: ['2', '2A', '77', '99', '85', '85A', '8H', '81', '81A'],
      // Common for outings/travel
      common: ['722', '18X', '82'],
      // School routes but rare
      schoolRare: ['307P', '678'],
      // Less frequently used
      occasional: ['19P', '302A', '33X', '77A', 'A12', 'N8X', 'NA12']
    };
    
    // Flatten all routes into a single array
    const allRoutes = [
      ...routeConfig.priority,
      ...routeConfig.common, 
      ...routeConfig.schoolRare,
      ...routeConfig.occasional
    ];
    
    const busData = [];
    const unavailableRoutes = [];
    
    // Check each route for active service
    for (const route of allRoutes) {
      try {
        const etaData = await getBusETA(stopId, route, 'CTB');
        
        if (etaData.length > 0) {
          busData.push({
            route,
            company: 'CTB',
            stopId,
            stopName: `Stop ${stopId}`,
            nextBuses: etaData.slice(0, 3).map(bus => ({
              eta: bus.eta,
              remainingTime: calculateMinutes(bus.eta),
              remarks: bus.rmk_en || 'On time',
              destination: bus.dest_en
            }))
          });
        } else {
          unavailableRoutes.push(route);
        }
      } catch (error) {
        unavailableRoutes.push(route);
        continue;
      }
    }
    
    return busData;
    
  } catch (error) {
    console.warn(`Error fetching stop ${stopId}:`, error.message);
    return [];
  }
}

// Get popular routes near coordinates (simplified)
async function getNearbyPopularRoutes(lat, lng) {
  // Popular routes that likely serve Central/TST/major areas
  const popularRoutes = ['1', '5', '6', '10', '15', '70', '75', '90'];
  const nearbyBuses = [];
  
  // Test a few popular routes to see which have active service
  for (let i = 0; i < Math.min(5, popularRoutes.length); i++) {
    const route = popularRoutes[i];
    try {
      const routeData = await getBusRoute(route);
      if (routeData.length > 0) {
        nearbyBuses.push(...routeData.slice(0, 2)); // Add first 2 stops
      }
    } catch (error) {
      continue;
    }
  }
  
  return nearbyBuses;
}

// Get ETA data for specific stop and route
async function getBusETA(stop, route, company = 'CTB') {
  try {
    const response = await fetch(
      `https://rt.data.gov.hk/v2/transport/citybus/eta/${company}/${stop}/${route}`
    );
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.data || [];
    
  } catch (error) {
    return [];
  }
}

// Calculate minutes until ETA
function calculateMinutes(etaString) {
  try {
    const eta = new Date(etaString);
    const now = new Date();
    return Math.max(0, Math.round((eta - now) / (1000 * 60)));
  } catch (error) {
    return 0;
  }
}

// Analyze bus service status
function analyzeBusService(buses) {
  const delayedRoutes = buses.filter(bus => 
    bus.nextBuses && bus.nextBuses.some(b => b.remainingTime > 15)
  );
  
  const alerts = [];
  let overallStatus = 'normal';
  
  if (buses.length === 0) {
    overallStatus = 'no_service';
    alerts.push({
      type: 'no_data',
      severity: 'medium',
      message: 'No bus data available for this location/time'
    });
  } else if (delayedRoutes.length > buses.length * 0.3) {
    overallStatus = 'disrupted';
    alerts.push({
      type: 'widespread_delays',
      severity: 'high',
      message: `${delayedRoutes.length} routes experiencing delays`
    });
  } else if (delayedRoutes.length > 0) {
    overallStatus = 'minor_delays';
    alerts.push({
      type: 'some_delays',
      severity: 'medium', 
      message: `${delayedRoutes.length} routes with delays`
    });
  }
  
  return {
    overallStatus,
    alerts,
    summary: {
      totalRoutes: buses.length,
      onTimeRoutes: buses.length - delayedRoutes.length,
      delayedRoutes: delayedRoutes.length
    }
  };
}
