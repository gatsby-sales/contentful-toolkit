import * as React from "react"
import { graphql } from "gatsby"
import { Container, Box, Kicker, Heading, Text } from "./ui"
import Feature from "./feature"

// export interface FeatureListProps {
//   kicker?: string
//   heading: string
//   text?: string
//   content: Queries.FeatureContentFragment[]
// }

export default function FeatureList(props: Queries.FeatureListContentFragment) {
  return (
    <Container width="fullbleed">
      <Box background="muted" radius="large">
        <Box center paddingY={5}>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        {props.content.map((feature: Queries.FeatureContentFragment, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment FeatureListContent on ContentfulComponentPageSection {
    id
    sectionType
    kicker
    heading
    subhead
    content {
      ...FeatureContent
    }
  }
`
