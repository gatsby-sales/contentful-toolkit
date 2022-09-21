import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
} from "./ui"

// export interface CtaProps {
//   id: string
//   kicker?: string
//   heading: string
//   text: string
//   links: HomepageLink[]
//   image?: HomepageImage
// }

export default function HomepageCta(props: Queries.CtaContentFragment) {
  const image: Queries.ContentfulTopicMediaWrapper = props.content.filter(
    (item: Queries.ContentfulEntry) =>
      item.internal.type === "ContentfulTopicMediaWrapper"
  )[0]
  const links: Queries.ContentfulComponentList = props.content.filter(
    (item: Queries.ContentfulEntry) =>
      item.internal.type === "ContentfulComponentList"
  )[0]

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Heading center>
          {props.kicker && <Kicker center>{props.kicker}</Kicker>}
          {props.heading}
        </Heading>
        <Text as="p" center variant="lead">
          {props.subhead}
        </Text>
        <ButtonList links={links.items} variant="center" reversed />
        {image && (
          <Nudge left={5} right={5} bottom={5}>
            <GatsbyImage
              alt={image.alt}
              image={getImage(image.image.gatsbyImageData)}
            />
          </Nudge>
        )}
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment CtaContent on ContentfulComponentPageSection {
    id
    sectionType
    kicker
    heading
    subhead
    content {
      ... on ContentfulComponentList {
        listType
        items {
          ... on ContentfulComponentLink {
            id
            text
            target {
              slug
            }
            url
          }
        }
        internal {
          type
        }
      }
      ... on ContentfulTopicMediaWrapper {
        id
        alt
        image {
          gatsbyImageData
        }
        internal {
          type
        }
      }
    }
  }
`
