import { Container, Box, Heading } from "@chakra-ui/react"

const Page = () => {
  return (
    <container>
      <Box borderRadius="lg" bg="red" p={3} mb={6} align="center">
        Hello, world!
      </Box>

      <Box display={{ md: "flex" }} >
        <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
                Tanush Gautam
            </Heading>
            <p>Software Engineer / Full Stack / Machine Learning / Cloud Computing</p>
        </Box>
      </Box>
    </container>
  )
}

export default Page
