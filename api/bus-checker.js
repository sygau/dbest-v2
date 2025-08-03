// api/bus-checker.js
export default async function handler(req, res) {
  const { stop, lat, lng, radius = 400 } = req.query;
  
  try {
    let busData = [];
    
    // If coordinates provided, find nearby stops
    if (lat && lng) {
      busData = await getNearbyBuses(parseFloat(lat), parseFloat(lng), parseInt(radius));
    } 
    // If specific stop provided
    else if (stop) {
      busData = await getBusesAtStop(stop);
    }
    else {
      return res.status(400).json({ error: 'Provide either stop ID or coordinates' });
    }
    
    // Analyze service status
    const analysis = analyzeBusService(busData);
    
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
    res.status(500).json({ error: error.message });
  }
}

async function getNearbyBuses(lat, lng, radius) {
  // This would integrate with multiple APIs
  const companies = ['kmb', 'ctb', 'nlb'];
  const allBuses = [];
  
  for (const company of companies) {
    try {
      // Implementation would vary per company API
      const buses = await fetchCompanyBuses(company, lat, lng, radius);
      allBuses.push(...buses);
    } catch (error) {
      console.warn(`Failed to fetch ${company} data:`, error.message);
    }
  }
  
  return allBuses;
}

function analyzeBusService(buses) {
  const delayedRoutes = buses.filter(bus => 
    bus.nextBuses.some(b => b.remainingTime > 15)
  );
  
  const alerts = [];
  let overallStatus = 'normal';
  
  if (delayedRoutes.length > buses.length * 0.3) {
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
