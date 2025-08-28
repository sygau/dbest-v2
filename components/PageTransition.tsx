'use client'
import { useRouter } from 'next/router'
import { ReactNode, useState, useEffect } from 'react'
import { useNavigationMode } from '../hooks/useNavigationMode'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter()
  const { isSPAMode } = useNavigationMode()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPath, setPrevPath] = useState('')
  const [nextPath, setNextPath] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate skeleton HTML based on the path
  const generateSkeletonContent = (path: string): string => {
    // Homepage
    if (path === '/' || path === '/index') {
      return `
        <div class="card-body p-4">
          <!-- Hero Section -->
          <div class="text-center">
            <div class="skeleton-heading mx-auto" style="width:60%;height:3rem;"></div>
            <div class="skeleton-text mx-auto" style="width:90%;height:1.4rem;"></div>
            <div class="skeleton-text mx-auto" style="width:85%;height:1.4rem;"></div>
            <div class="skeleton-text mx-auto" style="width:80%;height:1.4rem;"></div>
          </div>
          
          <div class="my-5">
            <hr class="my-4">
          </div>
          
          <!-- Past Papers Section -->
          <div class="text-center">
            <div class="skeleton-heading mx-auto" style="width:40%;"></div>
            <div class="skeleton-text mx-auto" style="width:80%;height:1.5rem;"></div>
            <div class="skeleton-text mx-auto" style="width:60%;"></div>
          </div>
          
          <div class="my-4 text-center">
            <div class="skeleton-subheading mx-auto" style="width:30%;"></div>
          </div>
          
          <!-- Subject Cards - Core -->
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            ${Array(3).fill(0).map(() => `
              <div class="col">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="skeleton-subheading"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div class="d-flex mt-3 gap-2">
                      <div class="skeleton-button" style="width:80px;"></div>
                      <div class="skeleton-button" style="width:80px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Subject Cards - Electives -->
          <div class="text-center mb-4">
            <div class="skeleton-subheading mx-auto" style="width:30%;"></div>
          </div>
          
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            ${Array(9).fill(0).map(() => `
              <div class="col">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="skeleton-subheading"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div class="d-flex mt-3 gap-2">
                      <div class="skeleton-button" style="width:80px;"></div>
                      <div class="skeleton-button" style="width:80px;"></div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- FAQ Section -->
          <div class="my-5">
            <div class="skeleton-heading mx-auto" style="width:40%;"></div>
            <div class="accordion mt-4">
              ${Array(5).fill(0).map(() => `
                <div class="accordion-item mb-3">
                  <div class="skeleton-subheading" style="height:3rem;"></div>
                  <div class="p-3">
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    // Subject index page (e.g., /math, /physics)
    if (/\/(math|physics|chemistry|biology|english|chinese|history|geography|economics|bafs|ict|m1|m2|chinese-history)$/.test(path)) {
      return `
        <div class="card-body p-4">
          <div class="skeleton-heading"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          
          <div class="alert my-4">
            <div class="skeleton-text" style="height:1.2rem;"></div>
          </div>
          
          <hr class="my-4">
          
          <!-- Year sections - repeat for multiple years -->
          ${Array(5).fill(0).map((_, i) => `
            <div class="text-center my-4">
              <div class="skeleton-subheading mx-auto" style="width:20%;"></div>
            </div>
            
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
              ${Array(3).fill(0).map(() => `
                <div class="col">
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="skeleton-subheading"></div>
                      <div class="skeleton-text"></div>
                    </div>
                    <div class="card-footer bg-transparent">
                      <div class="skeleton-button" style="width:120px;"></div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Year page (e.g., /math/2023, /physics/2022)
    if (/\/[a-z-]+\/\d{4}$/.test(path)) {
      return `
        <div class="card-body p-4">
          <div class="skeleton-heading"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          
          <div class="alert my-4">
            <div class="skeleton-text" style="height:1.2rem;"></div>
          </div>
          
          <hr class="my-4">
          
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th><div class="skeleton-text" style="height:1.5rem;"></div></th>
                  <th><div class="skeleton-text" style="height:1.5rem;"></div></th>
                  <th><div class="skeleton-text" style="height:1.5rem;"></div></th>
                  <th><div class="skeleton-text" style="height:1.5rem;"></div></th>
                </tr>
              </thead>
              <tbody>
                ${Array(12).fill(0).map(() => `
                  <tr>
                    <td><div class="skeleton-text"></div></td>
                    <td><div class="skeleton-text"></div></td>
                    <td><div class="skeleton-text"></div></td>
                    <td><div class="skeleton-button" style="width:100px;"></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="mt-5">
            <div class="skeleton-subheading"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            
            <div class="d-flex gap-3 mt-4">
              <div class="skeleton-button" style="width:150px;"></div>
              <div class="skeleton-button" style="width:150px;"></div>
            </div>
          </div>
        </div>
      `;
    }
    
    // Blog post page
    if (path.includes('/blog/')) {
      return `
        <div class="skeleton-image" style="height:350px;"></div>
        <div class="card-body p-4">
          <div class="skeleton-heading"></div>
          <div class="d-flex gap-3 mb-4">
            <div class="skeleton-text" style="width:100px;height:1rem;"></div>
            <div class="skeleton-text" style="width:100px;height:1rem;"></div>
          </div>
          
          ${Array(15).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
          
          <div class="my-4">
            <div class="skeleton-subheading"></div>
            ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
          </div>
          
          <div class="my-4">
            <div class="skeleton-subheading"></div>
            ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
          </div>
          
          <div class="my-4">
            <div class="skeleton-image" style="height:300px;"></div>
            <div class="skeleton-text mt-2 mx-auto" style="width:80%;height:1rem;"></div>
          </div>
          
          ${Array(10).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
        </div>
      `;
    }
    
    // About, Contact, Privacy Policy, etc. pages
    if (/\/(about|contact|disclaimer|privacy-policy)$/.test(path)) {
      return `
        <div class="card-body p-4">
          <div class="skeleton-heading"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          
          <hr class="my-4">
          
          ${Array(5).fill(0).map(() => `
            <div class="mb-4">
              <div class="skeleton-subheading"></div>
              <ul class="mb-4">
                ${Array(4).fill(0).map(() => `
                  <li class="mb-2">
                    <div class="skeleton-text"></div>
                  </li>
                `).join('')}
              </ul>
              <hr class="my-4">
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Chat page
    if (path.includes('/chat')) {
      return `
        <div class="card-body p-4">
          <div class="skeleton-heading"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          
          <div class="my-4">
            <div class="skeleton-card" style="height:400px;"></div>
          </div>
          
          <div class="my-3">
            <div class="d-flex gap-2">
              <div class="skeleton-text" style="flex-grow:1;height:38px;"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
          
          <div class="my-4">
            <div class="skeleton-subheading"></div>
            ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
          </div>
        </div>
      `;
    }
    
    // Countdown page
    if (path.includes('/countdown')) {
      return `
        <div class="card-body p-4">
          <div class="skeleton-heading text-center"></div>
          <div class="skeleton-text text-center"></div>
          
          <div class="row my-5">
            ${Array(4).fill(0).map(() => `
              <div class="col-md-3 col-6 mb-4">
                <div class="skeleton-card" style="height:150px;"></div>
                <div class="skeleton-text mt-2 text-center"></div>
              </div>
            `).join('')}
          </div>
          
          <div class="my-5">
            <div class="skeleton-subheading text-center"></div>
            <div class="row">
              ${Array(3).fill(0).map(() => `
                <div class="col-md-4 mb-4">
                  <div class="skeleton-card"></div>
                  <div class="skeleton-text mt-2 text-center"></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    // Default skeleton for other pages
    return `
      <div class="card-body p-4">
        <div class="skeleton-heading"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        
        <div class="my-4">
          <div class="skeleton-subheading"></div>
          ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
        </div>
        
        <div class="my-4">
          <div class="skeleton-subheading"></div>
          ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
        </div>
        
        <div class="my-4">
          <div class="skeleton-subheading"></div>
          ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
        </div>
        
        <div class="my-4">
          <div class="skeleton-subheading"></div>
          ${Array(5).fill(0).map(() => `<div class="skeleton-text"></div>`).join('')}
        </div>
      </div>
    `;
  };

  // Handle route change events
  useEffect(() => {
    // Only set up event listeners if we're on the client and in SPA mode
    if (!isClient || !isSPAMode) {
      return;
    }

    const handleRouteChangeStart = (url: string) => {
      // Don't show loading for hash changes on the same page
      const urlWithoutHash = url.split('#')[0]
      const currentPathWithoutHash = router.asPath.split('#')[0]
      
      if (urlWithoutHash !== currentPathWithoutHash) {
        setPrevPath(router.asPath)
        setNextPath(url)
        setIsLoading(true)
        
        // Find all card rounded-4 elements and prepare them for skeleton loading
        const cards = document.querySelectorAll('.card.rounded-4');
        if (cards.length > 0) {
          cards.forEach(card => {
            // Save the original content and clear it
            const originalContent = card.innerHTML;
            card.setAttribute('data-original-content', originalContent);
            
            // Add skeleton container class
            card.classList.add('skeleton-container');
            
            // Clear content and insert the skeleton
            card.innerHTML = '';
            
            // Generate skeleton based on the next path
            const skeletonHTML = generateSkeletonContent(urlWithoutHash);
            card.innerHTML = skeletonHTML;
          });
        }
      }
    }

    const handleRouteChangeComplete = () => {
      setIsLoading(false)
      setNextPath('')
      
      // Remove skeleton classes and containers
      const skeletonContainers = document.querySelectorAll('.skeleton-container');
      skeletonContainers.forEach(container => {
        container.classList.remove('skeleton-container');
      });
    }

    const handleRouteChangeError = () => {
      setIsLoading(false)
      setNextPath('')
      
      // Remove skeleton classes and restore original content
      const skeletonContainers = document.querySelectorAll('.skeleton-container');
      skeletonContainers.forEach(container => {
        container.classList.remove('skeleton-container');
      });
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router, isSPAMode, isClient])

  // In traditional mode or before client hydration, just render children without transitions
  if (!isSPAMode || !isClient) {
    return <>{children}</>
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}
