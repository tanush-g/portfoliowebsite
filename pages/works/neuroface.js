import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/work";
import P from "../../components/paragraph";
import Layout from "../../components/layouts/article";

const Work = () => {
  return (
    <Layout title="NeuroFace">
      <Container>
        <Title>
          Neuroface <Badge>2021</Badge>
        </Title>
        <P>
          A Deep Learning model that uses machine learning to identify and
          assess neurological conditions like ALS through external facial video
          data.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="github.com/tanushg16/">
              github.com/tanushg16/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows/macOS/Linux</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, OpenCV, TensorFlow, Keras</span>
          </ListItem>
        </List>

        <WorkImage src="/images/works/neuroface.png" alt="Neuroface" />
        <WorkImage src="/images/works/neuroface.png" alt="Neuroface" />

      </Container>
    </Layout>
  );
};

export default Work;
