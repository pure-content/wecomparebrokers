import React, { useEffect } from "react"
import $ from "jquery"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Equalizer from "../components/Equalizer"
import Helmet from "react-helmet"
import BrokerList from "../components/BrokerList"
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
          cptBrokers {
            brokerRegion
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
  }, [])

  const CompareForm = () => {
    return (
      <div id="compare-form-wrap">
        <div id="compare-form">
          <span className="close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
          <h4>Please select the second broker</h4>
          <form action="/compare-forex-brokers/" method="get">
            <input id="first-user" name="first-usr" type="hidden" value="" />

            <select id="popup-sec-usr" name="sec-usr">
              <option></option>
              {brokers.map(brok => {
                return <option value={brok.databaseId}>{brok.title}</option>
              })}
            </select>

            <button className="btn blue" type="submit">
              Go to comparison page
            </button>
          </form>
        </div>
      </div>
    )
  }

  const TopContent = () => {
    return (
      <div className="top-content-wrap find-page">
        <div className="row top-content">
          <div className="large-5 medium-6 columns" data-mh="top-content-col">
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
          <div className="medium-6 columns" data-mh="top-content-col">
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

  return (
    <Layout isFrontPage={page.isFrontPage} contentType={page.contentType}>
      <CompareForm />
      <TopContent />
      <Filter />
      <BrokerList />
    </Layout>
  )
}
