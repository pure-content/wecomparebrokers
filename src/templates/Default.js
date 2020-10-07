import React, { useEffect } from "react"
import { graphql } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import Parser from "html-react-parser"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
        uri
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

  useEffect(() => {
    $('.uagb-toc__title-wrap').on('click', function () {
      $('.uagb-toc__list-wrap').slideToggle('fast')
    })
  })

  const page = data.wpgraphql.page
  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
    uri: page.uri
  }

  return (
    <Layout pageInfo={pageInfo}>

      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={page.seo.title}
        meta={[
          { name: "description", content: page.seo.metaDesc },
          { property: "og:type", content: page.seo.opengraphType },
        ]}
      />
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
