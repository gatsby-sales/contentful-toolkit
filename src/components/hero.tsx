import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from "./ui"

export interface HeroProps {
  image?: ContentfulTopicMediaWrapper
  kicker?: string
  h1: string
  subhead: string
  text: string
  links: ContentfulComponentLink[]
}

export default function Hero(props: Queries.HeroBannerContentFragment) {
  return (
    <Section>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half">
            {props.image && (
              <GatsbyImage
                alt={props.image.alt}
                image={getImage(props.image.image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Heading as="h1">
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.h1}
            </Heading>
            <Subhead as="h2">{props.subhead}</Subhead>
            <Text as="p">{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HeroBannerContent on ContentfulComponentHeroBanner {
    id
    kicker
    h1: heading
    subhead
    text
    links {
      id
      target {
        slug
      }
      url
      text
    }
    image {
      alt
      image {
        id
        gatsbyImageData
      }
    }
  }
`
