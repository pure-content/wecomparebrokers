import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import { brokerRegions } from "../../data/brokerRegions"
import { brokerTypes } from "../../data/brokerTypes"
import withLocation from "../../hoc/withLocation"
import CompareFrom from "../../components/CompareFrom"
import Pagination from "../../components/Pagination"
import BrokerTableSingleItemNewView from "../../components/BrokerTableSingleItemNewView"

function ArchiveBrokers({ search }) {
  const brokersQuery = useStaticQuery(graphql`
    query {
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

        acfOptionsGeneralSettings {
          optGeneralSettings {
            brokerArchiveHeader
            brokerArchiveText
          }
        }
      }
    }
  `)

  const brokers = brokersQuery.wpgraphql.brokers123.nodes

  const { acfOptionsGeneralSettings } = brokersQuery.wpgraphql

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const brokerSorter = () => {
    if (search.country && search.instrument) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerType &&
          eachBroker.cptBrokers.brokerType.includes(search.instrument) &&
          eachBroker.cptBrokers.brokerRegion &&
          eachBroker.cptBrokers.brokerRegion.includes(search.country)
        ) {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (search.country && !search.instrument) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerRegion &&
          eachBroker.cptBrokers.brokerRegion.includes(search.country)
        ) {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (!search.country && search.instrument) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (
          eachBroker.cptBrokers.brokerType &&
          eachBroker.cptBrokers.brokerType.includes(search.instrument)
        ) {
          return eachBroker
        }
      })
      return sortedBrokers
    }
    const sortedBrokers = brokers
    return sortedBrokers
  }

  const currentBrokers = brokerSorter().slice(indexOfFirstPost, indexOfLastPost)

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
    $(".top-content-col").matchHeight()
    $(".broker-col").matchHeight()

    $(".compare-btn").click(function () {
      var brokValue = $(this).attr("value")
      $("#first-user").val(brokValue)
      $("#compare-form-wrap").fadeIn("fast")
    })
    $("#compare-form .close").click(function () {
      $("#compare-form-wrap").fadeOut("fast")
    })

    $(".compare-btn-add").click(function () {
      var brokValue = $(this).attr("value")
      $("#first-user-add").val(brokValue)
    })
  })

  const Filter = () => {
    return (
      <div className="row">
        <div className="small-12 columns">
          <div className="filter-wrap">
            <h3>
              <img
                src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/filter-ico.svg"
                alt="Filter"
              />{" "}
              Filters{" "}
            </h3>
            <form id="main-form" action="" method="get">
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

  return (
    <Layout>
      <CompareFrom />

      <div class="row archive-brokers-heading">
        <div class="small-12 columns">
          {acfOptionsGeneralSettings.optGeneralSettings.brokerArchiveHeader ? (
            <h1>
              {Parser(
                acfOptionsGeneralSettings.optGeneralSettings.brokerArchiveHeader
                  ? acfOptionsGeneralSettings.optGeneralSettings
                      .brokerArchiveHeader
                  : ""
              )}
            </h1>
          ) : null}
          {acfOptionsGeneralSettings.optGeneralSettings.brokerArchiveText ? (
            <p>
              {Parser(
                acfOptionsGeneralSettings.optGeneralSettings.brokerArchiveText
                  ? acfOptionsGeneralSettings.optGeneralSettings
                      .brokerArchiveText
                  : ""
              )}
            </p>
          ) : null}
        </div>
      </div>

      <Filter />

      <div className="row brokers-list">
        <div className="small-12 columns">
          {currentBrokers.map(eachBroker => {
            return <BrokerTableSingleItemNewView brokerInfo={eachBroker} />
          })}
        </div>
        <div className="small-12 columns text-right btn-navi-wrap">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={brokers.length}
            noNumbers={true}
          />
        </div>
      </div>
    </Layout>
  )
}

export default withLocation(ArchiveBrokers)
