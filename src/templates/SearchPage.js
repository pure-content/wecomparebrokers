import React, { useState, useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import withLocation from "../hoc/withLocation"
import BrokerTableSingleItem from "../components/BrokerTableSingleItem"
import Pagination from "../components/Pagination"

function SearchPage({ search }) {
    const info = useStaticQuery(graphql`
        query {
            wpgraphql {
                brokers123( first: 10000 where: { orderby: { field: MENU_ORDER, order: DESC } } ){
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
                      featuredImage{
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


                themeGeneralSettings {
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
    const allData = [].concat(info.wpgraphql.brokers123.nodes,
        info.wpgraphql.brokerComparisons123.nodes,
        info.wpgraphql.posts.nodes,
        info.wpgraphql.comparisons123.nodes,
        info.wpgraphql.forexMarketNews123.nodes,
        info.wpgraphql.pages.nodes,
        info.wpgraphql.topBrokers123.nodes
    )
    // [...info.wpgraphql.brokers123.nodes,
    // ...info.wpgraphql.brokerComparisons123.nodes,
    // ...info.wpgraphql.posts.nodes,
    // ...info.wpgraphql.comparisons123.nodes,
    // ...info.wpgraphql.forexMarketNews123.nodes,
    // ...info.wpgraphql.pages.nodes,
    // ...info.wpgraphql.topBrokers123.nodes
    // ]

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(24)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage


    const brokerSorter = () => {
        if (Object.keys(search).length > 0) {
            const filteredData = allData.filter(eachData => {
                if (eachData.title.toLowerCase().includes(searchString)) {
                    return eachData
                }
            })
            const sortedData = filteredData.sort((a, b) => new Date(b.date.split('T')[0]) - new Date(a.date.split('T')[0]))
            console.log(sortedData)
            return sortedData
        }
        const filteredData = allData
        const sortedData = filteredData.sort((a, b) => new Date(b.date.split('T')[0]) - new Date(a.date.split('T')[0]))
        return sortedData
    }

    const currentResult = brokerSorter().slice(indexOfFirstPost, indexOfLastPost)
    console.log(currentResult)

    const ResultTableItem = (props) => {
        const { res } = props
        const class_for_arrow = 'cptBrokers' in res ? '' : 'not-broker'
        const platfomsList = [
            "MT5",
            "MT4",
            "WebTrader",
            "Mobile",
            "apps",
            "Proprietary",
            "cTrader",
        ]
        const accountsList = ["Micro", "Retail", "VIP", "Professional"]
        const spreadsList = ["Fixed", "Variable"]
        const methodsList = ["Bank transfer", "Credit Cards", "PayPal"]
        const themeGeneralSettings = info
        if ('cptBrokers' in res) {
            const platfThumbURL = res.cptBrokers.platformRelation ? res.cptBrokers.platformRelation.featuredImage.node.mediaItemUrl : null
            return (
                <div class="row collapse broker-wrap">
                    <div class="broker-tab-col img-col">
                        <div class="thumb-wrap" >
                            {res.featuredImage ? <img src={res.featuredImage.node.mediaItemUrl} sizes={res.featuredImage.node.sizes} srcSet={res.featuredImage.node.srcSet} /> : <img class="img-list-default" src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
                        </div>
                    </div>

                    <div class={`broker-tab-col broker-name ${class_for_arrow}`}>
                        {platfThumbURL ? <img src={platfThumbURL} /> : null}
                        <h3>{res.title}</h3>
                    </div>

                    <div className="broker-tab-col broker-content broker-col">
                        <div className="points-col broker-content-col text-center">
                            <div className="wrap">
                                <p className="val"> {Parser(res.cptBrokers.allSpreadsPoints ? res.cptBrokers.allSpreadsPoints : "")}
                                </p>
                                <p>Spreads:</p>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    See All Spreads
                                </a>
                            )}
                        </div>
                        <div className="min-dep-col broker-content-col text-center">
                            <div className="wrap">
                                <p className="val">
                                    {Parser(
                                        res.cptBrokers.minDeposit
                                            ? res.cptBrokers.minDeposit
                                            : ""
                                    )}
                                </p>
                                <p>Min. deposit</p>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    Learn More
                                </a>
                            )}
                        </div>
                        <div className="platf-col broker-content-col text-center">
                            <div className="wrap" data-mh="cont-col">
                                <ul>
                                    {platfomsList.map(platf => {
                                        if (res.cptBrokers.platformsList) {
                                            return res.cptBrokers.platformsList.includes(platf) ? <li className="checked">{platf}</li> : <li>{platf}</li>
                                        }
                                    })}
                                </ul>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    See Platforms
                                </a>
                            )}
                        </div>
                        <div className="acc-col broker-content-col text-center">
                            <div className="wrap" data-mh="cont-col">
                                <ul>
                                    {accountsList.map(account => {
                                        if (res.cptBrokers.accountsList) {
                                            return res.cptBrokers.accountsList.includes(
                                                account
                                            ) ? (
                                                    <li className="checked">{account}</li>
                                                ) : (
                                                    <li>{account}</li>
                                                )
                                        }
                                    })}
                                </ul>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    See Accounts
                                </a>
                            )}
                        </div>
                        <div className="spreads-col broker-content-col text-center">
                            <div className="wrap" data-mh="cont-col">
                                <ul>
                                    {spreadsList.map(spread => {
                                        if (res.cptBrokers.spreadsList) {
                                            return res.cptBrokers.spreadsList.includes(
                                                spread
                                            ) ? (
                                                    <li className="checked">{spread}</li>
                                                ) : (
                                                    <li>{spread}</li>
                                                )
                                        }
                                    })}
                                </ul>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    See Spreads
                                </a>
                            )}
                        </div>
                        <div className="methods-col broker-content-col text-center">
                            <div className="wrap" data-mh="cont-col">
                                <ul>
                                    {methodsList.map(method => {
                                        if (res.cptBrokers.methodsList) {
                                            return res.cptBrokers.methodsList.includes(
                                                method
                                            ) ? (
                                                    <li className="checked">{method}</li>
                                                ) : (
                                                    <li>{method}</li>
                                                )
                                        }
                                    })}
                                </ul>
                            </div>
                            {res.cptBrokers.affiliateLink && (
                                <a
                                    href={res.cptBrokers.affiliateLink}
                                    target="_blank"
                                    rel="nofollow sponsored"
                                >
                                    See Methods
                                </a>
                            )}
                        </div>
                        {res.cptBrokers.tableInfo && (
                            <div className="info-text-col text-center">
                                <p>{res.cptBrokers.tableInfo}</p>
                            </div>
                        )}
                    </div>

                    <div class="broker-tab-col btn-col">
                        <span className="aff-wrap">
                            <a className="btn small" href={res.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored" >
                                {themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText ? themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText : 'Take Me To Broker'}
                            </a>
                            {res.cptBrokers.takeMeToBrokerButtonNoteText && (<span className="floating-note"> {res.cptBrokers.takeMeToBrokerButtonNoteText} </span>)}
                        </span>
                        <span data-id={res.id} value={JSON.stringify(res)} className="btn small compare-btn">
                            {themeGeneralSettings.wpgraphql.themeGeneralSettings
                                .optGeneralSettings.compareBrokerSideBySideButtonAlternativeText
                                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                                    .optGeneralSettings
                                    .compareBrokerSideBySideButtonAlternativeText
                                : "Compare Brokers Side by Side"}
                        </span>
                        <Link className="btn small" to={res.uri}>
                            {themeGeneralSettings.wpgraphql.themeGeneralSettings
                                .optGeneralSettings.readFullReviewButtonAlternativeText
                                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                                    .optGeneralSettings.readFullReviewButtonAlternativeText
                                : "Read Full Review"}
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="row collapse broker-wrap">
                    <div class="broker-tab-col img-col">
                        <div class="thumb-wrap" >
                            {res.featuredImage ? <img src={res.featuredImage.node.mediaItemUrl} sizes={res.featuredImage.node.sizes} srcSet={res.featuredImage.node.srcSet} /> : <img class="img-list-default" src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
                        </div>
                    </div>

                    <div class='broker-tab-col broker-name not-broker'>
                        <h3>{res.title}</h3>
                    </div>

                    <div className="broker-tab-col broker-content broker-col not-broker"></div>

                    <div class="broker-tab-col btn-col">
                        <Link className="btn small" to={res.uri}>Read article</Link>
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
                    <h3 class="archive-title">Search results for: <strong>{search.s}</strong></h3>
                    <div class="row brokers-list">
                        <div class="small-12 columns">
                            {currentResult.map(res => (
                                <ResultTableItem res={res} />
                            ))}
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={brokerSorter().length} noNumbers={false} />
                </div>
            </div>

        </Layout>
    )
}
export default withLocation(SearchPage)