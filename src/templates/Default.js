import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
        featuredImage {
          node {
            mediaItemUrl
          }
        }
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

export default function DefaultTemplate({ data }) {
  const page = data.wpgraphql.page
  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
  }
  return (
    <Layout pageInfo={pageInfo}>
      <div class="row page-wrap">
        <div class="small-12 columns">
          <article>
            <h1 class="page_title">{Parser(page.title ? page.title : "")}</h1>
            {page.featuredImage && (
              <div class="th">
                <img
                  src={
                    page.featuredImage
                      ? page.featuredImage.node.mediaItemUrl
                      : ""
                  }
                />
              </div>
            )}
            {Parser(page.content ? page.content : "")}
          </article>
        </div>
      </div>
    </Layout>
  )
}
