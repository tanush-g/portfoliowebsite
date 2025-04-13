import NextLink from "next/link"
import Image from "next/image"
import { Box, Text, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { Global } from "@emotion/react"

export const GridItem = ({ children, title, href, thumbnail }) => (
  <Box w="100%" align="center">
    <LinkBox cursor="pointer">
      <Box position="relative" width="100%" height="0" paddingBottom="56.25%" overflow="hidden" borderRadius="12px">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          style={{ 
            objectFit: 'cover', 
            borderRadius: '12px'
          }}
          priority
          quality={85}
          className="grid-item-thumbnail"
          loading="lazy"
        />
      </Box>
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" align="center">
    <LinkBox cursor="pointer">
      <Box position="relative" width="100%" height="0" paddingBottom="56.25%" overflow="hidden" borderRadius="12px">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          style={{ 
            objectFit: 'cover', 
            borderRadius: '12px'
          }}
          quality={85}
          className="grid-item-thumbnail"
          loading="lazy"
        />
      </Box>
      <LinkOverlay as={NextLink} href={`/works/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
    .grid-item-thumbnail {
        border-radius: 12px;
    }
    `}
  />
)
