import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Title, WorkImage, Meta } from "../../components/work"
import P from "../../components/paragraph"
import Layout from "../../components/layouts/article"

const Work = () => {
  return (
    <Layout title="Deep Learning based Brain Tumour Classification using CNNs and MR
          Imaging">
      <Container>
        <Title>
          Deep Learning based Brain Tumour Classification using CNNs and MR
          Imaging <Badge>2024</Badge>
        </Title>
        <P>
          This project aims to classify brain MRI images into four categories:
          Glioma, Meningioma, No tumor, and Pituitary tumor. It utilizes
          TensorFlow to build and train a convolutional neural network (CNN) for
          the task.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://github.com/tanush-g/Brain">
            https://github.com/tanush-g/Brain
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows/MacOS/Linux/Source</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, TensorFlow, Keras, Sci-kit Learn</span>
          </ListItem>
        </List>

        <WorkImage src="/images/works/brain.jpg" alt="Brain Tumor Classification" />
        <WorkImage src="/images/works/brain1.jpg" alt="Brain Tumor Classification" />
      </Container>
    </Layout>
  )
}

export default Work
