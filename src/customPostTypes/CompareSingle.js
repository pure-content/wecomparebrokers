import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import { avarageRatingCounter } from '../functions/avarageRatingCounter'
const shortid = require("shortid")

export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            comparison123(id: $id) {
                title
                content
                id
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

                cptReview {
                    previewText
                    comparisonPageUrl
                    firstBrokerReview {
                        ... on WPGraphQL_Broker123 {
                            id
                            uri
                            title
                            content
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    sizes(size: BROKER_COMP_TAB)
                                    srcSet(size: BROKER_COMP_TAB)
                                }
                            }
                            cptBrokers {
                                affiliateLink
                                tabButtonAlternativeText
                                ratingCommFees
                                ratingPlatfTools
                                ratingCustServ
                                ratingCustResearch
                                ratingEase
                                ratingMobTrad
                                brokerWarningMessage
                                nofollowAffiliateLink
                                yearFounded
                                headquartersLocation
                                publiclyTradedEntityOrParent
                                regulated
                                primaryRegulator
                                minimumDeposit
                                fixedSpreads
                                tradingType
                                commissionsOnTrades
                                cfdLossRate
                                maximumLeverage
                                currencyPairsOffered
                                generalAverageRating3Scale
                                liveChatWebTeleOfficesCustSup
                                liveChatWebTeleOfficesCustSupScore
                                responsivenessCustSup
                                responsivenessCustSupScore
                                faqsQualityCustSup
                                faqsQualityCustSupScore
                                summaryScoreCustSup
                                pro1ProsCons
                                pro1ProsConsScore
                                pro2ProsCons
                                pro2ProsConsScore
                                pro3ProsCons
                                pro3ProsConsScore
                                con1ProsCons
                                con1ProsConsScore
                                con2ProsCons
                                con2ProsConsScore
                                con3ProsCons
                                con3ProsConsScore
                                summaryScoreProsCons
                            }
                        }
                    }

                    secondBroker {
                        ... on WPGraphQL_Broker123 {
                            id
                            uri
                            title
                            content
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    sizes(size: BROKER_COMP_TAB)
                                    srcSet(size: BROKER_COMP_TAB)
                                }
                            }
                            cptBrokers {
                                affiliateLink
                                tabButtonAlternativeText
                                ratingCommFees
                                ratingPlatfTools
                                ratingCustServ
                                ratingCustResearch
                                ratingEase
                                ratingMobTrad
                                brokerWarningMessage
                                nofollowAffiliateLink
                                yearFounded
                                headquartersLocation
                                publiclyTradedEntityOrParent
                                regulated
                                primaryRegulator
                                minimumDeposit
                                fixedSpreads
                                tradingType
                                commissionsOnTrades
                                cfdLossRate
                                maximumLeverage
                                currencyPairsOffered
                                generalAverageRating3Scale
                                liveChatWebTeleOfficesCustSup
                                liveChatWebTeleOfficesCustSupScore
                                responsivenessCustSup
                                responsivenessCustSupScore
                                faqsQualityCustSup
                                faqsQualityCustSupScore
                                summaryScoreCustSup
                                pro1ProsCons
                                pro1ProsConsScore
                                pro2ProsCons
                                pro2ProsConsScore
                                pro3ProsCons
                                pro3ProsConsScore
                                con1ProsCons
                                con1ProsConsScore
                                con2ProsCons
                                con2ProsConsScore
                                con3ProsCons
                                con3ProsConsScore
                                summaryScoreProsCons
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function CompareSingle({ data }) {
    const page = data.wpgraphql.comparison123
    const seo = page.seo
    const { firstBrokerReview, secondBroker } = page.cptReview

    useEffect(() => {
        $('.comp-rev-tab .tab-heading p').click(function () {
            $(this).parent().parent().parent().toggleClass('tab-collapsed');
        });
        $('.logo-wrap').matchHeight()
        $('.tab-col').matchHeight()
    })

    const TopContent = () => {
        return (
            <div class="row top-content">
                <div class="small-12 columns">
                    <div class="crumbs">
                        <Link to={'/'}>Home page</Link> -&gt;
                        <Link to={'/compare'}>Comparison</Link> -&gt;
                        <span>{page.title}</span>
                    </div>
                    <article>
                        <h1 class="page_title">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/compare-title-img.svg" alt="Title" />
                            {page.title}
                        </h1>
                        <div class="dot-sep">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </article>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title={seo.title}
                meta={[
                    { name: "description", content: seo.metaDesc },
                    { property: "og:type", content: seo.opengraphType },
                ]}
            />
            <div class="review-comparison-wrap">
                <TopContent />
                {page.cptReview.previewText ? (
                    <div class="row authors-row">
                        <div class="small-12 columns authors-text">
                            {Parser(page.cptReview.previewText ? page.cptReview.previewText : '')}
                        </div>
                    </div>
                ) : null}
            </div>
            <div class="row choosen-traders-wrap">
                <div class="medium-4 small-6 columns text-center broker-col">
                    <div class="logo-wrap">
                        <img onLoad={() => $('.logo-wrap').matchHeight()} src={firstBrokerReview.featuredImage.node.mediaItemUrl} sizes={firstBrokerReview.featuredImage.node.sizes} srcSet={firstBrokerReview.featuredImage.node.srcSet} />
                    </div>
                    <div class="rat-wrap">
                        <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${avarageRatingCounter(firstBrokerReview.cptBrokers) * 20}%` }}></span>
                        </span>
                    </div>
                    <a class="btn" href={firstBrokerReview.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{firstBrokerReview.cptBrokers.tabButtonAlternativeText ? Parser(firstBrokerReview.cptBrokers.tabButtonAlternativeText ? firstBrokerReview.cptBrokers.tabButtonAlternativeText : '') : 'Take Me To Broker'}</a>
                    <Link class="btn" to={firstBrokerReview.uri}>Read Full Review</Link>
                    {firstBrokerReview.cptBrokers.brokerWarningMessage ? <p class="warning_message">{firstBrokerReview.cptBrokers.brokerWarningMessage}</p> : null}
                </div>
                <div class="medium-4 small-6 columns text-center broker-col">
                    <div class="logo-wrap">
                        <img onLoad={() => $('.logo-wrap').matchHeight()} src={secondBroker.featuredImage.node.mediaItemUrl} sizes={secondBroker.featuredImage.node.sizes} srcSet={secondBroker.featuredImage.node.srcSet} />
                    </div>
                    <div class="rat-wrap">
                        <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${avarageRatingCounter(secondBroker.cptBrokers) * 20}%` }}></span>
                        </span>
                    </div>
                    <a class="btn" href={secondBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{secondBroker.cptBrokers.tabButtonAlternativeText ? Parser(secondBroker.cptBrokers.tabButtonAlternativeText ? secondBroker.cptBrokers.tabButtonAlternativeText : '') : 'Take Me To Broker'}</a>
                    <Link class="btn" to={secondBroker.uri}>Read Full Review</Link>
                    {secondBroker.cptBrokers.brokerWarningMessage ? <p class="warning_message">{secondBroker.cptBrokers.brokerWarningMessage}</p> : null}
                </div>
            </div>

            <div class="comp-rev-tab tab-wrap fees-tab-wrap">
                <div class="row tab-heading">
                    <div class="small-12 columns"><p><i class="fa fa-angle-up" aria-hidden="true"></i>Basic Information</p></div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Year Founded</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.yearFounded}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.yearFounded}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Headquarters Location</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.headquartersLocation}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.headquartersLocation}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Publicly Traded (Entity or Parent)</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.publiclyTradedEntityOrParent}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.publiclyTradedEntityOrParent}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Regulated?</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.regulated}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.regulated}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Primary Regulator</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.primaryRegulator}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.primaryRegulator}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Minimum Deposit</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.minimumDeposit}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.minimumDeposit}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Fixed Spreads?</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.fixedSpreads}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.fixedSpreads}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Trading Type</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.tradingType}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.tradingType}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Commissions on Trades</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.commissionsOnTrades}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.commissionsOnTrades}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>CFD Loss Rate</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.cfdLossRate}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.cfdLossRate}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Maximum Leverage</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.maximumLeverage}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.maximumLeverage}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Currency Pairs Offered</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p>{firstBrokerReview.cptBrokers.currencyPairsOffered}</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p>{secondBroker.cptBrokers.currencyPairsOffered}</p>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>General Average Rating - 3 scale</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p><strong>{firstBrokerReview.cptBrokers.generalAverageRating3Scale}</strong></p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p><strong>{secondBroker.cptBrokers.generalAverageRating3Scale}</strong></p>
                    </div>
                </div>
            </div>

            <div class="comp-rev-tab tab-wrap fees-tab-wrap">
                <div class="row tab-heading">
                    <div class="medium-4 columns"><p><i class="fa fa-angle-up" aria-hidden="true"></i>Customer Support</p></div>
                    <div class="medium-4 columns hide-for-small-only">
                        <div class="row">
                            <div class="medium-6 columns text-center"><p>Value</p></div>
                            <div class="medium-6 columns text-center"><p>Score</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns hide-for-small-only">
                        <div class="row">
                            <div class="medium-6 columns text-center"><p>Value</p></div>
                            <div class="medium-6 columns text-center"><p>Score</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Live Chat, Web, Tele, Offices</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.liveChatWebTeleOfficesCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.liveChatWebTeleOfficesCustSupScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.liveChatWebTeleOfficesCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.liveChatWebTeleOfficesCustSupScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Responsiveness</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.responsivenessCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.responsivenessCustSupScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.responsivenessCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.responsivenessCustSupScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>FAQs? Quality?</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.faqsQualityCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.faqsQualityCustSupScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.faqsQualityCustSup}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.faqsQualityCustSupScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Summary Score</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p><strong>{firstBrokerReview.cptBrokers.summaryScoreCustSup}</strong></p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p><strong>{secondBroker.cptBrokers.summaryScoreCustSup}</strong></p>
                    </div>
                </div>
            </div>

            <div class="comp-rev-tab tab-wrap fees-tab-wrap">
                <div class="row tab-heading">
                    <div class="medium-4 columns"><p><i class="fa fa-angle-up" aria-hidden="true"></i>{Parser('General Pros & Cons')}</p></div>
                    <div class="medium-4 columns hide-for-small-only">
                        <div class="row">
                            <div class="medium-6 columns text-center"><p>Value</p></div>
                            <div class="medium-6 columns text-center"><p>Score</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns hide-for-small-only">
                        <div class="row">
                            <div class="medium-6 columns text-center"><p>Value</p></div>
                            <div class="medium-6 columns text-center"><p>Score</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Pro #1</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.pro1ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.pro1ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.pro1ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.pro1ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Pro #2</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.pro2ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.pro2ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.pro2ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.pro2ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Pro #3</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.pro3ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.pro3ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.pro3ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.pro3ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Con #1</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.con1ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.con1ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.con1ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.con1ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Con #2</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.con2ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.con2ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.con2ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.con2ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Con #3</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>First broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{firstBrokerReview.cptBrokers.con3ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{firstBrokerReview.cptBrokers.con3ProsConsScore}</p></div>
                        </div>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <div class="row">
                            <div class="small-12 columns show-for-small-only">
                                <span>Second broker: </span>
                            </div>
                            <div class="medium-6 columns text-center"><p>{secondBroker.cptBrokers.con3ProsCons}</p></div>
                            <div class="medium-6 columns text-center"><p class="val-score">{secondBroker.cptBrokers.con3ProsConsScore}</p></div>
                        </div>
                    </div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">
                        <p>Summary Score</p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <p><strong>{firstBrokerReview.cptBrokers.summaryScoreProsCons}</strong></p>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <p><strong>{secondBroker.cptBrokers.summaryScoreProsCons}</strong></p>
                    </div>
                </div>
            </div>

            <div class="comp-rev-tab tab-wrap tab-btns">
                <div class="row tab-heading">
                    <div class="small-12 columns"><p><i class="fa fa-angle-up" aria-hidden="true"></i>Broker links</p></div>
                </div>
                <div class="row tab-row">
                    <div class="medium-4 columns tab-col">

                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">First broker: </span>
                        <a class="btn" href={firstBrokerReview.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{firstBrokerReview.cptBrokers.tabButtonAlternativeText ? firstBrokerReview.cptBrokers.tabButtonAlternativeText : 'Take Me To Broker'}</a>
                        <Link class="btn" to={firstBrokerReview.uri}>Read Full Review</Link>
                    </div>
                    <div class="medium-4 columns text-center tab-col">
                        <span class="show-for-small-only">Second broker: </span>
                        <a class="btn" href={secondBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{secondBroker.cptBrokers.tabButtonAlternativeText ? secondBroker.cptBrokers.tabButtonAlternativeText : 'Take Me To Broker'}</a>
                        <Link class="btn" to={secondBroker.uri}>Read Full Review</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
