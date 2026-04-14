'use client'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Bounds, OrbitControls, useGLTF } from '@react-three/drei'
import { createPortal } from 'react-dom'
import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useBg } from '@/components/app-components/BgContext'
import { useSoundEffects } from '@/hooks/useSoundEffects'

const GLTF_PATH = '/3dmodal/NGMLogo.gltf'
useGLTF.preload(GLTF_PATH)

export default function Modal3d() {
  const { nodes } = useGLTF(GLTF_PATH)
  const extrude = nodes['Extrude'] as THREE.Mesh
  const { cycleBg } = useBg()
  const { logoHover } = useSoundEffects()
  const [isFlashing, setIsFlashing] = useState(false)

  const handleCycle = () => {
    cycleBg()
    logoHover()
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 800)
  }

  return (
    <>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence mode="wait">
            {isFlashing && (
              <motion.div
                key="flash-screen"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="hidden z-99999 fixed inset-0 bg-white pointer-events-none"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={handleCycle}
        className="size-20 max-md:size-14 outline-none -translate-y-4 max-md:-translate-y-2 max-md:ms-4 -mb-6 cursor-grab active:cursor-grabbing"
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          frameloop="demand"
          camera={{ position: [50, 50, 320], fov: 45 }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 10, 8]} intensity={4.5} />
          <directionalLight position={[10, 5, -10]} intensity={0.5} />

          <Suspense fallback={null}>
            <Bounds fit clip observe>
              <primitive object={extrude} />
            </Bounds>
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.06}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </motion.div>
    </>
  )
}
