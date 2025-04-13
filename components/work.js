import NextLink from "next/link"
import Image from "next/image"
import { Heading, Box, Link, Badge } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"

export const Title = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/works" aria-label="Back to works">Works</Link>
    <span>
      &nbsp;
      <ChevronRightIcon />
      &nbsp;
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
)

export const WorkImage = ({ src, alt }) => (
  <Box position="relative" w="full" h="auto" aspectRatio={16/9} mb={4}>
    <Image 
      src={src}
      alt={alt || "Project image"}
      fill
      sizes="(max-width: 767px) 100vw, 900px"
      style={{ 
        objectFit: 'cover',
        borderRadius: '0.5rem'
      }}
      quality={90}
      className="work-image"
      placeholder="empty"
      loading="lazy"
    />
  </Box>
)

export const Meta = ({ children }) => (
    <Badge colorScheme="green" mr={2}>
        {children}
    </Badge>
)