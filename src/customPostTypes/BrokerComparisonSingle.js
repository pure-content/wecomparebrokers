import React, { useEffect, useRef } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import "easy-pie-chart/dist/jquery.easypiechart"
import { scoreAnimation } from "../functions/scoreAnimation"
import CompareFrom from "../components/CompareFrom"
import { avarageRatingCounter } from "../functions/avarageRatingCounter"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"

export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            brokerComparison123(id: $id) {
                title
                uri
                
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

                cptBrokersComparison {
                    firstBroker {
                        ... on WPGraphQL_Broker123 {
                            id
                            title
                            uri
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    srcSet(size: BROKERS_REW_THUMB_NEW)
                                    sizes(size: BROKERS_REW_THUMB_NEW)
                                }
                            }
                            cptBrokers {
                                ourScore
                                likesList
                                ratingCommFees
                                ratingPlatfTools
                                ratingCustServ
                                ratingCustResearch
                                ratingEase
                                ratingMobTrad
                                brokerWarningMessage
                                affiliateLink
                                tabButtonAlternativeText
                            }
                        }
                    }
                    secondBroker {
                        ... on WPGraphQL_Broker123 {
                            id
                            title
                            uri
                            featuredImage {
                              node {
                                mediaItemUrl
                                srcSet(size: BROKERS_REW_THUMB_NEW)
                                sizes(size: BROKERS_REW_THUMB_NEW)
                              }
                            }
                            cptBrokers {
                              ourScore
                              likesList
                              ratingCommFees
                              ratingPlatfTools
                              ratingCustServ
                              ratingCustResearch
                              ratingEase
                              ratingMobTrad
                              brokerWarningMessage
                              affiliateLink
                              tabButtonAlternativeText
                            }
                        }
                    }
                }
            }
            
            page(id: "cG9zdDoxMjI=") {
                content
                uri

                allPagesFields {
                    pageIcon {
                        mediaItemUrl
                    }
                }

                tmplComparisonPage {
                    bottomText
                    predefinedBrokersListSingle {
                        ... on WPGraphQL_Broker123 {
                            id
                            title
                            uri

                            featuredImage {
                                node {
                                mediaItemUrl
                                }
                            }

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
                            
                        }
                    }
                }
            }

            brokers123( first: 10000 where: { health: "good", orderby: { field: MENU_ORDER, order: ASC } }) {
                nodes {
                    title
                    uri
                    id
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
        }
    }
`

export default function BrokerComparisonSingle({ data }) {

    const { brokerComparison123, page } = data.wpgraphql
    const seo = brokerComparison123.seo
    const firstBrokerRef = useRef(null)
    const secondBrokerRef = useRef(null)

    useEffect(() => {
        if ($(".small-chart").length) {
            $(".small-chart").easyPieChart({
                size: 84,
                barColor: "#2A79FF",
                trackColor: "#F6F7F8",
                scaleColor: false,
                lineWidth: 5,
                onStep: function (from, to, percent) {
                    $(this.el).find(".percent").text(Math.round(percent))
                },
            })
        }
        if ($(".big-chart").length) {
            $(".big-chart").easyPieChart({
                barColor: "#2A79FF",
                trackColor: "#F6F7F8",
                scaleColor: false,
                lineWidth: 8,
                onStep: function (from, to, percent) {
                    $(this.el).find(".percent").text(Math.round(percent))
                },
            })
        }

        $(".compare-btn").click(function () {
            var brokId = $(this).attr("value")
            $("#first-user").val(brokId)
            $("#compare-form-wrap").fadeIn("fast")
        })
        $("#popup-sec-usr").select2({
            placeholder: "Second Broker",
            allowClear: true,
        })
        $(firstBrokerRef.current).select2({
            placeholder: "First Broker",
            allowClear: true,
        })
        $("#first-usr").select2({
            placeholder: "First Broker",
            allowClear: true,
        })
        $(firstBrokerRef.current).trigger("change")
        $(secondBrokerRef.current).trigger("change")
        $(secondBrokerRef.current).select2({
            placeholder: "Second Broker",
            allowClear: true,
        })

        $("#sec-usr").select2({
            placeholder: "Second Broker",
            allowClear: true,
        })
        $(".brok-info-wrap").each(function () {
            var list = $(this).find(".list-cont"),
                listItems = list.find("li").slice(0, 4)
            $(this).find(".advant-list").append(listItems)
        })

        $(".top-content-col").matchHeight()
        $(".broker-col").matchHeight()
        $(".tabs-brok-card-wrap").matchHeight()
        $('.top-cols').matchHeight()
        $('.tabs-card').matchHeight()

    })

    const TopContent = () => {
        return (
            <div class="row top-content">
                <div class="large-5 medium-6 columns top-content-col">
                    <div class="crumbs">
                        <Link to={'/'}>Home page</Link> -&gt;
                        <Link to={page.uri}>Broker Comparison</Link> -&gt;
                        <span>
                            {brokerComparison123.title}
                        </span>
                    </div>
                    <article>
                        <h3 class="page_title">
                            {page.allPagesFields.pageIcon ? <img src={page.allPagesFields.pageIcon.mediaItemUrl} alt="Title" /> : null}
                            {brokerComparison123.title}
                            <strong> Comparison</strong>
                        </h3>
                        <div class="dot-sep">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        {Parser(page.content ? page.content : '')}
                    </article>
                </div>
                <div class="medium-6 columns text-center top-content-col" >
                    <div class="compare-filter-wrap">
                        <h4>
                            <img
                                src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/filter-ico.svg"
                                alt="Filter"
                            />
                        Choose Brokers to Compare
                    </h4>
                        <form action={page.uri} method="get">
                            <select id="first-usr" ref={firstBrokerRef} name="first-usr">
                                <option></option>
                                {data.wpgraphql.brokers123.nodes.map(broker => {
                                    return (
                                        <option
                                            id={`1${broker.id}`}
                                            value={JSON.stringify(broker)}
                                        >
                                            {broker.title}
                                        </option>
                                    )
                                })}
                            </select>
                            <select id="sec-usr" ref={secondBrokerRef} name="sec-usr">
                                <option></option>
                                {data.wpgraphql.brokers123.nodes.map(broker => {
                                    return (
                                        <option
                                            id={`2${broker.id}`}
                                            value={JSON.stringify(broker)}
                                        >
                                            {broker.title}
                                        </option>
                                    )
                                })}
                            </select>
                            <button class="btn blue" type="submit">Compare</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const FirstCompareColumn = () => {
        const firstBroker = brokerComparison123.cptBrokersComparison.firstBroker
        return (
            <div class="medium-6 columns">
                <div class="tabs-brok-card-wrap tabs-card">
                    <div class="top-wrap">
                        <div class="top-left top-cols">
                            {<img class='wp-post-image' onLoad={() => $('.top-cols').matchHeight()} src={firstBroker.featuredImage.node.mediaItemUrl} srcSet={firstBroker.featuredImage.node.srcSet} sizes={firstBroker.featuredImage.node.sizes} />}
                        </div>
                        <div class="top-right top-cols text-center">
                            {scoreAnimation(firstBroker.cptBrokers.ourScore, 'big-chart', true)}
                        </div>
                    </div>
                    <div class="brok-info-wrap">
                        <p>What we like:</p>
                        <ul class="advant-list"></ul>
                        <div class="list-cont">
                            {Parser(firstBroker.cptBrokers.likesList ? firstBroker.cptBrokers.likesList : '')}
                        </div>
                    </div>
                    <div class="rat-wrap">
                        <span class="rating">
                            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${avarageRatingCounter(firstBroker.cptBrokers) * 20}%` }}></span>
                        </span>
                        {avarageRatingCounter(firstBroker.cptBrokers)}
                    </div>
                    <div class="btn-wrap">
                        {firstBroker.cptBrokers.affiliateLink && firstBroker.cptBrokers.tabButtonAlternativeText ? <a class="btn small blue" href={firstBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{firstBroker.cptBrokers.tabButtonAlternativeText}</a> : <a class="btn small blue" href={firstBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Go to Broker</a>}
                        <Link to={firstBroker.uri} class="btn small blue">Read Full Review</Link>
                    </div>
                </div>
                {firstBroker.cptBrokers.brokerWarningMessage ? <p class="warning_message">{firstBroker.cptBrokers.brokerWarningMessage}</p> : null}
            </div>
        )
    }

    const SecondCompareColumn = () => {
        const firstBroker = brokerComparison123.cptBrokersComparison.secondBroker
        return (
            <div class="medium-6 columns">
                <div class="tabs-brok-card-wrap tabs-card">
                    <div class="top-wrap">
                        <div class="top-left top-cols">
                            {<img class='wp-post-image' onLoad={() => $('.top-cols').matchHeight()} src={firstBroker.featuredImage.node.mediaItemUrl} srcSet={firstBroker.featuredImage.node.srcSet} sizes={firstBroker.featuredImage.node.sizes} />}
                        </div>
                        <div class="top-right top-cols text-center">
                            {scoreAnimation(firstBroker.cptBrokers.ourScore, 'big-chart', true)}
                        </div>
                    </div>
                    <div class="brok-info-wrap">
                        <p>What we like:</p>
                        <ul class="advant-list"></ul>
                        <div class="list-cont">
                            {Parser(firstBroker.cptBrokers.likesList ? firstBroker.cptBrokers.likesList : '')}
                        </div>
                    </div>
                    <div class="rat-wrap">
                        <span class="rating">
                            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${avarageRatingCounter(firstBroker.cptBrokers) * 20}%` }}></span>
                        </span>
                        {avarageRatingCounter(firstBroker.cptBrokers)}
                    </div>
                    <div class="btn-wrap">
                        {firstBroker.cptBrokers.affiliateLink && firstBroker.cptBrokers.tabButtonAlternativeText ? <a class="btn small blue" href={firstBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{firstBroker.cptBrokers.tabButtonAlternativeText}</a> : <a class="btn small blue" href={firstBroker.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Go to Broker</a>}
                        <Link to={firstBroker.uri} class="btn small blue">Read Full Review</Link>
                    </div>
                </div>
                {firstBroker.cptBrokers.brokerWarningMessage ? <p class="warning_message">{firstBroker.cptBrokers.brokerWarningMessage}</p> : null}
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
            <CompareFrom />

            <div class="top-content-compare">
                <TopContent />
            </div>
            <div class="row compare-cols">
                <FirstCompareColumn />
                <SecondCompareColumn />
            </div>
            <div class="row brokers-list">
                <div class="small-12 columns">
                    {page.tmplComparisonPage.predefinedBrokersListSingle.map(brok => (
                        <BrokerTableSingleItemNewView brokerInfo={brok} />

                    ))}
                </div>
            </div>

        </Layout>
    )
}
