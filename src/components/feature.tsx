import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  Flex,
  Box,
  Subhead,
  Kicker,
  Text,
  ButtonList,
  HomepageImage,
  HomepageLink,
} from "./ui"

interface FeatureProps {
  flip: boolean
}

export default function Feature(
  props: Queries.FeatureContentFragment & FeatureProps
) {
  return (
    <Section padding={4} background="muted">
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={props.flip ? 1 : null}>
            {props.image && (
              <GatsbyImage
                alt={props.image.alt}
                image={getImage(props.image.image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Subhead>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Subhead>
            <Text variant="lead">{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment FeatureContent on ContentfulComponentFeature {
    id
    kicker
    heading
    text
    links {
      target {
        slug
      }
      url
      text
    }
    image {
      id
      alt
      image {
        gatsbyImageData
      }
    }
  }
`
