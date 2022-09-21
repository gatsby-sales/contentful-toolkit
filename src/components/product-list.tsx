import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Subhead,
  Box,
  Icon,
  LinkList,
} from "./ui"

// interface ProductProps {
//   id: string
//   image: HomepageImage
//   heading: string
//   text: string
//   links: HomepageLink[]
// }

function Product(props: Queries.ContentfulComponentCard) {
  return (
    <Box center>
      {props.icon && (
        <Icon
          alt={props.icon.alt}
          image={props.icon.image.gatsbyImageData}
          size="large"
        />
      )}
      <Subhead>{props.heading}</Subhead>
      <Text>{props.text}</Text>
      <LinkList links={[props.link]} />
    </Box>
  )
}

// export interface ProductListProps {
//   kicker?: string
//   heading: string
//   text?: string
//   content: ProductProps[]
// }

export default function ProductList(props: Queries.ProductListContentFragment) {
  return (
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {props.content.map((product: Queries.ContentfulComponentCard) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment ProductListContent on ContentfulComponentPageSection {
    id
    sectionType
    kicker
    heading
    subhead
    content {
      ... on ContentfulComponentCard {
        id
        heading
        text
        icon {
          alt
          id
          image {
            gatsbyImageData
          }
        }
        link {
          id
          target {
            slug
          }
          url
          text
        }
      }
    }
  }
`
