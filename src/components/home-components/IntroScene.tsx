'use client'

import React, { cloneElement, FC, ReactElement, useEffect, useRef, PropsWithChildren, useMemo, useState, useCallback } from 'react'

import { Group, Vector2, Vector3, DoubleSide, MeshPhysicalMaterial } from 'three'
import { WebGPURenderer } from 'three/webgpu'
import { PostProcessing } from 'three/webgpu'
import { pass, uniform } from 'three/tsl'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { addEventListener, scoped, vevet, lerp, Raf } from 'vevet'

const rotation = Math.PI * 0.6
const parallax = 2.5
const bloomSettings = {
  strength: uniform(0.01),
  radius: uniform(0.5),
  threshold: uniform(0.5),
}
type Listener = (value: boolean) => void
let granted = false
let listeners: Listener[] = []

function useAnimatableVec3(onUpdateProp: (vec3: Vector3) => void, easeProp = 0.1, frictionProp = easeProp * 2.5) {
  const targetRef = useRef<Vector3>(new Vector3(0, 0, 0))
  const currentRef = useRef<Vector3>(new Vector3(0, 0, 0))

  const onUpdate = useRef(onUpdateProp)

  useEffect(() => {
    const raf = new Raf()
    raf.play()

    raf.on('frame', () => {
      const target = targetRef.current
      const { current } = currentRef

      const ease = raf.lerpFactor(easeProp)
      const friction = raf.lerpFactor(frictionProp)

      target.x = lerp(target.x, 0, friction)
      target.y = lerp(target.y, 0, friction)
      target.z = lerp(target.z, 0, friction)

      current.x = lerp(current.x, target.x, ease)
      current.y = lerp(current.y, target.y, ease)
      current.z = lerp(current.z, target.z, ease)

      onUpdate.current(current)
    })

    return () => raf.destroy()
  }, [easeProp, frictionProp])

  const iterateTarget = useCallback((vec3: Vector3) => {
    targetRef.current.x += vec3.x
    targetRef.current.y += vec3.y
    targetRef.current.z += vec3.z
  }, [])

  return { iterateTarget }
}

function useDeviceOrientationDelta(onUpdate: (coords: { alpha: number; gamma: number; beta: number }) => void) {
  const { granted } = useDeviceOrientationGranted()

  const prevRef = useRef<{
    alpha: number
    gamma: number
    beta: number
  }>({ alpha: 0, beta: 0, gamma: 0 })

  const handle = useEvent((evt: DeviceOrientationEvent) => {
    const a = evt.alpha || 0
    const g = evt.gamma || 0
    const b = evt.beta || 0

    const alphaDiff = a - prevRef.current.alpha
    const betaDiff = b - prevRef.current.beta
    const gammaDiff = g - prevRef.current.gamma

    prevRef.current = { alpha: a, beta: b, gamma: g }

    onUpdate({ alpha: alphaDiff, gamma: gammaDiff, beta: betaDiff })
  })

  useEffect(() => {
    if (!granted) {
      return undefined
    }

    window.addEventListener('deviceorientation', handle)

    return () => {
      window.removeEventListener('deviceorientation', handle)
    }
  }, [granted, handle])
}

function useDeviceOrientationGranted() {
  const [value, setValue] = useState(granted)
  const [needsPermission, setNeedsPermission] = useState(false)

  const request = useEvent(() => {
    if (!needsPermission) {
      return
    }

    window.DeviceOrientationEvent.requestPermission()
      .then((result) => {
        granted = result === 'granted'

        if (granted) {
          listeners.forEach((l) => l(granted))
        }
      })
      .catch(() => setNeedsPermission(false))
  })

  useEffect(() => {
    const hasRequest = 'DeviceOrientationEvent' in window && typeof window.DeviceOrientationEvent.requestPermission === 'function'

    if (!hasRequest) {
      setValue(true)

      return undefined
    }

    if (granted) {
      setValue(true)
      setNeedsPermission(false)

      return undefined
    }

    setValue(false)
    setNeedsPermission(true)

    const listener: Listener = (next) => {
      setNeedsPermission(false)
      setValue(next)
    }

    listeners.push(listener)

    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return { granted: value, needsPermission, request }
}

function useMouseMoveDelta(onUpdateProp: (delta: Vector2) => void) {
  const prevMouseRef = useRef<Vector2>(new Vector2(NaN, NaN))

  useEffect(
    () =>
      addEventListener(window, 'mousemove', (evt) => {
        const prev = prevMouseRef.current

        const x = scoped(evt.clientX, vevet.width / 2, vevet.width)
        const y = scoped(evt.clientY, vevet.height / 2, vevet.height)

        if (Number.isNaN(prev.x) || Number.isNaN(prev.y)) {
          prev.x = x
          prev.y = y
        }

        const dx = x - prev.x
        const dy = y - prev.y

        prev.x = x
        prev.y = y

        onUpdateProp(new Vector2(dx, dy))
      }),
    [onUpdateProp]
  )
}

function useScreenPositionDelta(onUpdateProp: (delta: Vector2) => void) {
  const prevScreenRef = useRef<Vector2>(new Vector2(NaN, NaN))
  const isResizedRef = useRef(false)
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useFrame(() => {
    const prev = prevScreenRef.current

    const x = window.screenX / (window.screen.width / 2)
    const y = window.screenY / (window.screen.height / 2)

    if (Number.isNaN(prev.x) || Number.isNaN(prev.y)) {
      prev.x = x
      prev.y = y
    }

    const dx = x - prev.x
    const dy = y - prev.y

    prev.x = x
    prev.y = y

    if (!isResizedRef.current) {
      onUpdateProp(new Vector2(dx, dy))
    }
  })

  useEffect(
    () =>
      addEventListener(window, 'resize', () => {
        isResizedRef.current = true

        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }

        resizeTimeoutRef.current = setTimeout(() => {
          isResizedRef.current = false
        }, 100)
      }),
    []
  )
}

const useEvent: {
  <TF extends ((...args: Array<any>) => any) | undefined>(callback: TF): TF
  <TF extends ((...args: Array<any>) => any) | undefined>(callback: TF): any
} = (callback) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args: any) => callbackRef.current?.(...args), [])
}

const material = new MeshPhysicalMaterial({
  color: 0xeeefff,
  emissive: 0xffffff90,
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

  const { iterateTarget: iteratePositionTarget } = useAnimatableVec3(
    ({ x, y }) => {
      const group = groupRef.current!

      group.position.set(x, -y, 0)
    },
    0.02,
    0.1
  )

  const { iterateTarget: iterateRotationTarget } = useAnimatableVec3(
    ({ x, y, z }) => {
      const group = groupRef.current!

      group.rotation.set(y * rotation, x * rotation, z * rotation)
    },
    0.02,
    0.1
  )

  useMouseMoveDelta(({ x, y }) => {
    const vec = new Vector3(x, y, 0)

    iteratePositionTarget(vec)
    iterateRotationTarget(vec)
  })

  useScreenPositionDelta(({ x, y }) => {
    const strength = 5
    const vec = new Vector3(-x * strength, -y * strength, 0)

    iteratePositionTarget(vec)
    iterateRotationTarget(vec)
  })

  useDeviceOrientationDelta(({ gamma, beta }) => {
    const rotationStrength = 0.05
    const rotationVector = new Vector3(gamma * rotationStrength, beta * rotationStrength, 0)

    const positionStrength = 0.075
    const positionVector = new Vector3(gamma * positionStrength, beta * positionStrength, 0)

    iterateRotationTarget(rotationVector)
    iteratePositionTarget(positionVector)
  })

  return (
    <>
      <Environment files="env/warehouse.hdr" environmentIntensity={1} />

      <Physics gravity={[0, 0, 0]} colliders="hull">
        <group ref={groupRef} scale={1}>
          <Pointer />

          <Model />
        </group>
      </Physics>
    </>
  )
}

const Pointer: FC = () => {
  const bodyRef = useRef<RapierRigidBody>(null)

  const { iterateTarget } = useAnimatableVec3(({ x, y }) => {
    bodyRef.current?.setNextKinematicTranslation(new Vector3(x * parallax, -y * parallax, 0))
  })

  useMouseMoveDelta(({ x, y }) => iterateTarget(new Vector3(x, y, 0)))

  useDeviceOrientationDelta(({ gamma, beta }) => {
    const strength = 0.05

    iterateTarget(new Vector3(gamma * strength, beta * strength, 0))
  })

  useScreenPositionDelta(({ x, y }) => {
    const strength = 3
    const vec = new Vector3(-x * strength, -y * strength, 0)

    iterateTarget(vec)
  })

  return (
    <RigidBody ref={bodyRef} type="kinematicPosition">
      <group>
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />

          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />

          <meshStandardMaterial color={0x999999} emissive={0x555555} metalness={0.0} roughness={0.5} />
        </mesh>
      </group>
    </RigidBody>
  )
}

const ModelRigidBody: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<RapierRigidBody>(null)

  const vec = useMemo(() => new Vector3(), [])

  useFrame(() => {
    const body = ref.current

    body?.applyImpulse(vec.copy(body.translation()).negate().multiplyScalar(0.02), true)
  })

  return (
    <RigidBody ref={ref} lockRotations linearDamping={1} angularDamping={1} friction={1} restitution={0.5}>
      {children}
    </RigidBody>
  )
}

const Modify: FC<{
  children: ReactElement[]
}> = ({ children }) =>
  React.Children.toArray(children).map((child, i) => (
    <ModelRigidBody key={(child as ReactElement).key || i}>
      {cloneElement(child as ReactElement, { material } as Partial<Record<string, unknown>>)}
    </ModelRigidBody>
  ))

const WebGPUPostProcessing = () => {
  const { gl: renderer, scene, camera } = useThree()
  const postProcessingRef = useRef<PostProcessing>(null)

  useEffect(() => {
    if (!renderer || !scene || !camera) {
      return undefined
    }

    const postProcessing = new PostProcessing(renderer as any)
    postProcessingRef.current = postProcessing

    const scenePass = pass(scene, camera)
    const scenePassColor = scenePass.getTextureNode('output')

    const bloomPass = bloom(scenePassColor)
    bloomPass.strength = bloomSettings.strength
    bloomPass.radius = bloomSettings.radius
    bloomPass.threshold = bloomSettings.threshold

    postProcessing.outputNode = scenePassColor.add(bloomPass)

    return () => {
      postProcessing.dispose()
    }
  }, [renderer, scene, camera])

  useFrame(() => {
    postProcessingRef.current?.render()
  }, 1)

  return null
}

const Model = () => {
  const gltf = useGLTF('/3dmodal/model.glb')
  const nodes = gltf.nodes as any

  return (
    <Modify>
      <mesh geometry={nodes.Icosphere001.geometry} material={nodes.Icosphere001.material} />

      <mesh geometry={nodes.Icosphere003.geometry} material={nodes.Icosphere003.material} />

      <mesh geometry={nodes.Icosphere004.geometry} material={nodes.Icosphere004.material} />

      <mesh geometry={nodes.Icosphere007.geometry} material={nodes.Icosphere007.material} />

      <mesh geometry={nodes.Icosphere008.geometry} material={nodes.Icosphere008.material} />

      <mesh geometry={nodes.Icosphere009.geometry} material={nodes.Icosphere009.material} />

      <mesh geometry={nodes.Icosphere010.geometry} material={nodes.Icosphere010.material} />

      <mesh geometry={nodes.Icosphere012.geometry} material={nodes.Icosphere012.material} />

      <mesh geometry={nodes.Icosphere014.geometry} material={nodes.Icosphere014.material} />

      <mesh geometry={nodes.Icosphere015.geometry} material={nodes.Icosphere015.material} />

      <mesh geometry={nodes.Icosphere017.geometry} material={nodes.Icosphere017.material} />

      <mesh geometry={nodes.Icosphere018.geometry} material={nodes.Icosphere018.material} />

      <mesh geometry={nodes.Icosphere020.geometry} material={nodes.Icosphere020.material} />

      <mesh geometry={nodes.Icosphere023.geometry} material={nodes.Icosphere023.material} />

      <mesh geometry={nodes.Icosphere024.geometry} material={nodes.Icosphere024.material} />

      <mesh geometry={nodes.Icosphere025.geometry} material={nodes.Icosphere025.material} />

      <mesh geometry={nodes.Icosphere026.geometry} material={nodes.Icosphere026.material} />

      <mesh geometry={nodes.Icosphere028.geometry} material={nodes.Icosphere028.material} />

      <mesh geometry={nodes.Icosphere029.geometry} material={nodes.Icosphere029.material} />

      <mesh geometry={nodes.Icosphere030.geometry} material={nodes.Icosphere030.material} />

      <mesh geometry={nodes.Icosphere002.geometry} material={nodes.Icosphere002.material} />

      <mesh geometry={nodes.Icosphere005.geometry} material={nodes.Icosphere005.material} />

      <mesh geometry={nodes.Icosphere006.geometry} material={nodes.Icosphere006.material} />

      <mesh geometry={nodes.Icosphere011.geometry} material={nodes.Icosphere011.material} />

      <mesh geometry={nodes.Icosphere013.geometry} material={nodes.Icosphere013.material} />

      <mesh geometry={nodes.Icosphere016.geometry} material={nodes.Icosphere016.material} />

      <mesh geometry={nodes.Icosphere019.geometry} material={nodes.Icosphere019.material} />

      <mesh geometry={nodes.Icosphere021.geometry} material={nodes.Icosphere021.material} />

      <mesh geometry={nodes.Icosphere022.geometry} material={nodes.Icosphere022.material} />

      <mesh geometry={nodes.Icosphere027.geometry} material={nodes.Icosphere027.material} />

      <mesh geometry={nodes.Icosphere031.geometry} material={nodes.Icosphere031.material} />

      <mesh geometry={nodes.Icosphere032.geometry} material={nodes.Icosphere032.material} />
    </Modify>
    // return <Modify>{nodes.Extrude && <mesh geometry={nodes.Extrude.geometry} material={nodes.Extrude.material} />}</Modify>
  )
}

export default function IntroScene() {
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never')

  return (
    <section className="relative size-full">
      <Canvas
        dpr={[0.8, 3]}
        gl={async ({ canvas }) => {
          const renderer = new WebGPURenderer({
            canvas: canvas as HTMLCanvasElement,
            alpha: true,
            antialias: true,
          })

          renderer
            .init()
            .then(() => setFrameloop('always'))
            .catch(null)

          return renderer
        }}
        camera={{ fov: 60 }}
        frameloop={frameloop}
      >
        <WebGPUPostProcessing />
        <Scene />
      </Canvas>
    </section>
  )
}

// i want the IntroScene to show in the HeroCenter untell the user choose project from the project tap so this intro scene exit animation and show the hero center
