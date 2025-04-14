import { useRef } from "react"
import { Box, Spinner, Text } from "@chakra-ui/react"
import useSkater from "../lib/useSkater"

const ModelLoader = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

const SkaterBoy = () => {
  const refContainer = useRef()
  const { loading, error } = useSkater(refContainer)

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
      aria-label="3D skater model"
      role="img"
    >
      {loading && <ModelLoader />}
      {error && (
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="red.500"
        >
          {error}
        </Text>
      )}
    </Box>
  )
}

export default SkaterBoy
