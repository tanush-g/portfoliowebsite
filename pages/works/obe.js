import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Title, WorkImage, Meta } from "../../components/work"
import P from "../../components/paragraph"
import Layout from "../../components/layouts/article"

const Work = () => {
  return (
    <Layout title="Outcome Based Education Student Portal">
      <Container>
        <Title>
          Outcome Based Education Student Portal <Badge>2024</Badge>
        </Title>
        <P>
          A web application that implements the OBE grading system, allows
          students to view and professors to assign their grades, class
          schedules, and other academic information.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://github.com/tanush-g/student-portal">
              https://github.com/tanush-g/student-portal
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>MERN (MongoDB, Express.js, React.js, Node.js)</span>
          </ListItem>
          <ListItem>
            <Meta>Features</Meta>
            <span>
              User Roles, Auth, Coursework Management, Dashboards, Data
              Visualisation
            </span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/obe.png"
          alt="Outcome Based Education Student Portal"
        />
        <WorkImage
          src="/images/works/obe1.png"
          alt="Outcome Based Education Student Portal"
        />
      </Container>
    </Layout>
  )
}

export default Work
