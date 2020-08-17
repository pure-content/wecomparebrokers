import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
      }
    }
  }
`

export default function ComparisonPageTemplate({ data }) {
  const page = data.wpgraphql.page
  return (
    <Layout isFrontPage={page.isFrontPage}>
      <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  )
}
