import { animate, motionValue, press } from 'motion'
import { threeEffect } from 'motion/three'
import { useEffect, useRef } from 'react'
import * as THREE from 'three/webgpu'
import { attribute, cos, mix, positionLocal, sin, time, uniform, vec3 } from 'three/tsl'

const COLUMN_COUNT = 150

function smoothstep(value) {
  const clamped = Math.min(1, Math.max(0, value))
  return clamped * clamped * (3 - 2 * clamped)
}

function imageOpacity(value) {
  return smoothstep((value - 0.015) / 0.035)
}

export default function IcotydeParticleHero({ image, alt }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas || !navigator.gpu) return undefined

    let disposed = false
    let renderer
    let scene
    let camera
    let particles
    let photoMesh
    let stopPress
    let resizeObserver
    const globeValue = motionValue(1)
    const globe = uniform(1)
    const globeYaw = Math.random() * Math.PI * 2

    const loadPhoto = () => new Promise((resolve, reject) => {
      const photo = new Image()
      photo.onload = () => {
        const source = document.createElement('canvas')
        source.width = photo.naturalWidth
        source.height = photo.naturalHeight
        const context = source.getContext('2d', { willReadFrequently: true })
        if (!context) {
          reject(new Error('Could not create a photo sampling context'))
          return
        }
        context.drawImage(photo, 0, 0)
        const map = new THREE.Texture(photo)
        map.colorSpace = THREE.SRGBColorSpace
        map.needsUpdate = true
        resolve({
          width: source.width,
          height: source.height,
          pixels: context.getImageData(0, 0, source.width, source.height).data,
          map,
        })
      }
      photo.onerror = () => reject(new Error('Could not load the ICOTYDE photograph'))
      photo.src = image
    })

    const createParticles = (photo) => {
      const imageAspect = photo.width / photo.height
      const rows = Math.max(1, Math.round(COLUMN_COUNT / imageAspect))
      const count = COLUMN_COUNT * rows
      const imagePositions = new Float32Array(count * 3)
      const globePositions = new Float32Array(count * 3)
      const colours = new Float32Array(count * 3)
      const phases = new Float32Array(count)
      const speeds = new Float32Array(count)
      const colour = new THREE.Color()

      for (let index = 0; index < count; index += 1) {
        const column = index % COLUMN_COUNT
        const row = Math.floor(index / COLUMN_COUNT)
        const sampleX = Math.min(photo.width - 1, Math.floor((column + 0.5) / COLUMN_COUNT * photo.width))
        const sampleY = Math.min(photo.height - 1, Math.floor((row + 0.5) / rows * photo.height))
        const pixel = (sampleY * photo.width + sampleX) * 4
        const offset = index * 3
        colour.setRGB(photo.pixels[pixel] / 255, photo.pixels[pixel + 1] / 255, photo.pixels[pixel + 2] / 255, THREE.SRGBColorSpace)
        colours[offset] = colour.r
        colours[offset + 1] = colour.g
        colours[offset + 2] = colour.b
        phases[index] = Math.random() * Math.PI * 2
        speeds[index] = 0.7 + Math.random() * 0.35
      }

      const geometry = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1))
      geometry.instanceCount = count
      geometry.setAttribute('imagePosition', new THREE.InstancedBufferAttribute(imagePositions, 3))
      geometry.setAttribute('globePosition', new THREE.InstancedBufferAttribute(globePositions, 3))
      geometry.setAttribute('colour', new THREE.InstancedBufferAttribute(colours, 3))
      geometry.setAttribute('phase', new THREE.InstancedBufferAttribute(phases, 1))
      geometry.setAttribute('speed', new THREE.InstancedBufferAttribute(speeds, 1))

      const imagePosition = attribute('imagePosition')
      const spherePosition = attribute('globePosition')
      const phase = attribute('phase')
      const speed = attribute('speed')
      const particleSize = uniform(new THREE.Vector2(0.01, 0.01))
      const turbulence = vec3(
        sin(time.mul(speed.add(0.6)).add(phase)).mul(0.045),
        cos(time.mul(speed.add(0.37)).add(phase.mul(1.71))).mul(0.035),
        sin(time.mul(speed.add(0.22)).add(phase.mul(2.13))).mul(0.045),
      )
      const material = new THREE.MeshBasicNodeMaterial({ toneMapped: false })
      material.colorNode = attribute('colour')
      material.positionNode = mix(imagePosition, spherePosition.add(turbulence), globe).add(vec3(positionLocal.xy.mul(particleSize), 0))

      return { imageAspect, rows, columns: COLUMN_COUNT, particleSize, object: new THREE.Mesh(geometry, material) }
    }

    const createPhotoOverlay = (photo) => {
      const material = new THREE.MeshBasicMaterial({ map: photo.map, toneMapped: false, transparent: true, depthWrite: false, depthTest: false, opacity: 0 })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
      mesh.renderOrder = 1
      return mesh
    }

    const layout = (particleSet, overlay, aspect) => {
      const imageHalfHeight = Math.min(0.72, 0.86 * aspect / particleSet.imageAspect)
      const imageHalfWidth = imageHalfHeight * particleSet.imageAspect
      const globeRadius = Math.min(0.58, aspect * 0.82)
      const position = particleSet.object.geometry.getAttribute('imagePosition')
      const sphere = particleSet.object.geometry.getAttribute('globePosition')
      const yawCos = Math.cos(globeYaw)
      const yawSin = Math.sin(globeYaw)
      const tilt = -0.28

      for (let index = 0; index < position.count; index += 1) {
        const column = index % particleSet.columns
        const row = Math.floor(index / particleSet.columns)
        const x = (column + 0.5) / particleSet.columns
        const y = (row + 0.5) / particleSet.rows
        const sphereY = 1 - index / Math.max(position.count - 1, 1) * 2
        const ringRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY))
        const angle = index * 2.39996323
        const sphereX = Math.cos(angle) * ringRadius
        const sphereZ = Math.sin(angle) * ringRadius
        const spunX = sphereX * yawCos + sphereZ * yawSin
        const spunZ = -sphereX * yawSin + sphereZ * yawCos
        position.setXYZ(index, (x - 0.5) * imageHalfWidth * 2, (0.5 - y) * imageHalfHeight * 2, 0)
        sphere.setXYZ(index, spunX * globeRadius, (sphereY * Math.cos(tilt) - spunZ * Math.sin(tilt)) * globeRadius, (sphereY * Math.sin(tilt) + spunZ * Math.cos(tilt)) * globeRadius)
      }

      position.needsUpdate = true
      sphere.needsUpdate = true
      particleSet.particleSize.value.set(imageHalfWidth * 2 / particleSet.columns * 1.01, imageHalfHeight * 2 / particleSet.rows * 1.01)
      overlay.scale.set(imageHalfWidth * 2, imageHalfHeight * 2, 1)
    }

    const start = async () => {
      renderer = new THREE.WebGPURenderer({ canvas, antialias: true })
      await renderer.init()
      if (disposed) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      const photo = await loadPhoto()
      if (disposed) return
      particles = createParticles(photo)
      photoMesh = createPhotoOverlay(photo)
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0a0a0a)
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
      camera.position.z = 4
      scene.add(particles.object)
      scene.add(photoMesh)

      const resize = () => {
        const width = Math.max(stage.clientWidth, 1)
        const height = Math.max(stage.clientHeight, 1)
        const aspect = width / height
        renderer.setSize(width, height, false)
        camera.left = -aspect
        camera.right = aspect
        camera.top = 1
        camera.bottom = -1
        camera.updateProjectionMatrix()
        layout(particles, photoMesh, aspect)
      }

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(stage)
      resize()
      threeEffect(globe, { value: globeValue })
      threeEffect(photoMesh.material, { opacity: globeValue.map((value) => imageOpacity(value)) })
      animate(globeValue, 0, { type: 'spring', stiffness: 55, damping: 16, mass: 1, delay: 0.8 })
      stopPress = press(canvas, () => {
        animate(globeValue, 1, { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 })
        return () => animate(globeValue, 0, { type: 'spring', stiffness: 70, damping: 16, mass: 1 })
      })
      renderer.setAnimationLoop(() => renderer.render(scene, camera))
    }

    start().catch((error) => {
      if (!disposed) console.error(error)
    })

    return () => {
      disposed = true
      stopPress?.()
      resizeObserver?.disconnect()
      renderer?.setAnimationLoop(null)
      particles?.object.geometry.dispose()
      particles?.object.material.dispose()
      photoMesh?.geometry.dispose()
      photoMesh?.material.dispose()
      renderer?.dispose()
    }
  }, [image])

  return (
    <div ref={stageRef} className="icotyde-particle-hero">
      <canvas ref={canvasRef} aria-label="Hold to form an ICOTYDE design globe" />
      <img className="icotyde-particle-fallback" src={image} alt={alt} />
      <span className="icotyde-particle-hint">HOLD TO FORM THE DESIGN GLOBE</span>
    </div>
  )
}
