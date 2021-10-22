import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import Parser from "html-react-parser"
import Layout from "../components/layout"
import CompareFrom from "../components/CompareFrom"
import SideBarForexNews from "../components/SideBarForexNews"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"
import ComplainsComponent from "../components/ComplainsComponent"

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      forexMarketNewsPage123(id: $id) {
        title
        uri
        id
        date
        featuredImage {
          node {
            mediaItemUrl
            sizes(size: FOREX_NEWS_SINGLE_THUMB)
            srcSet(size: FOREX_NEWS_SINGLE_THUMB)
          }
        }

        author {
          node {
            name
            uri
          }
        }

        seo {
          metaDesc
          title
          opengraphType
        }
        cptForexMarketNews {
          forexMarketMainTextExerpt
          forexMarketMainText
          forexMarketBrokerList {
            ... on WPGraphQL_Broker123 {
              uri
              title
              id
              databaseId
              cptBrokers {
                ratingCommFees
                ratingCustResearch
                ratingCustServ
                ratingEase
                ratingMobTrad
                ratingPlatfTools
                likesList
                brokerRegion
                specialOffer
                affiliateLink
                minDeposit
                platformsList
                accountsList
                spreadsList
                methodsList
                takeMeToBrokerButtonNoteText
                ourScore
                allSpreadsPoints
                tableInfo
                platformRelation {
                  ... on WPGraphQL_Platform123 {
                    id
                    title
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
      acfOptionsHeader {
        optHeader {
          newHomepageLogo {
            mediaItemUrl
            altText
          }
        }
      }
      generalSettings {
        url
      }
    }
  }
`

export default function ForexMarketNewsSingle({ data }) {
  const page = data.wpgraphql.forexMarketNewsPage123
  const seo = page.seo
  const { forexMarketBrokerList } = page.cptForexMarketNews

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
            "@type": "NewsArticle",
            headline: seo.title,
            url: `https://www.wecomparebrokers.com${page?.uri}`,
            author: {
              "@type": "Person",
              name: page?.author?.node?.name,
              url: `https://www.wecomparebrokers.com${page?.author?.node?.uri}`,
            },
            datePublished: page?.date,
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
                  "@id": `https://www.wecomparebrokers.com/forex-market-news`,
                  name: "Forex Market News",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <CompareFrom />
      <section class="row forex-news-page">
        <div class="large-9 medium-8 columns">
          <div class="forex-news-main-text">
            {page.featuredImage ? (
              <div class="thumb-wrap">
                <img
                  width="1050"
                  height="350"
                  className="attachment-forex-news-single-thumb size-forex-news-single-thumb wp-post-image lazyloaded"
                  src={page.featuredImage.node.mediaItemUrl}
                  sizes={page.featuredImage.node.sizes}
                  srcSet={page.featuredImage.node.srcSet}
                />
              </div>
            ) : null}
            <div class="forex-post-data">
              <span>Author: {page.author.node.name}</span>
              <span>Date: {page.date.split("T")[0]}</span>
            </div>
            <h2>{page.title}</h2>
            {page.cptForexMarketNews.forexMarketMainText
              ? Parser(
                  page.cptForexMarketNews.forexMarketMainText
                    ? page.cptForexMarketNews.forexMarketMainText
                    : ""
                )
              : null}
          </div>
        </div>
        <div class="large-3 medium-4 columns sidebar">
          <SideBarForexNews />
        </div>
        <div class="columns small-12 brokers-list">
          {forexMarketBrokerList
            ? forexMarketBrokerList.map(broker => {
                return (
                  <BrokerTableSingleItemNewView
                    key={broker.id}
                    brokerInfo={broker}
                  />
                )
              })
            : null}
        </div>
        <div class="cma-comp-list-wrap column small-12">
          <ComplainsComponent />
        </div>
      </section>
    </Layout>
  )
}
