import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  Heading,
  Kicker,
  Flex,
  Box,
  FlexList,
  Blockquote,
  Text,
  Avatar,
} from "./ui"

// interface TestimonialProps {
//   id: string
//   avatar: HomepageImage
//   quote: string
//   source: string
// }

function Testimonial(props: Queries.ContentfulTopicTestimonial) {
  return (
    <Flex variant="start">
      {props.author.image && (
        <Avatar
          alt={props.author.image.alt}
          image={props.author.image.image.gatsbyImageData}
        />
      )}
      <Blockquote>
        <Text as="p" variant="lead">
          {props.quote}
        </Text>
        <figcaption>
          <Text as="cite" bold variant="caps">
            {props.author.name}
          </Text>
        </figcaption>
      </Blockquote>
    </Flex>
  )
}

// export interface TestimonialListProps {
//   kicker?: string
//   heading: string
//   content: TestimonialProps[]
// }

export default function TestimonialList(
  props: Queries.TestimonialListContentFragment
) {
  const testimonials = props.content[0].items
  return (
    <Section>
      <Container>
        <Box center>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
        </Box>
        <FlexList gutter={3} variant="start" responsive wrap>
          {testimonials.map(
            (testimonial: Queries.ContentfulTopicTestimonial, index) => (
              <Box
                as="li"
                key={testimonial.id + index}
                width="half"
                padding={3}
              >
                <Testimonial {...testimonial} />
              </Box>
            )
          )}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment TestimonialListContent on ContentfulComponentPageSection {
    id
    sectionType
    kicker
    heading
    content {
      ... on ContentfulComponentList {
        listType
        id
        items {
          ... on ContentfulTopicTestimonial {
            id
            quote
            author {
              image {
                id
                alt
                image {
                  gatsbyImageData
                }
              }
              jobTitle
              name
            }
          }
        }
      }
    }
  }
`
