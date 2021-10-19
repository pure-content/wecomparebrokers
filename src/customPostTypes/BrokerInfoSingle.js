import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      article123(id: $id) {
        title
        uri
        id
        content

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

        featuredImage {
          node {
            mediaItemUrl
            sizes(size: CRYPTO_LATEST_THUMB)
            srcSet(size: CRYPTO_LATEST_THUMB)
          }
        }
      }

      wpusb {
        wpusb
      }
    }
  }
`

export default function BrokerInfoSingle({ data }) {
  const { article123, wpusb } = data.wpgraphql
  const seo = article123.seo
  return (
    <Layout>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta name="og:type" content={seo.opengraphType} />
        <meta name="og:title" content={seo.title} />
        <meta name="og:description" content={seo.metaDesc} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            headline: article123.title,
            url: `https://www.wecomparebrokers.com${article123.uri}`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://www.wecomparebrokers.com/",
                  url: "https://www.wecomparebrokers.com",
                  name: "Home Page",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `https://www.wecomparebrokers.com${article123.uri}`,
                  name: article123.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div class="blog-tmpl-wrap crypto-blog">
        <div class="row top-content top-single-post">
          <div class="small-12 columns">
            <div class="crumbs">
              <Link to={"/"}>Home page</Link> -&gt;
              <span>{article123.title}</span>
            </div>
          </div>
        </div>

        <div class="row blog-content-row">
          <div class="small-12 columns blog-post">
            <article>
              {article123.featuredImage ? (
                <div
                  class="single-crypto-bg-wrap"
                  style={{
                    backgroundImage: `url(${article123.featuredImage.node.mediaItemUrl})`,
                  }}
                ></div>
              ) : null}
              <div class="post-meta">
                <div class="social-share">
                  {Parser(wpusb.wpusb ? wpusb.wpusb : "")}
                </div>
              </div>
              <h1 class="page_title">
                <div class="dot-sep">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="title-text">
                  <span class="title">{article123.title}</span>
                </div>
              </h1>
              {Parser(article123.content ? article123.content : "")}
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}
