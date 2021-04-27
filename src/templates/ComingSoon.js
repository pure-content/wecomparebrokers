import React from "react"
import { graphql, Link } from "gatsby"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        uri

        contentType {
          node {
            name
          }
        }

        seo {
          metaDesc
          title
          opengraphType
        }
      }
    }
  }
`

export default function ComingSoonTemplate({ data }) {
  const page = data.wpgraphql.page

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
  }
  return (
    <Layout isFrontPage={page.isFrontPage}>
      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={page.seo.title}
        meta={[
          { name: "description", content: page.seo.metaDesc },
          { property: "og:type", content: page.seo.opengraphType },
          { property: "og:title", content: page.seo.title },
          { property: "og:description", content: page.seo.metaDesc },
        ]}
      />
      <div class="row soon-wrap">
        <div class="small-12 columns">
          <article>
            {Parser(page.content)}
          </article>
        </div>
      </div>
    </Layout>
  )
}
