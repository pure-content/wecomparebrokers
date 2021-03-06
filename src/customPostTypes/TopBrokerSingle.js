import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import "easy-pie-chart/dist/jquery.easypiechart"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import { scoreAnimation } from "../functions/scoreAnimation"
import BrokerTableSingleItemNewView from "../components/BrokerTableSingleItemNewView"
import CallBackFormPopUp from "../components/CallBackFormPopUp"
import CompareFrom from "../components/CompareFrom"

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      topBroker123(id: $id) {
        title
        uri
        content
        featuredImage {
          node {
            mediaItemUrl
            sizes(size: FLAG_TOP_BROK)
            srcSet(size: FLAG_TOP_BROK)
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

        cptPpcPages {
          pageCurrency
          imageOrientation
          bottomTextBody
          additionalText
          bottomTextImage {
            mediaItemUrl
          }
          brokersList {
            buttonLink
            buttonText
            broker {
              ... on WPGraphQL_Broker123 {
                id
                title
                uri
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

                featuredImage {
                  node {
                    mediaItemUrl
                    sizes(size: BROKERS_REW_THUMB_NEW)
                    srcSet(size: BROKERS_REW_THUMB_NEW)
                  }
                }
              }
            }
          }
          optionalBrokersList {
            buttonLinkOpt
            buttonTextOpt
            brokerOpt {
              ... on WPGraphQL_Broker123 {
                id
                title
                uri
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

                featuredImage {
                  node {
                    mediaItemUrl
                    sizes(size: BROKERS_REW_THUMB_NEW)
                    srcSet(size: BROKERS_REW_THUMB_NEW)
                  }
                }
              }
            }
          }
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

export default function TopBrokerSingle({ data }) {
  const { topBroker123, acfOptionsGeneralSettings } = data.wpgraphql
  const seo = topBroker123.seo

  useEffect(() => {
    $(document).ready(function () {
      String.prototype.replaceAll = function (stringFind, stringReplace) {
        var ex = new RegExp(
          stringFind.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
          "g"
        )
        return this.replace(ex, stringReplace)
      }
      $(".broker-wrap").each(function () {
        var str = $(this).html(),
          minDep = $(this).find(".min-dep-col .val").html()
        if (minDep) {
          var currChar = minDep.charAt(0),
            newStr = str.replaceAll(currChar, "<?php echo $curr; ?>")
          $(this).html(newStr)
        }
      })
      // $(".broker-col").matchHeight()
      // $('.broker-tab-col').matchHeight()
    })
  })

  const BrokTableItem = ({ brok }) => {
    const b_txt = brok.buttonText || brok.buttonTextOpt
    const b_link = brok.buttonLink || brok.buttonLinkOpt
    const brokInfo = brok.broker || brok.brokerOpt
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
    return (
      <div class="row collapse broker-wrap">
        {brokInfo.cptBrokers.specialOffer ? (
          <img
            class="spec-offer-ico"
            src={
              acfOptionsGeneralSettings.optGeneralSettings.specialOfferIcon
                .mediaItemUrl
            }
            alt="Special Offer"
          />
        ) : null}
        <div class="broker-tab-col img-col">
          <div class="thumb-wrap">
            {brokInfo.featuredImage ? (
              <img
                src={brokInfo.featuredImage.node.mediaItemUrl}
                sizes={brokInfo.featuredImage.node.sizes}
                srcSet={brokInfo.featuredImage.node.srcSet}
              />
            ) : (
              <img
                class="img-list-default"
                src="https://meek-hint.flywheelsites.com/wp-content/uploads/images/generic-logo.png"
                alt="WCB Logo"
              />
            )}
          </div>
          <Link class="btn top-brok-link" to={brokInfo.uri}>
            Read Full Review
          </Link>
        </div>

        <div class="broker-tab-col broker-name">
          <h3>{brokInfo.title}</h3>
          {scoreAnimation(brokInfo.cptBrokers.ourScore, "small-chart", true)}
        </div>

        <div class="broker-tab-col broker-content">
          <div class="points-col broker-content-col text-center">
            <div class="wrap">
              <p class="val">{Parser(brokInfo.cptBrokers.allSpreadsPoints)}</p>
              <p>Spreads:</p>
            </div>
            {b_link ? (
              <a href={b_link} target="_blank">
                See All Spreads
              </a>
            ) : null}
          </div>
          <div class="min-dep-col broker-content-col text-center">
            <div class="wrap">
              <p class="val">{Parser(brokInfo.cptBrokers.minDeposit)}</p>
              <p>Min. deposit</p>
            </div>
            {b_link ? (
              <a href={b_link} target="_blank">
                Learn More
              </a>
            ) : null}
          </div>
          <div class="platf-col broker-content-col text-center">
            <div class="wrap" data-mh="cont-col">
              <ul>
                {platfomsList.map(platf => {
                  if (brokInfo.cptBrokers.platformsList) {
                    return brokInfo.cptBrokers.platformsList.includes(platf) ? (
                      <li className="checked">{platf}</li>
                    ) : (
                      <li>{platf}</li>
                    )
                  }
                })}
              </ul>
            </div>
            {b_link ? (
              <a href={b_link} target="_blank">
                See Platforms
              </a>
            ) : null}
          </div>
          <div class="acc-col broker-content-col text-center">
            <div class="wrap" data-mh="cont-col">
              <ul>
                {accountsList.map(account => {
                  if (brokInfo.cptBrokers.accountsList) {
                    return brokInfo.cptBrokers.accountsList.includes(
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
            {b_link ? (
              <a href={b_link} target="_blank">
                See Accounts
              </a>
            ) : null}
          </div>
          <div class="spreads-col broker-content-col text-center">
            <div class="wrap" data-mh="cont-col">
              <ul>
                {spreadsList.map(spread => {
                  if (brokInfo.cptBrokers.spreadsList) {
                    return brokInfo.cptBrokers.spreadsList.includes(spread) ? (
                      <li className="checked">{spread}</li>
                    ) : (
                      <li>{spread}</li>
                    )
                  }
                })}
              </ul>
            </div>
            {b_link ? (
              <a href={b_link} target="_blank">
                See Spreads
              </a>
            ) : null}
          </div>
          <div class="methods-col broker-content-col text-center">
            <div class="wrap" data-mh="cont-col">
              <ul>
                {methodsList.map(method => {
                  if (brokInfo.cptBrokers.methodsList) {
                    return brokInfo.cptBrokers.methodsList.includes(method) ? (
                      <li className="checked">{method}</li>
                    ) : (
                      <li>{method}</li>
                    )
                  }
                })}
              </ul>
            </div>
            {b_link ? (
              <a href={b_link} target="_blank">
                See Methods
              </a>
            ) : null}
          </div>
        </div>

        <div class="broker-tab-col btn-col">
          {b_link ? (
            <a class="btn blue" href={b_link} target="_blank">
              {b_txt}
            </a>
          ) : null}
        </div>
      </div>
    )
  }

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
            headline: topBroker123.title,
            url: `https://www.wecomparebrokers.com${topBroker123.uri}`,
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
                  "@id": `https://www.wecomparebrokers.com${topBroker123.uri}`,
                  name: topBroker123.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <CompareFrom />

      <CallBackFormPopUp />
      <div class="top-brokers-wrap">
        <div class="row top-brokers-intro">
          {topBroker123.featuredImage ? (
            <div class="large-2 medium-4 columns top-brokers-flag">
              <img
                src={topBroker123.featuredImage.node.mediaItemUrl}
                sizes={topBroker123.featuredImage.node.sizes}
                srcSet={topBroker123.featuredImage.node.srcSet}
              />
            </div>
          ) : null}
          <div class="large-10 medium-8 columns top-brokers-intro-text">
            <article>
              <h1>{topBroker123.title}</h1>
              {Parser(topBroker123.content ? topBroker123.content : "")}
            </article>
          </div>
        </div>

        {topBroker123.cptPpcPages.brokersList ? (
          <div class="row brokers-list">
            <div class="small-12 columns">
              {topBroker123.cptPpcPages.brokersList.map(brok => (
                <BrokerTableSingleItemNewView brokerInfo={brok.broker} />
              ))}
            </div>
          </div>
        ) : null}

        {topBroker123.cptPpcPages.additionalText ? (
          <div class="row top-brokers-outro">
            <div class="small-12 columns">
              {Parser(topBroker123.cptPpcPages.additionalText)}
            </div>
          </div>
        ) : null}

        {topBroker123.cptPpcPages.optionalBrokersList ? (
          <div class="row brokers-list">
            <div class="small-12 columns">
              {topBroker123.cptPpcPages.optionalBrokersList.map(brok => (
                <BrokerTableSingleItemNewView brokerInfo={brok.brokerOpt} />
              ))}
            </div>
          </div>
        ) : null}

        {topBroker123.cptPpcPages.bottomTextImage ||
        topBroker123.cptPpcPages.bottomTextBody ? (
          <div class="row top-brokers-outro">
            {topBroker123.cptPpcPages.bottomTextImage ? (
              <div
                class={`large-5 medium-12 columns outro-img ${topBroker123.cptPpcPages.imageOrientation}`}
              >
                <img
                  src={topBroker123.cptPpcPages.bottomTextImage.mediaItemUrl}
                  alt="Image"
                />
              </div>
            ) : null}
            {topBroker123.cptPpcPages.bottomTextBody &&
            topBroker123.cptPpcPages.bottomTextImage ? (
              <div class="large-7 medium-12 outro-text columns">
                {Parser(topBroker123.cptPpcPages.bottomTextBody)}
              </div>
            ) : (
              <div class="small-12 outro-text columns">
                {Parser(topBroker123.cptPpcPages.bottomTextBody)}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  )
}
