import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Title, WorkImage, Meta } from "../../components/work"
import P from "../../components/paragraph"
import Layout from "../../components/layouts/article"

const Work = () => {
  return (
    <Layout title="ImageBlend">
      <Container>
        <Title>
          ImageBlend <Badge>2024</Badge>
        </Title>
        <P>
          This project aims to develop a CLI interface to blend two input images
          by face swapping. The motivation arises from the common issue of
          capturing perfect photos, where often the subject&apos;s eyes are
          closed, they are not smiling correctly, or other issues arise. This
          project provides a solution by allowing users to swap faces from
          different images, preserving the desired facial expressions and
          features.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://github.com/tanush-g/ImageBlend">
              https://github.com/tanush-g/ImageBlend
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows/MacOS/Linux/Source</span>
          </ListItem>
          <ListItem>
            <Meta>Techniques Used</Meta>
            <span>
              Image Blending, Gaussian Pyramids, Laplacian Pyramids, Facial
              Detection, Feature Matching
            </span>
          </ListItem>
        </List>

        <WorkImage src="/images/works/imageblend.png" alt="ImageBlend" />
        <WorkImage src="/images/works/imageblend1.png" alt="Neuroface" />
      </Container>
    </Layout>
  )
}

export default Work
