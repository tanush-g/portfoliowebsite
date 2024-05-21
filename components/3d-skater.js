import { useState, useEffect, useRef, useCallback } from "react"
import { Box, Spinner } from "@chakra-ui/react"
import {
  WebGLRenderer,
  Vector3,
  Scene,
  AmbientLight,
  DirectionalLight,
  SRGBColorSpace,
  OrthographicCamera,
  ACESFilmicToneMapping,
  PointLight
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { loadGLTFModel } from "../lib/model"

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const SkaterBoy = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState(null)
  const [_camera, setCamera] = useState(null)
  const [target] = useState(new Vector3(-0.5, 1.2, 0))
  const [initialCameraPosition] = useState(
    new Vector3(20 * Math.sin(0.2 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))
  )
  const [scene] = useState(new Scene())
  const [_controls, setControls] = useState(null)

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer, refContainer])

  useEffect(() => {
    const { current: container } = refContainer
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputColorSpace = SRGBColorSpace
      renderer.toneMapping = ACESFilmicToneMapping
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      // 640 -> 240
      // 8 -> 6
      const scale = scH * 0.005 + 4.8
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
      setCamera(camera)

      const ambientLight = new AmbientLight(0xffffff, 2)
      scene.add(ambientLight)

      const directionalLight = new DirectionalLight(0xffffcc, 2)
      directionalLight.position.set(0, 1, 1)
      scene.add(directionalLight)

      const pointLight = new PointLight(0xffffff, 2)
      pointLight.position.set(0, 10, 10)
      pointLight.castShadow = true // Enable shadow casting
      scene.add(pointLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)

      loadGLTFModel(scene, "/skater.glb", {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        animate()
        setLoading(false)
      })

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
        container.removeChild(renderer.domElement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false)
    return () => {
      window.removeEventListener("resize", handleWindowResize, false)
    }
  }),
    [renderer, handleWindowResize]

  return (
    <Box
      ref={refContainer}
      className="skater"
      m="auto"
      mt={["-20px", "-60px", "-120px"]}
      mb={["-40px", "-140px", "-200px"]}
      w={[280, 480, 640]}
      h={[280, 480, 640]}
      position="relative"
    >
      {loading && (
        <Spinner
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          ml="calc(0px - var(--spinner-size) / 2)"
          mt="calc(0px - var(--spinner-size))"
        />
      )}
    </Box>
  )
}

export default SkaterBoy
