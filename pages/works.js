import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react"
import Section from "../components/section"
import { WorkGridItem } from "../components/grid-item"

import thumbImageBlend from "../public/images/works/imageblend.png"

const Works = () => {
  return (
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="imageblend"
            title="ImageBlend"
            thumbnail={thumbImageBlend}
          >
            A simple image editor that allows you get the perfect photo every single time!
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>

    
  )
}

export default Works
