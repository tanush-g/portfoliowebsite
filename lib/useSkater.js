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
  PointLight,
  Clock
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel, cleanupThreeJS } from './model'

// Create a singleton for shared resources
let rendererInstance = null
let animationFrameId = null

// Helper function for camera animation - smoother easing function
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
  const clockRef = useRef(new Clock())
  const frameCountRef = useRef(0)
  const mountedRef = useRef(true)

  // Handle window resize
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
    
    // Setup scene
    const width = container.clientWidth
    const height = container.clientHeight
    
    // Define target for camera
    const target = new Vector3(-0.5, 1.5, 0)
    
    // Set initial camera position
    const initialCameraPosition = new Vector3(
      22 * Math.sin(0.3 * Math.PI),
      12,
      22 * Math.cos(0.3 * Math.PI)
    )
    
    const scene = sceneRef.current
    
    // Setup renderer (reuse or create new one)
    if (!rendererInstance) {
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
      
      // Set pixel ratio for best quality while considering performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.outputColorSpace = SRGBColorSpace
      renderer.toneMapping = ACESFilmicToneMapping
      
      rendererInstance = renderer
      rendererRef.current = renderer
      
      // Add to DOM
      container.appendChild(renderer.domElement)
    } else {
      // Reuse existing renderer
      rendererRef.current = rendererInstance
      rendererRef.current.setSize(width, height)
      container.appendChild(rendererInstance.domElement)
    }
    
    // Camera setup
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
    
    // Lighting setup
    const ambientLight = new AmbientLight(0xffffff, 2)
    scene.add(ambientLight)
    
    const directionalLight = new DirectionalLight(0xffffcc, 2)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)
    
    const pointLight = new PointLight(0xffffff, 2)
    pointLight.position.set(0, 10, 10)
    scene.add(pointLight)
    
    // OrbitControls setup
    const controls = new OrbitControls(camera, rendererRef.current.domElement)
    controls.autoRotate = true
    controls.target = target
    controls.autoRotateSpeed = 1.5
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false  // Disable zooming for better user experience
    controlsRef.current = controls
    
    // Load the 3D model
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
    
    // Reset clock to ensure smooth animation start
    clockRef.current.start()
    frameCountRef.current = 0
    
    // Fixed 120 FPS animation loop with timing control
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      // Get the camera and renderer
      const camera = cameraRef.current
      const renderer = rendererRef.current
      
      if (!camera || !renderer) return
      
      // Increment the frame counter
      frameCountRef.current++
      
      // Initial camera animation (first ~120 frames)
      if (frameCountRef.current <= 120) {
        // Camera rotation animation
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frameCountRef.current / 100) * Math.PI * 20
        camera.position.y = 5
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        camera.lookAt(target)
      } else {
        // Switch to orbit controls after initial animation
        controlsRef.current.update()
      }
      
      // Render scene
      renderer.render(scene, camera)
    }
    
    // Start the animation loop
    animate()
    
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
        cleanupThreeJS(sceneRef.current, rendererInstance, controlsRef.current, animationFrameId)
        rendererRef.current = null
        rendererInstance = null
        animationFrameId = null
      }
    }
  }, [containerRef, handleWindowResize])
  
  return { loading, error }
}

export default useSkater