import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Scene,
  WebGLRenderer,
  OrthographicCamera,
  AmbientLight,
  DirectionalLight,
  Vector3,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  PointLight
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel, cleanupThreeJS } from './model'

// Create a singleton for shared resources
let rendererInstance = null
let animationFrameId = null

// Helper function for camera animation
function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const useSkater = (containerRef) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Persistent refs
  const rendererRef = useRef(null)
  const sceneRef = useRef(new Scene())
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)
  const mountedRef = useRef(true)

  const handleWindowResize = useCallback(() => {
    if (!containerRef?.current || !cameraRef.current || !rendererRef.current) return
    
    const container = containerRef.current
    const renderer = rendererRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    
    // Update renderer size
    renderer.setSize(width, height)
    
    // Update camera
    const scale = height * 0.005 + 4.8
    const camera = cameraRef.current
    camera.left = -scale
    camera.right = scale
    camera.top = scale
    camera.bottom = -scale
    camera.updateProjectionMatrix()
  }, [containerRef])

  useEffect(() => {
    if (!containerRef?.current) return
    
    const container = containerRef.current
    mountedRef.current = true
    
    // Setup scene only if container exists
    const width = container.clientWidth
    const height = container.clientHeight
    const target = new Vector3(-0.5, 1.2, 0)
    const initialCameraPosition = new Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    )
    
    // Initialize scene only if we don't have one already
    const scene = sceneRef.current
    
    // Setup renderer (reuse or create new one)
    if (!rendererInstance) {
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
      
      const pixelRatio = Math.min(1.5, window.devicePixelRatio)
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, height)
      renderer.outputColorSpace = SRGBColorSpace
      renderer.toneMapping = ACESFilmicToneMapping
      
      // Store the instance
      rendererInstance = renderer
      rendererRef.current = renderer
      
      // Add to DOM
      container.appendChild(renderer.domElement)
    } else {
      // Reuse existing renderer
      rendererRef.current = rendererInstance
      container.appendChild(rendererInstance.domElement)
    }
    
    // Camera
    const scale = height * 0.005 + 4.8
    const camera = new OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale, 
      0.01, 
      50000
    )
    camera.position.copy(initialCameraPosition)
    camera.lookAt(target)
    cameraRef.current = camera
    
    // Lights
    const ambientLight = new AmbientLight(0xffffff, 2)
    scene.add(ambientLight)
    
    const directionalLight = new DirectionalLight(0xffffcc, 2)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)
    
    const pointLight = new PointLight(0xffffff, 2)
    pointLight.position.set(0, 10, 10)
    scene.add(pointLight)
    
    // Controls
    const controls = new OrbitControls(camera, rendererRef.current.domElement)
    controls.autoRotate = true
    controls.target = target
    controls.autoRotateSpeed = 0.5
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controlsRef.current = controls
    
    // Load model
    loadGLTFModel(scene, '/skater.glb', {
      receiveShadow: false,
      castShadow: false
    })
      .then(() => {
        if (mountedRef.current) {
          setLoading(false)
        }
      })
      .catch(err => {
        console.error('Failed to load model:', err)
        if (mountedRef.current) {
          setError('Failed to load 3D model')
          setLoading(false)
        }
      })
    
    // Animation loop
    let frame = 0
    let lastFrameTime = 0
    const fps = 30 // Target FPS
    const frameInterval = 1000 / fps
    
    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate)
      
      // FPS limiting
      if (time - lastFrameTime < frameInterval) return
      lastFrameTime = time
      
      // Initial camera animation
      frame = frame <= 100 ? frame + 1 : frame
      if (frame <= 100) {
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
        camera.position.y = 10
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        camera.lookAt(target)
      } else {
        controls.update()
      }
      
      // Render
      rendererRef.current.render(scene, camera)
    }
    
    animate(0)
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize)
    
    // Cleanup function
    return () => {
      mountedRef.current = false
      window.removeEventListener('resize', handleWindowResize)
      
      // Only remove the DOM element, keep the renderer alive for reuse
      if (rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement)
      }
      
      // If we're completely unmounting, clean up everything
      if (document.body.contains(container) === false) {
        cleanupThreeJS(scene, rendererInstance, controlsRef.current, animationFrameId)
        rendererRef.current = null
        rendererInstance = null
        animationFrameId = null
      }
    }
  }, [containerRef, handleWindowResize])
  
  return { loading, error }
}

export default useSkater