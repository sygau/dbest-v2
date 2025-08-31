// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { useEffect, useRef } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 503
  res.setHeader('Retry-After', '3600')
  return { props: { message: process.env.MAINTENANCE_MESSAGE || null } }
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; hue: number }> = []
    const maxParticles = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    const mouse = { x: -9999, y: -9999 }

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < maxParticles; i++) {
        const speed = 0.3 + Math.random() * 0.7
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: 1 + Math.random() * 2.5,
          hue: 200 + Math.random() * 120,
        })
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < 16000) {
          const force = -0.08 / (Math.sqrt(dist2) + 0.001)
          p.vx += force * dx
          p.vy += force * dy
          const speedLimit = 0.9
          const speed = Math.hypot(p.vx, p.vy)
          if (speed > speedLimit) {
            p.vx = (p.vx / speed) * speedLimit
            p.vy = (p.vy / speed) * speedLimit
          }
        }

        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.7)`
        context.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 3800) {
            const alpha = 0.12 * (1 - dist2 / 3800)
            context.strokeStyle = `rgba(140, 180, 255, ${alpha.toFixed(3)})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      setCanvasSize()
      createParticles()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    setCanvasSize()
    createParticles()
    draw()

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

export default function MaintenancePage({ message }: { message?: string | null }) {
  const displayMessage = (message || '').trim() || 'We are performing scheduled maintenance to improve your experience. Please check back soon.'

  return (
    <>
      <Head>
        <title>維護中 Maintenance | dse.best</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          html, body, #__next, * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
          }
          ::selection { background: transparent; }
        ` }} />
      </Head>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(1200px circle at 10% 10%, rgba(123, 97, 255, 0.12), transparent 40%), radial-gradient(800px circle at 90% 30%, rgba(0, 200, 255, 0.12), transparent 40%), linear-gradient(180deg, #0f1229 0%, #0b0e1f 100%)',
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
        position: 'relative',
        zIndex: 1,
      }}>
        <ParticleBackground />
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(92vw, 720px)',
          borderRadius: '24px',
          padding: '32px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'rgba(255,255,255,0.92)',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(123,97,255,0.35), rgba(0,200,255,0.35))',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
            margin: '0 auto 16px',
          }}>
            <span style={{ fontSize: 34 }}>🛠️</span>
          </div>

          <h1 style={{
            margin: '8px 0 12px',
            fontSize: 'clamp(24px, 5vw, 32px)',
            lineHeight: 1.2,
            letterSpacing: 0.2,
          }}>
            系統維護中 Maintenance
          </h1>

          <p style={{
            margin: '0 auto 18px',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 560,
          }}>
            {displayMessage}
          </p>

          <div style={{
            marginTop: 12,
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)'
          }}>
            If this persists for a long time, please try again later. Contact info@dse.best if you have any problems.
          </div>
        </div>
      </div>
    </>
  )
} 