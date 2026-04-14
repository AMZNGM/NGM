'use client'

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function DashGame() {
  const isMobile = useIsMobile()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const { click, jump, failed } = useSoundEffects()

  const COLORS = useMemo(
    () => ({
      main: '#ffde02',
      bg: '#0d0d0d',
      text: '#f6f9fa',
    }),
    []
  )

  const gameState = useRef({
    playerY: 0,
    playerVy: 0,
    gravity: 0.4,
    jumpStrength: -6,
    isJumping: false,
    jumpsLeft: 2,
    obstacles: [] as { x: number; width: number; height: number }[],
    speed: 4,
    width: 0,
    height: 0,
    frameCount: 0,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = Math.min(parent.clientHeight, 80)
      gameState.current.width = canvas.width
      gameState.current.height = canvas.height
      gameState.current.playerY = canvas.height - 20
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const spawnObstacle = useCallback(() => {
    const state = gameState.current
    const minGap = 150
    const lastObstacle = state.obstacles[state.obstacles.length - 1]

    if (!lastObstacle || state.width - lastObstacle.x > minGap) {
      if (Math.random() < 0.02) {
        state.obstacles.push({
          x: state.width,
          width: 10 + Math.random() * 20,
          height: 15 + Math.random() * 25,
        })
      }
    }
  }, [])

  const burstParticles = (x: number, y: number) => {
    for (let i = 0; i < 15; i++) {
      gameState.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1.0,
      })
    }
  }

  const startGame = () => {
    setScore(0)
    setIsPlaying(true)
    gameState.current.obstacles = []
    gameState.current.speed = 4
    gameState.current.playerY = gameState.current.height - 20
    gameState.current.playerVy = 0
    gameState.current.jumpsLeft = 2
    gameState.current.frameCount = 0
    click()
  }

  const update = useCallback(() => {
    if (!isPlaying) return

    const state = gameState.current
    state.frameCount++

    // Player physics
    state.playerVy += state.gravity
    state.playerY += state.playerVy

    const floorY = state.height - 20
    if (state.playerY > floorY) {
      state.playerY = floorY
      state.playerVy = 0
      state.isJumping = false
      state.jumpsLeft = 2
    }

    // Move obstacles
    state.obstacles.forEach((obs, index) => {
      obs.x -= state.speed

      // Collision detection
      const playerX = 50
      const playerWidth = 15
      const playerHeight = 15

      if (
        playerX < obs.x + obs.width &&
        playerX + playerWidth > obs.x &&
        state.playerY < state.height - 5 &&
        state.playerY + playerHeight > state.height - 5 - obs.height
      ) {
        // Game Over
        setIsPlaying(false)
        setHasPlayed(true)
        burstParticles(playerX + 7, state.playerY + 7)
        failed()
        if (score > highScore) setHighScore(score)
      }

      if (obs.x + obs.width < 0) {
        state.obstacles.splice(index, 1)
        setScore((s) => s + 1)
        state.speed += 0.05 // Speed up
      }
    })

    spawnObstacle()

    // Particles
    state.particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.02
      if (p.life <= 0) state.particles.splice(i, 1)
    })
  }, [isPlaying, score, highScore, failed, spawnObstacle])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = gameState.current
    ctx.clearRect(0, 0, state.width, state.height)

    // Floor Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, state.height - 5)
    ctx.lineTo(state.width, state.height - 5)
    ctx.stroke()

    // Draw Player (Glowing Square)
    ctx.shadowBlur = 15
    ctx.shadowColor = COLORS.main
    ctx.fillStyle = COLORS.main
    ctx.fillRect(50, state.playerY, 15, 15)

    // Draw Obstacles (Glitched Rects)
    ctx.shadowBlur = 10
    ctx.shadowColor = COLORS.text
    ctx.fillStyle = COLORS.text
    state.obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, state.height - 5 - obs.height, obs.width, obs.height)
    })

    // Draw Particles
    state.particles.forEach((p) => {
      ctx.fillStyle = `rgba(255, 222, 2, ${p.life})`
      ctx.fillRect(p.x, p.y, 2, 2)
    })

    ctx.shadowBlur = 0
  }, [COLORS])

  useEffect(() => {
    let frameId: number
    const loop = () => {
      update()
      draw()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [update, draw])

  const handleJump = () => {
    const state = gameState.current
    if (isPlaying && state.jumpsLeft > 0) {
      state.playerVy = state.jumpStrength
      state.isJumping = true
      state.jumpsLeft--
      jump()
    } else if (!isPlaying) {
      startGame()
    }
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  }

  const itemVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  if (isMobile) return null

  return (
    <div
      ref={containerRef}
      onPointerDown={handleJump}
      className="relative w-full max-w-[26dvw] border-text/50 border-x border-dashed cursor-pointer"
    >
      <canvas ref={canvasRef} className={`h-[3.5dvw] transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-10 absolute inset-0 flex justify-center items-center pointer-events-none select-none"
          >
            <motion.span variants={itemVariants} className="font-sec font-bold text-[0.7dvw] text-main/75 tracking-wide">
              {score !== 0 && hasPlayed && `⛧°.⋆༺𓋹༻⋆.°⛧ SCORE: ${score} ⛧°.⋆༺𓋹༻⋆.°⛧`}
              {score === 0 && hasPlayed && `(˶˃ ᵕ ˂˶)jejejje try again `}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="top-0 left-3 absolute pointer-events-none select-none"
          >
            <span className="font-sec font-bold text-[0.7dvw] text-main/40 tracking-tighter">SCORE: {score}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speed lines effect */}
      {isPlaying && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="top-1/2 left-0 absolute w-full h-px bg-text/5 animate-pulse" />
        </div>
      )}
    </div>
  )
}
