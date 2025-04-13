import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { MathUtils } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

// Cache for loaded models to prevent reloading the same model multiple times
const modelCache = new Map()

export function loadGLTFModel(
  scene,
  glbPath,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options
  
  // Check cache first
  const cached = modelCache.get(glbPath)
  if (cached) {
    return Promise.resolve(cached.clone())
  }
  
  return new Promise((resolve, reject) => {
    // Create DRACO loader for compressed models
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    
    // Configure GLTF loader with DRACO support
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = "skater"
        obj.position.y = -2
        obj.position.x = 0
        obj.position.z = 0

        // Apply a slight backward tilt to the model
        obj.rotation.x = MathUtils.degToRad(-15) // Tilt backwards by 15 degrees
        
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        obj.scale.set(0.9, 0.9, 0.9)
        
        // Optimize the model
        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
            
            // Optimize geometries
            if (child.geometry) {
              child.geometry.computeBoundingSphere()
              child.geometry.computeBoundingBox()
            }
            
            // Optimize materials
            if (child.material) {
              child.material.side = 2 // THREE.DoubleSide - render both sides
              child.material.needsUpdate = true
            }
          }
        })
        
        scene.add(obj)

        // Store in cache
        modelCache.set(glbPath, obj.clone())
        
        resolve(obj)
      },
      // Add progress callback
      (xhr) => {
        // Progress indicator - can be used to show download progress
        const progress = Math.floor((xhr.loaded / xhr.total) * 100)
        if (progress === 100) {
          console.log('Model fully loaded')
        }
      },
      function (error) {
        console.error('Model loading error:', error)
        reject(error)
      }
    )
  })
}

// Clean function to properly dispose of Three.js resources
export function cleanupThreeJS(scene, renderer, controls, animationFrameId) {
  // Cancel animation loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  // Dispose of orbit controls
  if (controls) {
    controls.dispose()
  }
  
  // Clean up materials and geometries from scene
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => {
            Object.keys(material).forEach(prop => {
              if (!material[prop]) return
              if (material[prop] !== null && typeof material[prop].dispose === 'function') {
                material[prop].dispose()
              }
            })
            material.dispose()
          })
        } else {
          Object.keys(object.material).forEach(prop => {
            if (!object.material[prop]) return
            if (object.material[prop] !== null && typeof object.material[prop].dispose === 'function') {
              object.material[prop].dispose()
            }
          })
          object.material.dispose()
        }
      }
    })
  }
  
  // Dispose of renderer
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement = null
    
    // Clear WebGL context
    const gl = renderer.getContext()
    if (gl) {
      const extension = gl.getExtension('WEBGL_lose_context')
      if (extension) extension.loseContext()
    }
  }
}
