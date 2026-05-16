'use client'

import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { DoubleSide, Group, Mesh, MeshPhysicalMaterial, Object3D, Vector3 } from 'three'
import { WebGPURenderer } from 'three/webgpu'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier'

const ROTATION_MULTIPLIER = Math.PI * 0.6
const PARALLAX_STRENGTH = 4.5
const EASE = 0.02
const FRICTION = 0.1
const MODEL_PATH = '/3dmodal/model.glb'
const glassMaterial = new MeshPhysicalMaterial({
  color: 0xeeefff,
  emissive: 0x171717,
  reflectivity: 0.2,
  roughness: 0.1,
  metalness: 0.1,
  transparent: true,
  opacity: 0.7,
  transmission: 1,
  thickness: 0.6,
  ior: 1.4,
  dispersion: 2.5,
  side: DoubleSide,
})

const Scene: FC = () => {
  const groupRef = useRef<Group>(null)
  const pointerBodyRef = useRef<RapierRigidBody>(null)
  const rotTarget = useRef(new Vector3())
  const rotCurrent = useRef(new Vector3())
  const posTarget = useRef(new Vector3())
  const posCurrent = useRef(new Vector3())
  const ptrTarget = useRef(new Vector3())
  const ptrCurrent = useRef(new Vector3())
  const scratchPtr = useRef(new Vector3())
  const prevMouse = useRef({ x: NaN, y: NaN })
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      const prev = prevMouse.current

      if (isNaN(prev.x)) {
        prev.x = x
        prev.y = y
      }

      const dx = x - prev.x
      const dy = y - prev.y
      prev.x = x
      prev.y = y

      rotTarget.current.x += dx
      rotTarget.current.y += dy
      posTarget.current.x += dx
      posTarget.current.y += dy
      ptrTarget.current.x += dx
      ptrTarget.current.y += dy
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    if (reduced.current) return

    const onOrientation = (e: DeviceOrientationEvent) => {
      const g = e.gamma ?? 0
      const b = e.beta ?? 0

      rotTarget.current.x += g * 0.05
      rotTarget.current.y += b * 0.05
      posTarget.current.x += g * 0.075
      posTarget.current.y += b * 0.075
      ptrTarget.current.x += g * 0.05
      ptrTarget.current.y += b * 0.05
    }

    const eDO = DeviceOrientationEvent as unknown as {
      requestPermission(): Promise<'granted' | 'denied'>
    }
    if (typeof eDO?.requestPermission === 'function') {
      eDO
        .requestPermission()
        .then((res: string) => {
          if (res === 'granted') window.addEventListener('deviceorientation', onOrientation)
        })
        .catch(() => {})
    } else {
      window.addEventListener('deviceorientation', onOrientation)
    }

    return () => window.removeEventListener('deviceorientation', onOrientation)
  }, [])

  useFrame((_, delta) => {
    if (reduced.current || !groupRef.current) return

    const ease = 1 - Math.pow(1 - EASE, delta * 60)
    const friction = 1 - Math.pow(1 - FRICTION, delta * 60)

    rotTarget.current.multiplyScalar(1 - friction)
    posTarget.current.multiplyScalar(1 - friction)
    ptrTarget.current.multiplyScalar(1 - friction)

    rotCurrent.current.lerp(rotTarget.current, ease)
    posCurrent.current.lerp(posTarget.current, ease)
    ptrCurrent.current.lerp(ptrTarget.current, ease)

    groupRef.current.rotation.set(rotCurrent.current.y * ROTATION_MULTIPLIER, rotCurrent.current.x * ROTATION_MULTIPLIER, 0)
    groupRef.current.position.set(posCurrent.current.x, -posCurrent.current.y, 0)

    scratchPtr.current.set(ptrCurrent.current.x * PARALLAX_STRENGTH, -ptrCurrent.current.y * PARALLAX_STRENGTH, 0)
    pointerBodyRef.current?.setNextKinematicTranslation(scratchPtr.current)
  })

  return (
    <>
      <Environment preset="warehouse" environmentIntensity={1} />§
      <Physics gravity={[0, 0, 0]} colliders="hull">
        <group ref={groupRef}>
          <RigidBody ref={pointerBodyRef} type="kinematicPosition">
            <mesh>
              <sphereGeometry args={[0.75, 16, 16]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color={0xffde02} emissive={0x555555} roughness={0.5} />
            </mesh>
          </RigidBody>

          <Model />
        </group>
      </Physics>
    </>
  )
}

const FloatingSphere: FC<PropsWithChildren> = ({ children }) => {
  const bodyRef = useRef<RapierRigidBody>(null)
  const impulse = useRef(new Vector3())

  useFrame(() => {
    const body = bodyRef.current
    if (!body) return
    const t = body.translation()
    impulse.current.set(t.x, t.y, t.z).negate().multiplyScalar(0.02)
    body.applyImpulse(impulse.current, true)
  })

  return (
    <RigidBody ref={bodyRef} lockRotations linearDamping={1} angularDamping={1} friction={1} restitution={0.5}>
      {children}
    </RigidBody>
  )
}

const Model: FC = () => {
  const { nodes } = useGLTF(MODEL_PATH) as unknown as {
    nodes: Record<string, Object3D>
  }

  return (
    <>
      {Object.entries(nodes)
        .filter((entry): entry is [string, Mesh] => entry[1] instanceof Mesh && entry[1].name.startsWith('Icosphere'))
        .map(([key, mesh]) => (
          <FloatingSphere key={key}>
            <mesh geometry={mesh.geometry} material={glassMaterial} />
          </FloatingSphere>
        ))}
    </>
  )
}

export default function IntroScene() {
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never')

  return (
    <section className="relative size-full">
      <Canvas
        dpr={[0.8, 2]}
        gl={async ({ canvas }) => {
          const renderer = new WebGPURenderer({
            canvas: canvas as HTMLCanvasElement,
            alpha: true,
            antialias: true,
          })
          renderer
            .init()
            .then(() => setFrameloop('always'))
            .catch(() => {})
          return renderer
        }}
        camera={{ fov: 60 }}
        frameloop={frameloop}
      >
        <Scene />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </section>
  )
}
