import NextLink from "next/link"
import {
  Container,
  Box,
  Heading,
  Image,
  Link,
  SimpleGrid,
  useColorModeValue,
  Button,
  List,
  ListItem,
  Icon
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import Layout from "../components/layouts/article"
import Section from "../components/section"
import Paragraph from "../components/paragraph"
import { BioSection, BioYear } from "../components/bio"
// import { GridItem } from "../components/grid-item"
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5"

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
          p={3}
          mb={6}
          align="center"
          marginTop={1}
        >
          Hello, world! I am a software developer based in India.
        </Box>

        <Box display={{ md: "flex" }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Tanush Gautam
            </Heading>
            <p>
              Software Engineer / Full Stack / Machine Learning / Cloud
              Computing
            </p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/tanush.jpeg"
              alt="Profile Image"
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            I&apos;m a dynamic Software Development Engineer from India with a
            penchant for Machine Learning, Computer Vision, Cloud Computing, and
            Full Stack Web Development. I thrive on creating innovative
            solutions that push boundaries and deliver impactful results.
            Whether building sleek UIs, crafting truly smart models, or
            optimizing cloud infrastructure, I approach every project with zeal
            and creativity. Let&apos;s connect and dive into the world of
            cutting-edge tech together! You can view my work
            {
              <NextLink href="https://www.github.com/tanush-g" legacyBehavior>
                <Link> at Github</Link>
              </NextLink>
            }
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works" legacyBehavior>
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2001</BioYear>
            Born in Delhi, India
          </BioSection>
          <BioSection>
            <BioYear>2019</BioYear>
            Completed High School from Amity International School, Noida.
            Appeared for the CBSE Board Exams.
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            Started pursuing a Bachelors in Technology (B.Tech) in Computer
            Science and Engineering from Manipal University Jaipur.
          </BioSection>
          <BioSection>
            <BioYear>2020</BioYear>
            Co-Founded and led a digital marketing solutions firm, assisting
            SMEs in establishing and enhancing their online presence.
          </BioSection>
          <BioSection>
            <BioYear>2024</BioYear>
            Expected to graduate from my undergraduate major in Computer Science and
            Engineering with a specialization in Machine Learning and Cloud
            Computing.
          </BioSection>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ❤️
          </Heading>
          <Paragraph>
            Art, Music,{" "}
            <Link href="https://www.youtube.com/watch?v=9bZkp7q19f0">
              Dancing
            </Link>
            , Photography, Playing the{" "}
            <Link href="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Black_Marble_Americas.jpg/1024px-Black_Marble_Americas.jpg">
              Guitar
            </Link>{" "}
            and exploring the world of tech.
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            On the Web
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/tanush-g" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @tanush-g
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.linkedin.com/in/tanush-g/" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoLinkedin} />}
                >
                  @tanush-g
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.instagram.com/_tanush.g/" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoInstagram} />}
                >
                  @_tanush.g
                </Button>
              </Link>
            </ListItem>
          </List>

          <SimpleGrid columns={[1,2,2]} gap={6}>

          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
