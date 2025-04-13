import Head from "next/head"
import Navbar from "../navbar"
import NoSsr from "../no-ssr"
import { Box, Container } from "@chakra-ui/react"
import SkaterBoy from "../3d-skater"

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Tanush Gautam is a software developer specializing in full stack web development, machine learning, and cloud computing." />
        <meta name="author" content="Tanush Gautam" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tanush.pro/" />
        <meta property="og:title" content="Tanush Gautam - Software Developer" />
        <meta property="og:description" content="Portfolio showcasing projects in full stack development, machine learning, and cloud computing" />
        <meta property="og:image" content="https://www.tanush.pro/images/og-image.jpeg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.tanush.pro/" />
        <meta name="twitter:title" content="Tanush Gautam - Software Developer" />
        <meta name="twitter:description" content="Portfolio showcasing projects in full stack development, machine learning, and cloud computing" />
        <meta name="twitter:image" content="https://www.tanush.pro/images/og-image.jpeg" />
        
        {/* LinkedIn */}
        <meta property="og:site_name" content="Tanush Gautam Portfolio" />
        
        <title>Tanush Gautam - Homepage</title>
        <link rel="canonical" href="https://www.tanush.pro" />
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <SkaterBoy />
        </NoSsr>
        {children}
      </Container>
    </Box>
  )
}

export default Main
