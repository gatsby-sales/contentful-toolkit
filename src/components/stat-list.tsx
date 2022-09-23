import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
  Nudge,
} from "./ui"

// interface StatProps {
//   id: string
//   value: string
//   label: string
// }

function Stat(props) {
  return (
    <Box>
      <Text variant="stat">{props.value}</Text>
      <Text variant="statLabel">{props.label}</Text>
    </Box>
  )
}
// export interface StatListProps {
//   icon?: HomepageImage
//   kicker?: string
//   heading: string
//   text?: string
//   content: StatProps[]
//   links: HomepageLink[]
//   image?: HomepageImage
// }

export default function StatList(props: Queries.StatListContentFragment) {
  const stats = props.content.filter(
    (item: Queries.ContentfulEntry) =>
      item.internal.type === "ContentfulTopicStatistics"
  )[0].statistics
  const link: Queries.ContentfulComponentLink | {} = props.content.filter(
    (item: Queries.ContentfulEntry) =>
      item.internal.type === "ContentfulComponentLink"
  )[0]
  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Flex responsive variant="end">
          <Box width="half">
            {props.icon && (
              <Icon
                alt={props.icon.alt}
                image={props.icon.image.gatsbyImageData}
              />
            )}
            <Heading>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Heading>
            {props.subhead && <Text variant="lead">{props.subhead}</Text>}
            <FlexList wrap gap={4}>
              {stats.map((stat) => (
                <li key={stat.id}>
                  <Stat {...stat} />
                </li>
              ))}
            </FlexList>
            {link && <ButtonList links={[link]} reversed />}
          </Box>
          <Box width="half">
            {props.backgroundImage && (
              <Nudge right={5} bottom={5}>
                <GatsbyImage
                  alt={props.backgroundImage.alt}
                  image={getImage(props.backgroundImage.image.gatsbyImageData)}
                />
              </Nudge>
            )}
          </Box>
        </Flex>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment StatListContent on ContentfulComponentPageSection {
    id
    sectionType
    kicker
    heading
    subhead
    backgroundImage {
      alt
      image {
        gatsbyImageData
      }
    }
    icon {
      alt
      image {
        gatsbyImageData
      }
    }
    content {
      ... on ContentfulTopicStatistics {
        id
        statistics {
          id
          label: key
          value
        }
        internal {
          type
        }
      }
      ... on ContentfulComponentLink {
        id
        target {
          slug
        }
        text
        url
        internal {
          type
        }
      }
    }
  }
`
