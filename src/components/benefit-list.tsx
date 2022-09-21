import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
  HomepageImage,
} from "./ui"

// interface BenefitProps {
//   id: string
//   image?: HomepageImage
//   heading: string
//   text: string
// }

function Benefit(props: BenefitProps) {
  return (
    <Box as="li" width="third" padding={4} paddingY={3}>
      {props.icon && (
        <Icon
          alt={props.icon.alt}
          image={props.icon.image.gatsbyImageData}
          size="small"
        />
      )}
      <Space size={2} />
      <Heading variant="subheadSmall">{props.heading}</Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

// export interface BenefitListProps {
//   heading?: string
//   text?: string
//   content: BenefitProps[]
// }

export default function BenefitList(props: Queries.BenefitListContentFragment) {
  return (
    <Section>
      <Container>
        <Box center>
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && <Text variant="lead">{props.text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant="start" responsive wrap>
          {props.content.map((benefit) => (
            <Benefit key={benefit.id} {...benefit} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment BenefitListContent on ContentfulComponentPageSection {
    id
    sectionType
    heading
    subhead
    content {
      ... on ContentfulComponentCard {
        id
        heading
        text
        icon {
          alt
          image {
            id
            gatsbyImageData
          }
        }
      }
    }
  }
`
