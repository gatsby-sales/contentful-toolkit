import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
} from "./ui"

// interface AboutProfileProps {
//   id: string
//   image?: HomepageImage
//   name?: string
//   jobTitle?: string
// }

function AboutProfile(props) {
  return (
    <Box width="third" padding={4} center>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image.gatsbyImageData)}
        />
      )}
      <Space size={3} />
      <Box>
        {props.name && (
          <Text variant="medium" bold center>
            {props.name}
          </Text>
        )}
        {props.jobTitle && (
          <Text variant="medium" center>
            {props.jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  )
}

// export interface AboutLeadershipProps {
//   kicker?: string
//   heading?: string
//   subhead?: string
//   content: AboutProfileProps[]
// }

export default function LeadershipList(props) {
  return (
    <Section>
      <Container width="tight">
        <Box center paddingY={4}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment LeadershipListContent on ContentfulComponentPageSection {
    id
    kicker
    heading
    subhead
    content {
      ... on ContentfulComponentList {
        id
        name
        items {
          ... on ContentfulTopicPerson {
            id
            name
            jobTitle
            image {
              alt
              image {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
