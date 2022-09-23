import * as React from "react"
import { graphql } from "gatsby"
import { Space, Container, Section, FlexList, Text, Logo, Heading } from "./ui"

// export interface LogoItemProps {
//   id: string
//   alt: string
//   image: ContentfulTopicMediaWrapper
// }

export function LogoItem(props) {
  if (!props.image) return null

  return (
    <Logo alt={props.alt} image={props.image.gatsbyImageData} size="medium" />
  )
}

// export interface LogoListProps {
//   subhead?: string
//   logos: LogoItemProps[]
// }

export default function LogoList(props: Queries.LogoListContentFragment) {
  return (
    <Section paddingY={4}>
      <Container width="narrow">
        {props.heading && <Heading>{props.heading}</Heading>}

        {props.subhead && (
          <Text center variant="lead">
            {props.subhead}
          </Text>
        )}
        <Space size={4} />
        <FlexList gap={4} variant="center">
          {props.logos[0].items.map(
            (logo) =>
              logo && (
                <li key={logo.image.id}>
                  <LogoItem {...logo} />
                </li>
              )
          )}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment LogoListContent on ContentfulComponentPageSection {
    id
    sectionType
    heading
    subhead
    logos: content {
      ... on ContentfulComponentList {
        items {
          ... on ContentfulTopicMediaWrapper {
            alt
            image {
              id
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
