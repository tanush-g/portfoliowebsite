import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Title, WorkImage, Meta } from "../../components/work"
import P from "../../components/paragraph"
import Layout from "../../components/layouts/article"

const Work = () => {
  return (
    <Layout title="NeuroFace">
      <Container>
        <Title>
          Neuroface <Badge>2024</Badge>
        </Title>
        <P>
          A Deep Learning model that uses machine learning to identify and
          assess neurological conditions like ALS through facial landmarking
          data from external videos.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://github.com/tanush-g/NeuroFace">
              https://github.com/tanush-g/NeuroFace
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows/MacOS/Linux/Source</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, PyTorch, Keras, Sci-kit Learn, Mediapipe</span>
          </ListItem>
        </List>

        <WorkImage src="/images/works/neuroface.png" alt="Neuroface" />
        <WorkImage src="/images/works/neuroface1.png" alt="Neuroface" />
      </Container>
    </Layout>
  )
}

export default Work
