import { Container, Heading, SimpleGrid } from "@chakra-ui/react"
import Section from "../components/section"
import { WorkGridItem } from "../components/grid-item"
import Layout from "../components/layouts/article"

import thumbImageBlend from "../public/images/works/imageblend.png"
import thumbNeuroFace from "../public/images/works/neuroface.png"
import thumbOBE from "../public/images/works/obe.png"

const Works = () => {
  return (
    <Layout>
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
            A simple image editor that allows you get the perfect photo every
            single time by seamless blending of two images, addressing
            imperfections like closed eyes or awkward expressions.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem
            id="neuroface"
            title="NeuroFace"
            thumbnail={thumbNeuroFace}
          >
            A Deep Learning model that uses machine learning to identify and
            assess neurological conditions like ALS through external facial
            video data.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem
            id="obe"
            title="Outcome Based Education Student Portal"
            thumbnail={thumbOBE}
          >
            A web application that implements the OBE grading system, allows
            students to view and professors to assign their grades, class
            schedules, and other academic information.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
    </Layout>
  )
}

export default Works