import Logo from "./logo"
import NextLink from "next/link"
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import ThemeToggleButton from "./theme-toggle-button"

const LinkItem = ({ href, path, children }) => {
  const active = path === href
  const inactiveColor = useColorModeValue("gray.800", "whiteAlpha.900")
  return (
    <Link
      as={NextLink}
      href={href}
      p={2}
      bg={active ? "glassTeal" : undefined}
      color={active ? "#202023" : inactiveColor}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  )
}

const Navbar = props => {
  const { path } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          role="navigation"
          aria-label="Main navigation"
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          {/* <LinkItem href="/posts" path={path}>
            Posts
          </LinkItem> */}
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="outline"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                  />
                  <MenuList aria-label="Navigation menu">
                    <Link as={NextLink} href="/" w="100%">
                      <MenuItem as="a">About</MenuItem>
                    </Link>
                    <Link as={NextLink} href="/works" w="100%">
                      <MenuItem as="a">Works</MenuItem>
                    </Link>
                    {/* <Link as={NextLink} href="/posts" w="100%">
                      <MenuItem as="a">Posts</MenuItem>
                    </Link> */}
                    <Link as={NextLink} href="https://github.com/tanush-g/portfoliowebsite" w="100%" target="_blank" rel="noopener noreferrer">
                      <MenuItem as="a">View Source</MenuItem>
                    </Link>
                  </MenuList>
                </>
              )}
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar
