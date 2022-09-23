import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import SEO from "../components/seo"
import Fallback from "../components/fallback"

// interface PageProps {
//   data: {
//     page: {
//       id: string
//       title: string
//       slug: string
//       seo: { description: string; ogImage: { id: string; url: string } }
//       html: string
//       blocks: {
//         id: string
//         pageComponents: ContentfulComponentPageSection[]
//       }
//     }
//   }
// }

export default function Page({ data }: PageProps<Queries.PageContentQuery>) {
  const { page } = data

  return (
    <Layout {...page}>
      {page.blocks.pageComponents.map((block) => {
        const { id, sectionType, ...componentProps } = block
        const blockType = !sectionType
          ? "HeroBanner"
          : sectionType.split(" ").join("")
        const Component = sections[blockType] || Fallback

        return <Component key={id} {...componentProps} />
      })}
    </Layout>
  )
}
export const Head = ({ data }: PageProps<Queries.PageContentQuery>) => {
  const { page } = data
  const { title, seo } = page
  const { description, ogImage } = seo
  return <SEO title={title} description={description} image={ogImage} />
}
export const query = graphql`
  query PageContent($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      id
      title
      seo {
        description
        ogImage {
          id
          url
        }
      }
      blocks: content {
        ...SectionsContent
      }
    }
  }
`
