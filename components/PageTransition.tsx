'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter()

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative'
    }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
