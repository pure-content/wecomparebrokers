import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import RecommendedBroker from "../components/RecommendedBroker"
import { brokerRegions } from "../data/brokerRegions"
import { brokerTypes } from "../data/brokerTypes"
import withLocation from "../hoc/withLocation"
import PageTopContent from "../components/PageTopContent"
import Pagination from "../components/Pagination"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"
import CallBackFormPopUp from "../components/CallBackFormPopUp"
const shortid = require("shortid")

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      brokers123(
        first: 10000
        where: { health: "good", orderby: { field: MENU_ORDER, order: DESC } }
      ) {
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
        uri
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
      acfOptionsGeneralSettings {
        optGeneralSettings {
          specialOfferIcon {
            mediaItemUrl
          }
        }
      }
    }
  }
`

function BrokerFinderTemplate({ data, search }) {
  const page = data.wpgraphql.page
  const brokers = data.wpgraphql.brokers123.nodes
  const pageTemplate = data.wpgraphql.page.tmplBrokerFinder
  const dt = new Date()

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const [filteredBrokers, setFilteredBrokers] = useState(brokers)

  const currentBrokers = filteredBrokers.slice(
    indexOfFirstPost,
    indexOfLastPost
  )

  useEffect(() => {
    if (search) {
      let country = $(`#main-form #country option[value="${search.country}"]`),
        catVal = country.val(),
        instrument = $(
          `#main-form #instrument option[value="${search.instrument}"]`
        ),
        instVal = instrument.val()
      $("#main-form #country").val(catVal).trigger("change")
      $("#main-form #instrument").val(instVal).trigger("change")
    }
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
    // $(".top-content-col").matchHeight()
    $(".broker-col").matchHeight()

    $(".compare-btn").on("click", function () {
      var brokValue = $(this).attr("value")
      $("#first-user").val(brokValue)
      $("#compare-form-wrap").fadeIn("fast")
    })
    $("#compare-form .close").on("click", function () {
      $("#compare-form-wrap").fadeOut("fast")
    })

    $(".compare-btn-add").on("click", function () {
      var brokValue = $(this).attr("value")
      $("#first-user-add").val(brokValue)
    })
  })

  useEffect(() => {
    if (search.country && search.instrument) {
      const sortedBrokers = filteredBrokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerType &&
          eachBroker.cptBrokers.brokerType.includes(search.instrument) &&
          eachBroker.cptBrokers.brokerRegion &&
          eachBroker.cptBrokers.brokerRegion.includes(search.country)
        ) {
          return eachBroker
        }
      })
      setFilteredBrokers(sortedBrokers)
    }
    if (search.country && !search.instrument) {
      const sortedBrokers = filteredBrokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerRegion &&
          eachBroker.cptBrokers.brokerRegion.includes(search.country)
        ) {
          return eachBroker
        }
      })
      setFilteredBrokers(sortedBrokers)
    }
    if (!search.country && search.instrument) {
      const sortedBrokers = filteredBrokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerType &&
          eachBroker.cptBrokers.brokerType.includes(search.instrument)
        ) {
          return eachBroker
        }
      })
      setFilteredBrokers(sortedBrokers)
    }
  }, [search])

  useEffect(() => {
    $("html, body").animate(
      {
        scrollTop: $("#rec-brok-wrap").offset().top,
      },
      1000
    )
  }, [currentPage])

  const Filter = () => {
    return (
      <div className="row">
        <div className="small-12 columns">
          <div className="filter-wrap">
            <h3>
              <img
                src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/filter-ico.svg"
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

              <button id="form-submit" className="btn blue" type="submit">
                Find Me a Broker
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
    uri: page.uri,
  }
  const { seo } = page

  return (
    <Layout pageInfo={pageInfo}>
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
            headline: page.title,
            url: `https://www.wecomparebrokers.com${page.uri}`,
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
                  "@id": `https://www.wecomparebrokers.com${page.uri}`,
                  name: page.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <CompareFrom />
      <CallBackFormPopUp />
      <PageTopContent page={page} template={pageTemplate} />
      <Filter />
      <div className="row brokers-list">
        <div className="small-12 columns">
          <RecommendedBroker
            recommendedBroker={pageTemplate.recommendedBroker}
            recommendedBrokerAdditionalText={
              pageTemplate.recommendedBrokerAdditionalText
            }
          />
          {currentBrokers.map(eachBroker => {
            return (
              <BrokerTableSingleItemNewView
                brokerInfo={eachBroker}
                recommendedBrokerAdditionalText={
                  pageTemplate.recommendedBrokerAdditionalText
                }
              />
            )
          })}
        </div>
        <div className="small-12 columns text-right btn-navi-wrap">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={filteredBrokers.length}
            noNumbers={false}
          />
        </div>
      </div>
      <div className="choose-wrap bot-text">
        <div className="row">
          <div className="medium-10 columns small-centered">
            {Parser(
              pageTemplate.bodyTextChoosing ? pageTemplate.bodyTextChoosing : ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withLocation(BrokerFinderTemplate)
