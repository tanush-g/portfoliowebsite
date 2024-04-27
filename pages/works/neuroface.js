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
          Neuroface <Badge>2024</Badge>
        </Title>
        <P>
          A Deep Learning model that uses machine learning to identify and
          assess neurological conditions like ALS through external facial video
          data.
        </P>
        <List ml={4} my={4}></List>
      </Container>
    </Layout>
  );
};

export default Work;
