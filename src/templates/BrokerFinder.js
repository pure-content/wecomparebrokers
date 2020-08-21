import React, { useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Equalizer from "../components/Equalizer"
import Helmet from "react-helmet"
import BrokerList from "../components/BrokerList"
import CompareFrom from "../components/CompareFrom"
import RecommendedBroker from "../components/RecommendedBroker"
import BrokerTableSingleItem from "../components/BrokerTableSingleItem"
const shortid = require("shortid")

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      brokers123(first: 10000) {
        nodes {
          uri
          title
          id
          databaseId
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          cptBrokers {
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
        }
      }
      page(id: $id) {
        title
        content
        id
        isFrontPage
        allPagesFields {
          alternativeTitle
          pageIcon {
            mediaItemUrl
          }
          videoPage
        }
        tmplBrokerFinder {
          rightColumnTitle
          bodyTextChoosing
          recommendedBrokerAdditionalText
          recommendedBroker {
            ... on WPGraphQL_Broker123 {
              id
              cptBrokers {
                specialOffer
                ourScore
                likesList
                affiliateLink
                tabButtonAlternativeText
                takeMeToBrokerButtonNoteText
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              title
            }
          }
        }
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
      themeGeneralSettings {
        optGeneralSettings {
          specialOfferIcon {
            mediaItemUrl
          }
        }
      }
    }
  }
`

export default function BrokerFinderTemplate({ data }) {
  const page = data.wpgraphql.page
  const brokers = data.wpgraphql.brokers123.nodes
  const pageTemplate = data.wpgraphql.page.tmplBrokerFinder
  const dt = new Date()

  useEffect(() => {
    let country = $(
        '#main-form #country option[value="<?php echo $country; ?>"]'
      ),
      catVal = country.val(),
      instrument = $(
        '#main-form #instrument option[value="<?php echo $instrum; ?>"]'
      ),
      instVal = instrument.val()
    $("#main-form #country").val(catVal).trigger("change")
    $("#main-form #instrument").val(instVal).trigger("change")
    $("#popup-sec-usr").select2({
      placeholder: "Second Broker",
      minimumResultsForSearch: Infinity,
    })
    $("#compare-form .close").click(function () {
      $("#compare-form-wrap").fadeOut("fast")
    })
    $("#main-form #country").select2({
      placeholder: "Preferred Trading Region",
      allowClear: true,
    })
    $("#main-form #instrument").select2({
      placeholder: "Broker Type",
      minimumResultsForSearch: Infinity,
      allowClear: true,
    })
    $(".top-content-col").matchHeight()
    $(".broker-col").matchHeight()
  }, [])

  const TopContent = () => {
    return (
      <div className="top-content-wrap find-page">
        <div className="row top-content">
          <div className="large-5 medium-6 columns top-content-col">
            <div className="crumbs">
              <Link to="/">Home page</Link> -&gt;
              <span>
                {page.allPagesFields.alternativeTitle
                  ? Parser(page.allPagesFields.alternativeTitle)
                  : Parser(page.title)}
              </span>
            </div>
            <article>
              <h1 className="page_title">
                {page.allPagesFields.pageIcon.mediaItemUrl ? (
                  <img
                    src={page.allPagesFields.pageIcon.mediaItemUrl}
                    alt="Title"
                  />
                ) : (
                  ""
                )}
                {page.allPagesFields.alternativeTitle
                  ? Parser(page.allPagesFields.alternativeTitle)
                  : Parser(page.title)}
              </h1>
              <div className="dot-sep">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </article>
          </div>
          <div className="medium-6 columns top-content-col">
            <div className="thumb-wrap">
              {pageTemplate.rightColumnTitle ? (
                <h2>
                  {pageTemplate.rightColumnTitle} {dt.getFullYear()}
                </h2>
              ) : (
                ""
              )}
              {page.allPagesFields.videoPage ? (
                page.allPagesFields.videoPage
              ) : page.featuredImage ? (
                <img src={page.featuredImage.node.mediaItemUrl} />
              ) : (
                ""
              )}
              {Parser(page.content)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const Filter = () => {
    const brokerRegions = ["USA", "EU", "APAC", "ASIA", "Africa"]
    const brokerTypes = {
      forex: "Forex",
      etf: "ETF",
      stocks: "Stocks",
      cfd: "CFD",
      crypto: "Crypto",
      soc_trad: "Social Trading",
      spread_bet: "Spread Betting",
      commodities: "Commodities",
      bin_opt: "Binary Options",
    }

    return (
      <div class="row">
        <div class="small-12 columns">
          <div class="filter-wrap">
            <h3>
              <img
                src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/filter-ico.svg"
                alt="Filter"
              />
              Filters
            </h3>
            <form id="main-form" action={page.uri} method="get">
              <select id="country" name="country">
                <option></option>
                {brokerRegions.map(region => {
                  return <option value={region}>{region}</option>
                })}
              </select>
              <select id="instrument" name="instrument">
                <option></option>
                {Object.keys(brokerTypes).map(key => {
                  return <option value={key}>{brokerTypes[key]}</option>
                })}
              </select>

              <button id="form-submit" class="btn blue" type="submit">
                Find Me a Broker
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // const BrokersList = () => {
  //   return (
  //     <div class="row brokers-list">
  //       <div class="small-12 columns"></div>
  //     </div>
  //   )
  // }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
  }

  return (
    <Layout pageInfo={pageInfo}>
      <CompareFrom />
      <TopContent />
      <Filter />
      <div class="row brokers-list">
        <div class="small-12 columns">
          <RecommendedBroker
            recommendedBroker={pageTemplate.recommendedBroker}
            recommendedBrokerAdditionalText={
              pageTemplate.recommendedBrokerAdditionalText
            }
          />
          {brokers.map(eachBroker => {
            return <BrokerTableSingleItem brokerInfo={eachBroker} />
          })}
        </div>
      </div>
      <div class="choose-wrap bot-text">
        <div class="row">
          <div class="medium-10 columns small-centered">
            {Parser(
              pageTemplate.bodyTextChoosing ? pageTemplate.bodyTextChoosing : ""
            )}
          </div>
        </div>
      </div>
      {/* <BrokerList
        recommendedBroker={pageTemplate.recommendedBroker}
        recommendedBrokerAdditionalText={
          pageTemplate.recommendedBrokerAdditionalText
        }
      /> */}
    </Layout>
  )
}
