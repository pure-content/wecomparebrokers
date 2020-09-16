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

const PageTemplate = ({ data }) => {
  const page = data.wpgraphql.page
  const TemplateName = page.template.templateName.split(" ").join("")

  return (
    <Layout isFrontPage={page.isFrontPage}>
      <TemplateName page={page} />
    </Layout>
  )
}

export default PageTemplate
