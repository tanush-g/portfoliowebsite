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
    
    // Customize the target position where the camera looks at
    const target = new Vector3(-0.5, 1.5, 0) // Adjusted y-coordinate from 1.2 to 1.5
    
    // Customize the initial camera position
    const initialCameraPosition = new Vector3(
      22 * Math.sin(0.3 * Math.PI), // Changed from 0.2 to 0.3 and 20 to 22 for a different angle
      12, // Changed from 10 to 12 to position camera higher
      22 * Math.cos(0.3 * Math.PI)
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
      
      // Use full device pixel ratio for crisp rendering
      // No need to cap it at 1.5 if you want maximum quality
      renderer.setPixelRatio(window.devicePixelRatio)
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
    
    // Controls with faster rotation speed
    const controls = new OrbitControls(camera, rendererRef.current.domElement)
    controls.autoRotate = true
    controls.target = target
    controls.autoRotateSpeed = 1.5 // Increased from 0.5 to 1.5 for faster rotation
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
    
    // Animation timing variables
    let frameRate = 60; // Default fallback refresh rate
    let lastFrameTime = 0;
    let frame = 0;
    
    // Detect display refresh rate and start animation
    const startAnimation = () => {
      let frameCount = 0;
      let startTime = performance.now();
      
      const detectRefreshRate = (timestamp) => {
        frameCount++;
        const elapsed = timestamp - startTime;
        
        if (elapsed >= 1000) { // After 1 second
          frameRate = Math.min(Math.round(frameCount * 1000 / elapsed), 120); // Cap at 120Hz
          console.log(`Display refresh rate: ${frameRate}Hz`);
          
          // Start main animation loop
          lastFrameTime = timestamp;
          requestAnimationFrame(animate);
        } else {
          requestAnimationFrame(detectRefreshRate);
        }
      };
      
      requestAnimationFrame(detectRefreshRate);
    };
    
    // Optimized animation loop with refresh rate adaptation
    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Calculate time delta and determine if we should render this frame
      const elapsed = timestamp - lastFrameTime;
      const frameDuration = 1000 / frameRate;
      
      // Only render at appropriate intervals based on refresh rate
      if (elapsed >= frameDuration) {
        // Adjust for timing precision errors
        lastFrameTime = timestamp - (elapsed % frameDuration);
        
        // Normalize animation speed to 60fps equivalent
        const speedFactor = 60 / frameRate;
        
        // Initial camera animation
        if (frame <= 100) {
          // Increment frame counter with normalized speed
          frame += speedFactor;
          
          // Camera rotation animation
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 100) * Math.PI * 20;
          camera.position.y = 5;
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          // Switch to orbit controls after initial animation
          controls.update();
        }
        
        // Render scene
        rendererRef.current.render(scene, camera);
      }
    };
    
    // Start the animation process
    startAnimation();
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
    
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