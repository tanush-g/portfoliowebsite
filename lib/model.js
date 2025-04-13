import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

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
    const loader = new GLTFLoader()

    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = "skater"
        obj.position.y = -2
        obj.position.x = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        obj.scale.set(0.9, 0.9, 0.9)
        scene.add(obj)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = castShadow
            child.receiveShadow = receiveShadow
          }
        })

        // Store in cache
        modelCache.set(glbPath, obj.clone())
        
        resolve(obj)
      },
      undefined,
      function (error) {
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
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
  
  // Dispose of renderer
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
  }
}
