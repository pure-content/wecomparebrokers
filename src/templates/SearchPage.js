import React, { useState, useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import withLocation from "../hoc/withLocation"
import Pagination from "../components/Pagination"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"

function SearchPage({ search }) {
  const info = useStaticQuery(graphql`
    query {
      wpgraphql {
        brokers123(
          first: 5000
          where: { orderby: { field: MENU_ORDER, order: DESC } }
        ) {
          nodes {
            uri
            title
            id
            databaseId
            date
            featuredImage {
              node {
                mediaItemUrl
                sizes(size: BROKERS_LIST_THUMB)
                srcSet(size: BROKERS_LIST_THUMB)
              }
            }
            cptBrokers {
              brokerType
              ratingCommFees
              ratingCustResearch
              ratingCustServ
              ratingEase
              ratingMobTrad
              ratingPlatfTools
              likesList
              tabButtonAlternativeText
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
                      srcSet(size: BROKERS_LIST_THUMB)
                      sizes(size: BROKERS_LIST_THUMB)
                    }
                  }
                }
              }
            }
          }
        }

        brokerComparisons123(first: 1000) {
          nodes {
            title
            uri
            date
          }
        }

        posts(first: 1000) {
          nodes {
            title
            uri
            date
            featuredImage {
              node {
                mediaItemUrl
                srcSet(size: BROKERS_LIST_THUMB)
                sizes(size: BROKERS_LIST_THUMB)
              }
            }
          }
        }

        comparisons123(first: 1000) {
          nodes {
            title
            uri
            date
          }
        }

        forexMarketNews123(first: 1000) {
          nodes {
            uri
            title
            date
            featuredImage {
              node {
                mediaItemUrl
                srcSet(size: BROKERS_LIST_THUMB)
                sizes(size: BROKERS_LIST_THUMB)
              }
            }
          }
        }

        pages(first: 1000) {
          nodes {
            title
            uri
            date
            featuredImage {
              node {
                mediaItemUrl
                srcSet(size: BROKERS_LIST_THUMB)
                sizes(size: BROKERS_LIST_THUMB)
              }
            }
          }
        }

        topBrokers123(first: 1000) {
          nodes {
            uri
            title
            date
            featuredImage {
              node {
                mediaItemUrl
                srcSet(size: BROKERS_LIST_THUMB)
                sizes(size: BROKERS_LIST_THUMB)
              }
            }
          }
        }

        acfOptionsGeneralSettings {
          optGeneralSettings {
            specialOfferIcon {
              mediaItemUrl
            }
            brokerCallBackButtonAlternativeText
            visitBrokerButtonAlternativeText
            compareBrokerSideBySideButtonAlternativeText
            readFullReviewButtonAlternativeText
            takeMeToBrokerButtonAlternativeText
          }
        }
      }
    }
  `)

  const searchString = search.s
  const allData = [].concat(
    info.wpgraphql.brokers123.nodes,
    info.wpgraphql.brokerComparisons123.nodes,
    info.wpgraphql.posts.nodes,
    info.wpgraphql.comparisons123.nodes,
    info.wpgraphql.forexMarketNews123.nodes,
    info.wpgraphql.pages.nodes,
    info.wpgraphql.topBrokers123.nodes
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(24)
  const [sortedData, setSortedData] = useState(
    allData.sort(
      (a, b) => new Date(b.date.split("T")[0]) - new Date(a.date.split("T")[0])
    )
  )
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  useEffect(() => {
    if (Object.keys(search).length > 0) {
      const filteredData = sortedData.filter(eachData => {
        if (eachData.title.toLowerCase().includes(searchString.toLowerCase())) {
          return eachData
        }
      })
      setSortedData(
        filteredData.sort(
          (a, b) =>
            new Date(b.date.split("T")[0]) - new Date(a.date.split("T")[0])
        )
      )
    }
  }, [search])

  const currentResult = sortedData.slice(indexOfFirstPost, indexOfLastPost)

  const ResultTableItem = props => {
    const { res } = props
    const platfomsList = [
      "MT5",
      "MT4",
      "WebTrader",
      "Mobile apps",
      "Proprietary",
      "cTrader",
    ]
    const accountsList = ["Micro", "Retail", "VIP", "Professional"]
    const spreadsList = ["Fixed", "Variable"]
    const methodsList = ["Bank transfer", "Credit Cards", "PayPal"]
    const acfOptionsGeneralSettings = info
    if (res.hasOwnProperty("cptBrokers")) {
      const platfThumbURL = res.cptBrokers.platformRelation
        ? res.cptBrokers.platformRelation.featuredImage.node.mediaItemUrl
        : null
      return <BrokerTableSingleItemNewView brokerInfo={res} />
    } else {
      return (
        <div class="row collapse broker-wrap">
          <div class="broker-tab-col img-col">
            <div class="thumb-wrap">
              {res.featuredImage ? (
                <img
                  src={res.featuredImage.node.mediaItemUrl}
                  sizes={res.featuredImage.node.sizes}
                  srcSet={res.featuredImage.node.srcSet}
                />
              ) : (
                <img
                  class="img-list-default"
                  src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/generic-logo.png"
                  alt="WCB Logo"
                />
              )}
            </div>
          </div>

          <div class="broker-tab-col broker-name not-broker">
            <h3>{res.title}</h3>
          </div>

          <div className="broker-tab-col broker-content broker-col not-broker"></div>

          <div class="broker-tab-col btn-col">
            <Link className="btn small" to={res.uri}>
              Read article
            </Link>
          </div>
        </div>
      )
    }
  }
  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={`You searched for ${searchString}`}
      />
      <CompareFrom />
      <div class="row search-row">
        <div class="large-12 columns">
          <h3 class="archive-title">
            Search results for: <strong>{search.s}</strong>
          </h3>
          <div class="row brokers-list">
            <div class="small-12 columns">
              {currentResult.length > 0 ? (
                currentResult.map(res => <ResultTableItem res={res} />)
              ) : (
                <h1>Sorry, nothing was found</h1>
              )}
            </div>
          </div>
          {currentResult.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={postsPerPage}
              totalPosts={sortedData.length}
              noNumbers={false}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
export default withLocation(SearchPage)
