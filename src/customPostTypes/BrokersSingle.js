import React from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import CompareFrom from "../components/CompareFrom"
import { brokerRegions } from "../data/brokerRegions"
import { brokerTypes } from "../data/brokerTypes"
import Parser from "html-react-parser"
import { useEffect } from "react"
import { avarageRatingCounter } from "../functions/avarageRatingCounter"
import '../assets/js/plugins/jquery.sticky-kit.min.js'

const shortid = require("shortid")

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      broker123(id: $id) {
        title
        uri
        content
        date
        author {
          node {
            name
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
        cptBrokers {
          accountsList
          affiliateLink
          allFieldsChecker
          allSpreadsPoints
          banReason
          basicLibraryEduSup
          basicLibraryEduSupScore
          bonusFeatureForBinOpt
          bonusFeatureForCfd
          bonusFeatureForCommodities
          bonusFeatureForCrypto
          bonusFeatureForEtf
          bonusFeatureForForex
          bonusFeatureForSocTrad
          bonusFeatureForSpreadBet
          bonusFeatureForStocks
          brokerAddress
          brokerEmails {
            email
            emailLink
          }
          brokerHealth
          brokerInfoRelatedArticles {
            ... on WPGraphQL_Article123 {
              id
              title
              uri
            }
          }
          brokerLink
          brokerRegion
          brokerTelephones {
            telephone
            telephoneNumber
          }
          brokerType
          brokerWarningMessage
          cfdLossRate
          commissionsFeesChargesFeesCharges
          commissionsFeesChargesFeesChargesScore
          commissionsOnTrades
          compareTableTextBelowLogo
          con1ProsCons
          con1ProsConsScore
          con2ProsCons
          con2ProsConsScore
          con3ProsCons
          con3ProsConsScore
          countryBroker
          currencyPairsOffered
          customAuthorBroker {
            nicename
          }
          depProtectionForBinOpt
          depProtectionForCfd
          depProtectionForCommodities
          depProtectionForCrypto
          depProtectionForEtf
          depProtectionForForex
          depProtectionForSocTrad
          depProtectionForSpreadBet
          depProtectionForStocks
          dislikesList
          faqsQualityCustSup
          faqsQualityCustSupScore
          featureASpecFeat
          featureASpecFeatScore
          featureBSpecFeat
          fieldGroupName
          financialCommentaryResToolsScore
          fixedSpreads
          forexBreadthInvProd
          forexBreadthInvProdScore
          ftseSpreadForBinOpt
          ftseSpreadForCfd
          ftseSpreadForCommodities
          ftseSpreadForCrypto
          ftseSpreadForEtf
          ftseSpreadForForex
          ftseSpreadForSocTrad
          ftseSpreadForSpreadBet
          ftseSpreadForStocks
          generalAverageRating3Scale
          generalAverageRating3ScaleSummary
          generalEduSup
          generalEduSupScore
          generalFeesCharges
          generalFeesChargesScore
          headquartersLocation
          headquartersLocationOfficesBg
          headquartersLocationOfficesBgScore
          includeToMostPopularBrokersTable
          introTextCommFees
          introTextPlatfTools
          likesList
          liveChatWebTeleOfficesCustSup
          liveChatWebTeleOfficesCustSupScore
          maxLevelForBinOpt
          maxLevelForCfd
          maxLevelForCommodities
          maxLevelForCrypto
          maxLevelForEtf
          maxLevelForForex
          maxLevelForSocTrad
          maxLevelForSpreadBet
          maxLevelForStocks
          maximumLeverage
          methodsList
          minDeposit
          minDepositForBinOpt
          minDepositForCfd
          minDepositForCommodities
          minDepositForCrypto
          minDepositForEtf
          minDepositForForex
          minDepositForSocTrad
          minDepositForSpreadBet
          minDepositForStocks
          minimumDeposit
          mt4OrEquivalantPlatfExp
          mt4OrEquivalantPlatfExpScore
          multipleComplianceRegComp
          multipleComplianceRegCompScore
          nofollowAffiliateLink
          otherCommCryptoSpreadCfdInvProd
          otherCommCryptoSpreadCfdInvProdScore
          otherGuidanceResTools
          otherGuidanceResToolsScore
          ourScore
          platformRelation {
            ... on WPGraphQL_Platform123 {
              id
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          platformsForBinOpt
          platformsForCfd
          platformsForCommodities
          platformsForCrypto
          platformsForEtf
          platformsForForex
          platformsForSocTrad
          platformsForSpreadBet
          platformsForStocks
          platformsList
          predefinedRelatedBrokers {
            ... on WPGraphQL_Broker123 {
              id
              title
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              cptBrokers {
                allSpreadsPoints
                affiliateLink
                minDeposit
                platformsList
                accountsList
                spreadsList
                methodsList
                tabButtonAlternativeText
                takeMeToBrokerButtonNoteText
              }
              uri
            }
          }
          primaryRegulator
          primaryRegulatorRegCompScore
          pro1ProsCons
          pro1ProsConsScore
          pro2ProsCons
          pro2ProsConsScore
          pro3ProsCons
          pro3ProsConsScore
          proprietaryOptionsPlatfExp
          proprietaryOptionsPlatfExpScore
          publiclyTradedBg
          publiclyTradedEntityOrParent
          ratingCommFees
          ratingCustResearch
          ratingCustServ
          ratingEase
          ratingMobTrad
          ratingPlatfTools
          regulated
          regulatedOrUnregulatedRegCompScore
          responsivenessCustSup
          responsivenessCustSupScore
          reviewBodyCommFees
          reviewBodyCrypto
          reviewBodyCustServ
          reviewBodyEase
          reviewBodyFinThoughts
          reviewBodyLatBrokNews
          reviewBodyMetod
          reviewBodyMobTrad
          reviewBodyOther
          reviewBodyPlatfTools
          reviewBodyRelGuides
          reviewBodyResearch
          reviewIntroText
          safetyOfDepositsRegComp
          safetyOfDepositsRegCompScore
          sizeMeasureBg
          sizeMeasureBgScore
          specialAdvancedPlatfExp
          specialAdvancedPlatfExpScore
          specialOffer
          spreadsFeesCharges
          spreadsFeesChargesScore
          spreadsList
          stocksBreadthInvProd
          stocksBreadthInvProdScore
          summaryScoreBg
          summaryScoreCustSup
          summaryScoreEduSup
          summaryScoreFeesCharges
          summaryScoreInvProd
          summaryScorePlatfExp
          summaryScoreProsCons
          summaryScoreRegComp
          summaryScoreResTools
          tabButtonAlternativeText
          tableCommFees {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
          }
          tableInfo
          tableMobTrad {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tablePlatfTools {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tableResearch {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tableTitleCommFees
          tableTitleMobTrad
          tableTitlePlatfTools
          tableTitleResearch
          takeMeToBrokerButtonNoteText
          technicalAnlaysisResToolsScore
          textBelowVideo
          traderInformationForBinOpt
          traderInformationForCfd
          traderInformationForCommodities
          traderInformationForCrypto
          traderInformationForEtf
          traderInformationForForex
          traderInformationForSocTrad
          traderInformationForSpreadBet
          traderInformationForStocks
          tradingInstrumentType
          tradingType
          typicalLeverageForBinOpt
          typicalLeverageForCfd
          typicalLeverageForCommodities
          typicalLeverageForCrypto
          typicalLeverageForEtf
          typicalLeverageForForex
          typicalLeverageForSocTrad
          typicalLeverageForSpreadBet
          typicalLeverageForStocks
          useThisDataBinOpt
          useThisDataCfd
          useThisDataCommodities
          useThisDataCrypto
          useThisDataEtf
          useThisDataForex
          useThisDataSocTrad
          useThisDataSpreadBet
          useThisDataStocks
          videoBroker
          webinarssupportEduSup
          webinarssupportEduSupScore
          yearFounded
          yearFoundedBg
          yearFoundedBgScore
          yearList {
            year
            position
            overallRating
            opponents
          }
        }
      }
      themeGeneralSettings {
        optGeneralSettings {
          disqusBodyText
          brokerRelatedGuides {
            ... on WPGraphQL_Broker123 {
              id
              cptBrokers {
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
                affiliateLink
                allSpreadsPoints
                minDeposit
                platformsList
                accountsList
                spreadsList
                methodsList
                takeMeToBrokerButtonNoteText
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              title
              uri
            }
          }
        }
      }
    }
  }
`

export default function BrokersSingle({ data }) {
  const broker = data.wpgraphql.broker123
  const themeGeneralSettings = data.wpgraphql.themeGeneralSettings.optGeneralSettings

  useEffect(() => {
    $(document).ready(function () {
      // single broker tab
      $(".type-wrap .type-itm").click(function () {
        var currentHash = $(this).attr("data-id")
        $(this).siblings().removeClass("active")
        $(".tab-body .tab-body-itm").hide("fast")
        $(this).addClass("active")
        $("#tab-" + currentHash).show("fast")
      })
      $('.broker-tab-col').matchHeight()
      $('.tab-col').matchHeight()
      $('.cont-col').matchHeight()
      //smoth scroling
      var $root = $('html, body');

      $('a[href^="#"]').click(function () {
        $root.animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);

        return false;
      });

      //broker floating button descktop
      if ($(window).innerWidth() > 1024) {
        var wH = $(window).height() + 32,
          bH = $('.broker-floating-btn .btn').height() + 2,
          offset = (wH - bH) / 2 - 40;
        // console.log(wH, bH, offset);
        $('.rev-nav-col .broker-floating-btn').stick_in_parent({
          parent: '.review-cols',
          inner_scrolling: false,
          offset_top: offset,
        });
      }
      //broker floating button mobile
      if ($(window).innerWidth() < 641) {
        $('.broker-floating-btn').stick_in_parent({
          parent: '.single-broker-wrap',
          inner_scrolling: false,
          offset_top: 20,
        });
      }
    })
  })

  const ReviewBrokerTop = () => {
    return (
      <div class="row collapse rew-user-top">
        <div class="medium-6 columns rew-user-left">
          <div class="heading-wrap">
            <img
              src="https://www.wecomparebrokers.com/wp-content/uploads/2018/10/brok-rew-title.svg"
              alt="Title"
            />
            <h1 class="page_title">
              {broker.title}
              <strong>Broker Review</strong>
            </h1>
          </div>

          <div class="brok-meta">
            <span class="author">
              {broker.cptBrokers.customAuthorBroker
                ? "Review By: " + broker.cptBrokers.customAuthorBroker.nicename
                : "Review By: " + broker.author.node.name}
            </span>
            <span class="date">
              Review Updated: {broker.date.split("T")[0]}
            </span>
          </div>

          {broker.featuredImage && (
            <img
              className="broker-thumb-img"
              src={broker.featuredImage.node.mediaItemUrl}
            />
          )}
          {broker.brokerLink && (
            <Link
              to={broker.affiliateLink}
              target="_blank"
              rel="nofollow sponsored"
            >
              <span>{broker.brokerLink}</span>
            </Link>
          )}
          {broker.brokerAddress && (
            <div class="brok-add-info address-block">
              <p>
                <strong>Address: </strong>
                {broker.brokerAddress}
              </p>
            </div>
          )}

          {broker.cptBrokers.brokerTelephones && (
            <div class="brok-add-info tel-block">
              <p>
                <strong>Phone: </strong>
                {broker.cptBrokers.brokerTelephones.map(telItem => {
                  return telItem.telephoneNumber ? (
                    <a
                      key={shortid.generate()}
                      href={`tel:${telItem.telephoneNumber}`}
                    >
                      {telItem.telephone}
                    </a>
                  ) : (
                      <span key={shortid.generate()}>{telItem.telephone}</span>
                    )
                })}
              </p>
            </div>
          )}

          {broker.cptBrokers.brokerEmails && (
            <div class="brok-add-info mail-block">
              <p>
                <strong>Email: </strong>
                {broker.cptBrokers.brokerEmails.map(em => {
                  return em.telephoneNumber ? (
                    <a href={`mailto:${em.emailLink}`}>{em.email}</a>
                  ) : (
                      <span>{em.email}</span>
                    )
                })}
              </p>
            </div>
          )}

          {broker.cptBrokers.brokerType && (
            <>
              <div class="type-wrap">
                {broker.cptBrokers.brokerType.map((type, i) => {
                  return (
                    <span
                      key={shortid.generate()}
                      class={`type-itm ${i === 0 ? "active" : ""}`}
                      data-id={type}
                    >
                      {Object.keys(brokerTypes).find(
                        originalType => originalType === type
                      )}
                    </span>
                  )
                })}
              </div>
              <div class="tab-body">
                {broker.cptBrokers.brokerType.map((type, i) => {
                  return (
                    <div
                      key={shortid.generate()}
                      id={`tab-${type}`}
                      class={`tab-body-itm ${i === 0 ? "active" : ""}`}
                    >
                      <div class="row collapse fees-rat-wrap">
                        <div class="small-12 columns trade-info">
                          {type === "forex"
                            ? Parser(
                              broker.cptBrokers.traderInformationForForex
                                ? broker.cptBrokers.traderInformationForForex
                                : ""
                            )
                            : ""}
                          {type === "etf"
                            ? Parser(
                              broker.cptBrokers.traderInformationForEtf
                                ? broker.cptBrokers.traderInformationForEtf
                                : ""
                            )
                            : ""}
                          {type === "stocks"
                            ? Parser(
                              broker.cptBrokers.traderInformationForStocks
                                ? broker.cptBrokers.traderInformationForStocks
                                : ""
                            )
                            : ""}
                          {type === "cfd"
                            ? Parser(
                              broker.cptBrokers.traderInformationForCfd
                                ? broker.cptBrokers.traderInformationForCfd
                                : ""
                            )
                            : ""}
                          {type === "crypto"
                            ? Parser(
                              broker.cptBrokers.traderInformationForCrypto
                                ? broker.cptBrokers.traderInformationForCrypto
                                : ""
                            )
                            : ""}
                          {type === "soc_trad"
                            ? Parser(
                              broker.cptBrokers.traderInformationForSocTrad
                                ? broker.cptBrokers
                                  .traderInformationForSocTrad
                                : ""
                            )
                            : ""}
                          {type === "commodities"
                            ? Parser(
                              broker.cptBrokers
                                .traderInformationForCommodities
                                ? broker.cptBrokers
                                  .traderInformationForCommodities
                                : ""
                            )
                            : ""}
                          {type === "bin_opt"
                            ? Parser(
                              broker.cptBrokers.traderInformationForBinOpt
                                ? broker.cptBrokers.traderInformationForBinOpt
                                : ""
                            )
                            : ""}
                        </div>
                        <div class="small-6 columns fees-wrap">
                          <div class="fees-col">
                            <p>Spread</p>
                            <p class="fee-val">
                              {type === "forex"
                                ? broker.cptBrokers.ftseSpreadForForex
                                : ""}
                              {type === "etf"
                                ? broker.cptBrokers.ftseSpreadForEtf
                                : ""}
                              {type === "stocks"
                                ? broker.cptBrokers.ftseSpreadForStocks
                                : ""}
                              {type === "cfd"
                                ? broker.cptBrokers.ftseSpreadForCfd
                                : ""}
                              {type === "crypto"
                                ? broker.cptBrokers.ftseSpreadForCrypto
                                : ""}
                              {type === "soc_trad"
                                ? broker.cptBrokers.ftseSpreadForSocTrad
                                : ""}
                              {type === "commodities"
                                ? broker.cptBrokers.ftseSpreadForCommodities
                                : ""}
                              {type === "bin_opt"
                                ? broker.cptBrokers.ftseSpreadForBinOpt
                                : ""}
                            </p>
                            <p>Max. Leverage</p>
                            <p class="fee-val">
                              {type === "forex"
                                ? broker.cptBrokers.maxLevelForForex
                                : ""}
                              {type === "etf"
                                ? broker.cptBrokers.maxLevelForEtf
                                : ""}
                              {type === "stocks"
                                ? broker.cptBrokers.maxLevelForStocks
                                : ""}
                              {type === "cfd"
                                ? broker.cptBrokers.maxLevelForCfd
                                : ""}
                              {type === "crypto"
                                ? broker.cptBrokers.maxLevelForCrypto
                                : ""}
                              {type === "soc_trad"
                                ? broker.cptBrokers.maxLevelForSocTrad
                                : ""}
                              {type === "commodities"
                                ? broker.cptBrokers.maxLevelForCommodities
                                : ""}
                              {type === "bin_opt"
                                ? broker.cptBrokers.maxLevelForBinOpt
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div class="small-6 columns fees-wrap">
                          <div class="fees-col">
                            <p>Deposit Protection</p>
                            <p class="fee-val">
                              {type === "forex"
                                ? broker.cptBrokers.depProtectionForForex
                                : ""}
                              {type === "etf"
                                ? broker.cptBrokers.depProtectionForEtf
                                : ""}
                              {type === "stocks"
                                ? broker.cptBrokers.depProtectionForStocks
                                : ""}
                              {type === "cfd"
                                ? broker.cptBrokers.depProtectionForCfd
                                : ""}
                              {type === "crypto"
                                ? broker.cptBrokers.depProtectionForCrypto
                                : ""}
                              {type === "soc_trad"
                                ? broker.cptBrokers.depProtectionForSocTrad
                                : ""}
                              {type === "commodities"
                                ? broker.cptBrokers.depProtectionForCommodities
                                : ""}
                              {type === "bin_opt"
                                ? broker.cptBrokers.depProtectionForBinOpt
                                : ""}
                            </p>

                            <p>Min. Deposit</p>
                            <p class="fee-val">
                              {type === "forex"
                                ? broker.cptBrokers.minDepositForForex
                                : ""}
                              {type === "etf"
                                ? broker.cptBrokers.minDepositForEtf
                                : ""}
                              {type === "stocks"
                                ? broker.cptBrokers.minDepositForStocks
                                : ""}
                              {type === "cfd"
                                ? broker.cptBrokers.minDepositForCfd
                                : ""}
                              {type === "crypto"
                                ? broker.cptBrokers.minDepositForCrypto
                                : ""}
                              {type === "soc_trad"
                                ? broker.cptBrokers.minDepositForSocTrad
                                : ""}
                              {type === "commodities"
                                ? broker.cptBrokers.minDepositForCommodities
                                : ""}
                              {type === "bin_opt"
                                ? broker.cptBrokers.minDepositForBinOpt
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div class="brok-rat-wrap">
                <p>Our Overall Rating</p>
                <div class="rat-wrap">
                  <span class="rating">
                    <img
                      src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg"
                      alt="Rating"
                    />
                    <span
                      class="rat-color"
                      style={{
                        width: `${
                          avarageRatingCounter(broker.cptBrokers) * 20
                          }%`,
                      }}
                    ></span>
                  </span>
                  <span class="rat-val">
                    {avarageRatingCounter(broker.cptBrokers)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        {broker.cptBrokers.videoBroker && (
          <div class="medium-6 columns rew-user-right">
            {Parser(
              broker.cptBrokers.videoBroker ? broker.cptBrokers.videoBroker : ""
            )}

            <div class="btns-wrap">
              {broker.cptBrokers.affiliateLink && (
                <span class="aff-wrap">
                  <Link
                    class="btn"
                    to={broker.cptBrokers.affiliateLink}
                    target="_blank"
                    rel="nofollow sponsored"
                  >
                    Take me to broker
                  </Link>
                  {broker.cptBrokers.takeMeToBrokerButtonNoteText ? (
                    <span class="floating-note">
                      {broker.cptBrokers.takeMeToBrokerButtonNoteText}
                    </span>
                  ) : (
                      ""
                    )}
                </span>
              )}
              <span data-id={broker.id} class="btn compare-btn">
                Compare Brokers Side by Side
              </span>
            </div>
            {broker.cptBrokers.textBelowVideo ? (
              <div class="video-text-wrap text-left">
                {Parser(broker.cptBrokers.textBelowVideo)}
              </div>
            ) : (
                ""
              )}
          </div>
        )}
      </div>
    )
  }

  const LikeDislikesRow = () => {
    return (
      <div class="row likes-dislikes-row">
        {broker.cptBrokers.brokerHealth &&
          broker.cptBrokers.brokerHealth === "good" ? (
            <>
              <div class="medium-6 columns likes-col">
                <p>
                  <strong>Likes</strong>
                </p>
                {Parser(
                  broker.cptBrokers.likesList ? broker.cptBrokers.likesList : ""
                )}
              </div>
              <div class="medium-6 columns dislikes-col">
                <p>
                  <strong>Dislikes</strong>
                </p>
                {Parser(
                  broker.cptBrokers.dislikesList
                    ? broker.cptBrokers.dislikesList
                    : ""
                )}
              </div>
            </>
          ) : (
            <div class="small-12 columns">
              <p>
                <strong>Warning Reason</strong>
              </p>
              {Parser(
                broker.cptBrokers.banReason ? broker.cptBrokers.banReason : ""
              )}
            </div>
          )}
      </div>
    )
  }

  const ReviewNavigationColumn = () => {
    return (
      <div class="large-2 columns rev-nav-col">
        <h5>Review Sections:</h5>
        <ul class="review-nav">
          {broker.cptBrokers.ratingCommFees ||
            broker.cptBrokers.introTextCommFees ||
            broker.cptBrokers.tableCommFees ||
            broker.cptBrokers.reviewBodyCommFees ? (
              <li>
                <a href="#comm-fees">{Parser("Commissions &amp; Fees")}</a>
              </li>
            ) : null}
          {broker.cptBrokers.ratingPlatfTools ||
            broker.cptBrokers.introTextPlatfTools ||
            broker.cptBrokers.tablePlatfTools ||
            broker.cptBrokers.reviewBodyPlatfTools ? (
              <li>
                <a href="#platf-tools">{Parser("Platforms &amp; Tools")}</a>
              </li>
            ) : null}
          {broker.cptBrokers.ratingCustServ ||
            broker.cptBrokers.reviewBodyCustServ ? (
              <li>
                <a href="#cust-serv">Customer Service</a>
              </li>
            ) : null}
          {broker.cptBrokers.ratingCustResearch ||
            broker.cptBrokers.reviewBodyResearch ||
            broker.cptBrokers.tableResearch ? (
              <li>
                <a href="#research">Research</a>
              </li>
            ) : null}
          {broker.cptBrokers.ratingEase || broker.cptBrokers.reviewBodyEase ? (
            <li>
              <a href="#ease">Ease of Use</a>
            </li>
          ) : null}
          {broker.cptBrokers.ratingMobTrad ||
            broker.cptBrokers.reviewBodyMobTrad ||
            broker.cptBrokers.tableMobTrad ? (
              <li>
                <a href="#mob-trad">Mobile Trading</a>
              </li>
            ) : null}
          {broker.cptBrokers.reviewBodyMetod ? (
            <li>
              <a href="#metod">Robo Trading</a>
            </li>
          ) : null}
          {broker.cptBrokers.reviewBodyCrypto ? (
            <li>
              <a href="#crypt">Crypto Currency</a>
            </li>
          ) : null}
          {broker.cptBrokers.reviewBodyOther ? (
            <li>
              <a href="#other">Regulatory details</a>
            </li>
          ) : null}
          {broker.cptBrokers.reviewBodyFinThoughts ? (
            <li>
              <a href="#fin-thoughts">Final Thoughts</a>
            </li>
          ) : null}
          {broker.cptBrokers.reviewBodyLatBrokNews ? (
            <li>
              <a href="#lat-news">Latest Broker News</a>
            </li>
          ) : null}
          <li>
            <a href="#rel-guides">Related Guides</a>
          </li>
        </ul>
        <div class="broker-floating-btn hide-for-small">
          <Link
            class="btn blue"
            to={broker.cptBrokers.affiliateLink}
            target="_blank"
            rel="nofollow sponsored"
          >
            {broker.cptBrokers.tabButtonAlternativeText
              ? broker.cptBrokers.tabButtonAlternativeText
              : "Take Me To Broker"}
          </Link>
          {broker.cptBrokers.takeMeToBrokerButtonNoteText ? (
            <span class="floating-note">
              {broker.cptBrokers.takeMeToBrokerButtonNoteText}
            </span>
          ) : null}
        </div>
      </div>
    )
  }

  const ReviewBodyCol = () => {
    return (
      <div class="large-10 columns rev-body-col">
        <div class="rev-intro">
          {Parser(broker.cptBrokers.reviewIntroText ? broker.cptBrokers.reviewIntroText : '')}
        </div>
        {broker.cptBrokers.ratingCommFees || broker.cptBrokers.introTextCommFees || broker.cptBrokers.tableCommFees || broker.cptBrokers.reviewBodyCommFees ? (
          <div id="comm-fees" class="rev-part">
            <div class="title-wrap">
              <h4>{Parser('Commissions &amp; Fees')}</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${avarageRatingCounter(broker.cptBrokers) * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.introTextCommFees ? broker.cptBrokers.introTextCommFees : '')}
            {broker.cptBrokers.tableTitleCommFees ? <h6>{broker.cptBrokers.tableTitleCommFees}</h6> : ''}
            {broker.cptBrokers.tableCommFees ? (
              <div class="tab-wrap six-cols">
                <div class="tab-row tab-head hide-for-small">
                  <div class="tab-col col-val" ><p>Fees</p></div>
                  <div class="tab-col col-xtb" ><p>TD Ameritrade</p></div>
                  <div class="tab-col col-ava" ><p>E*TRADE</p></div>
                  <div class="tab-col col-city" ><p>Charles Schwab</p></div>
                  <div class="tab-col col-city" ><p>Fidelity</p></div>
                  <div class="tab-col col-city" ><p>Merrill Edge</p></div>
                </div>
                {broker.cptBrokers.tableCommFees && broker.cptBrokers.tableCommFees.map((row) => {
                  return (
                    <div class="tab-row">
                      <div class="tab-col col-val" ><p>{row.rowLabel}</p></div>
                      <div class="tab-col col-amer" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">TD Ameritrade:</strong>{row.tdAmeritradeValueText}</p> : ''}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.tdAmeritradeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : ''}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            {row.tdAmeritradeValueCheck ? (
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" />
                            ) : (
                                <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />
                              )}
                          </>
                        ) : ''}
                      </div>

                      <div class="tab-col col-etrade" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">E*TRADE:</strong>{row.etradeValueText}</p> : ''}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.etradeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            {row.etradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>

                      <div class="tab-col col-schwab" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Charles Schwab:</strong>{row.charlesSchwabValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.charlesSchwabValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            {row.charlesSchwabValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>

                      <div class="tab-col col-fidelity" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Fidelity:</strong>{row.fidelityValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.fidelityValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            {row.fidelityValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>

                      <div class="tab-col col-merrill" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Merrill Edge:</strong>{row.merrillEdgeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.merrillEdgeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            {row.merrillEdgeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            {Parser(broker.cptBrokers.reviewBodyCommFees ? broker.cptBrokers.reviewBodyCommFees : '')}
          </div>
        ) : null}

        {broker.cptBrokers.ratingPlatfTools || broker.cptBrokers.introTextPlatfTools || broker.cptBrokers.table_platf_tools || broker.cptBrokers.review_body_platf_tools ? (
          <div id="platf-tools" class="rev-part">
            <div class="title-wrap">
              <h4>{Parser('Platforms &amp; Tools')}</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingPlatfTools * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.introTextPlatfTools ? broker.cptBrokers.introTextPlatfTools : '')}
            {broker.cptBrokers.tableTitlePlatfTools ? <h6>{broker.cptBrokers.tableTitlePlatfTools}</h6> : ''}
            {broker.cptBrokers.tablePlatfTools ? (
              <div class="tab-wrap six-cols">
                <div class="tab-row tab-head hide-for-small">
                  <div class="tab-col col-val" ></div>
                  <div class="tab-col col-xtb" ><p>TD Ameritrade</p></div>
                  <div class="tab-col col-ava" ><p>E*TRADE</p></div>
                  <div class="tab-col col-city" ><p>Charles Schwab</p></div>
                  <div class="tab-col col-city" ><p>Fidelity</p></div>
                  <div class="tab-col col-city" ><p>Merrill Edge</p></div>
                </div>
                {broker.cptBrokers.tablePlatfTools.map((row) => {
                  return (
                    <div class="tab-row">
                      <div class="tab-col col-val" ><p>{row.rowLabel}</p></div>
                      <div class="tab-col col-amer" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">TD Ameritrade:</strong>{row.tdAmeritradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.td_ameritradeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            {row.td_ameritradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-etrade" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">E*TRADE:</strong>{row.etradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.etradeValueRat}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            {row.etradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-schwab" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Charles Schwab:</strong>{row.charlesSchwabValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.charlesSchwabValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            {row.charlesSchwabValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-fidelity" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Fidelity:</strong>{row.fidelityValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.fidelityValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            {row.fidelityValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-merrill" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Merrill Edge:</strong>{row.merrillEdgeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.merrillEdgeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            {row.merrillEdgeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            {Parser(broker.cptBrokers.reviewBodyPlatfTools ? broker.cptBrokers.reviewBodyPlatfTools : '')}
          </div>
        ) : null}
        {broker.cptBrokers.ratingCustServ || broker.cptBrokers.reviewBodyCustServ ? (
          <div id="cust-serv" class="rev-part">
            <div class="title-wrap">
              <h4>Customer Service</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingCustServ * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.reviewBodyCustServ ? broker.cptBrokers.reviewBodyCustServ : '')}
          </div>
        ) : null}
        {broker.cptBrokers.ratingCustResearch || broker.cptBrokers.reviewBodyResearch || broker.cptBrokers.tableResearch ? (
          <div id="research" class="rev-part">
            <div class="title-wrap">
              <h4>Research</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingCustResearch * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.reviewBodyResearch ? broker.cptBrokers.reviewBodyResearch : '')}
            {broker.cptBrokers.tableTitleResearch ? <h6>{broker.cptBrokers.tableTitleResearch}</h6> : ''}
            {broker.cptBrokers.tableResearch ? (
              <div class="tab-wrap six-cols">
                <div class="tab-row tab-head hide-for-small">
                  <div class="tab-col col-val" ></div>
                  <div class="tab-col col-xtb" ><p>TD Ameritrade</p></div>
                  <div class="tab-col col-ava" ><p>E*TRADE</p></div>
                  <div class="tab-col col-city" ><p>Charles Schwab</p></div>
                  <div class="tab-col col-city" ><p>Fidelity</p></div>
                  <div class="tab-col col-city" ><p>Merrill Edge</p></div>
                </div>
                {broker.cptBrokers.tableResearch.map((row) => {
                  return (
                    <div class="tab-row">
                      <div class="tab-col col-val" ><p>{row.rowLabel}</p></div>
                      <div class="tab-col col-amer" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">TD Ameritrade:</strong>{row.tdAmeritradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.td_ameritradeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            {row.td_ameritradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-etrade" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">E*TRADE:</strong>{row.etradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.etradeValueRat}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            {row.etradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-schwab" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Charles Schwab:</strong>{row.charlesSchwabValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.charlesSchwabValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            {row.charlesSchwabValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-fidelity" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Fidelity:</strong>{row.fidelityValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.fidelityValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            {row.fidelityValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-merrill" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Merrill Edge:</strong>{row.merrillEdgeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.merrillEdgeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            {row.merrillEdgeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : null}
        {broker.cptBrokers.ratingEase || broker.cptBrokers.reviewBodyEase ? (
          <div id="ease" class="rev-part">
            <div class="title-wrap">
              <h4>Ease of Use</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingEase * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.reviewBodyEase ? broker.cptBrokers.reviewBodyEase : '')}
          </div>
        ) : null}
        {broker.cptBrokers.ratingMobTrad || broker.cptBrokers.reviewBodyMobTrad || broker.cptBrokers.tableMobTrad ? (
          <div id="mob-trad" class="rev-part">
            <div class="title-wrap">
              <h4>Mobile Trading</h4>
              <div class="rat-wrap">
                <span class="rating">
                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                  <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingMobTrad * 20}%` }}></span>
                </span>
              </div>
            </div>
            {Parser(broker.cptBrokers.reviewBodyMobTrad ? broker.cptBrokers.reviewBodyMobTrad : '')}
            {broker.cptBrokers.tableTitleMobTrad ? <h6>{broker.cptBrokers.tableTitleMobTrad}</h6> : ''}
            {broker.cptBrokers.tableMobTrad ? (
              <div class="tab-wrap six-cols">
                <div class="tab-row tab-head hide-for-small">
                  <div class="tab-col col-val" ></div>
                  <div class="tab-col col-xtb" ><p>TD Ameritrade</p></div>
                  <div class="tab-col col-ava" ><p>E*TRADE</p></div>
                  <div class="tab-col col-city" ><p>Charles Schwab</p></div>
                  <div class="tab-col col-city" ><p>Fidelity</p></div>
                  <div class="tab-col col-city" ><p>Merrill Edge</p></div>
                </div>
                {broker.cptBrokers.tableMobTrad.map((row) => {
                  return (
                    <div class="tab-row">
                      <div class="tab-col col-val" ><p>{row.rowLabel}</p></div>
                      <div class="tab-col col-amer" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">TD Ameritrade:</strong>{row.tdAmeritradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.td_ameritradeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">TD Ameritrade:</strong></p>
                            {row.td_ameritradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-etrade" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">E*TRADE:</strong>{row.etradeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.etradeValueRat}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">E*TRADE:</strong></p>
                            {row.etradeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-schwab" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Charles Schwab:</strong>{row.charlesSchwabValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.charlesSchwabValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Charles Schwab:</strong></p>
                            {row.charlesSchwabValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-fidelity" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Fidelity:</strong>{row.fidelityValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.fidelityValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Fidelity:</strong></p>
                            {row.fidelityValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                      <div class="tab-col col-merrill" >
                        {row.valueType === 'Text' ? <p><strong class="show-for-small">Merrill Edge:</strong>{row.merrillEdgeValueText}</p> : null}
                        {row.valueType === 'Rating' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            <span class="rating">
                              <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey.svg" alt="Rating" />
                              <span class="rat-color" style={{ width: `${row.merrillEdgeValueRat * 20}%` }}></span>
                            </span>
                          </>
                        ) : null}
                        {row.valueType === 'Check' ? (
                          <>
                            <p><strong class="show-for-small">Merrill Edge:</strong></p>
                            {row.merrillEdgeValueCheck ? <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/check-green.svg" alt="Yes" /> : <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/cross-red.svg" alt="No" />}
                          </>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : null}
        {broker.cptBrokers.reviewBodyMetod ? (
          <div id="metod" class="rev-part">
            <div class="title-wrap">
              <h4>Robo Trading</h4>
            </div>
            {Parser(broker.cptBrokers.reviewBodyMetod ? broker.cptBrokers.reviewBodyMetod : '')}
          </div>
        ) : null}
        {broker.cptBrokers.reviewBodyCrypto ? (
          <div id="crypt" class="rev-part">
            <div class="title-wrap">
              <h4>Crypto Currency</h4>
            </div>
            {Parser(broker.cptBrokers.reviewBodyCrypto ? broker.cptBrokers.reviewBodyCrypto : '')}
          </div>
        ) : null}
        {broker.cptBrokers.reviewBodyOther ? (
          <div id="other" class="rev-part">
            <div class="title-wrap">
              <h4>Regulatory details</h4>
            </div>
            {Parser(broker.cptBrokers.reviewBodyOther ? broker.cptBrokers.reviewBodyOther : '')}
          </div>
        ) : null}
        {broker.cptBrokers.reviewBodyFinThoughts ? (
          <div id="fin-thoughts" class="rev-part">
            <div class="title-wrap">
              <h4>Final Thoughts</h4>
            </div>
            {Parser(broker.cptBrokers.reviewBodyFinThoughts ? broker.cptBrokers.reviewBodyFinThoughts : '')}
          </div>
        ) : null}
        {broker.content ? (
          <div id="faq" class="rev-part">
            <div class="title-wrap">
              <h4>FAQ</h4>
            </div>
            {Parser(broker.content ? broker.content : '')}
          </div>
        ) : null}
        {broker.cptBrokers.reviewBodyLatBrokNews ? (
          <div id="lat-news" class="rev-part">
            <div class="title-wrap">
              <h4>Latest Broker News</h4>
            </div>
            {Parser(broker.cptBrokers.reviewBodyLatBrokNews ? broker.cptBrokers.reviewBodyLatBrokNews : '')}
          </div>
        ) : null}
        <RelativeGuides />
        <Link to={'/compare-forex-brokers'} class="btn">GO TO THE compare brokers</Link>
      </div>
    )
  }

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

  const RelativeGuides = () => {
    return (
      <div id="rel-guides" class="rev-part">
        <div class="title-wrap">
          <h4>Related Guides</h4>
        </div>
        {broker.cptBrokers.predefinedRelatedBrokers ? (
          <div class="row collapse brokers-list">
            <div class="small-12 columns">
              {broker.cptBrokers.predefinedRelatedBrokers.map((brok) => {
                return (
                  <div class="row collapse broker-wrap">
                    <div class="broker-tab-col img-col">
                      <div class="thumb-wrap" >
                        {brok.featuredImage.node ? <img class="img-list-default" src={brok.featuredImage.node.mediaItemUrl} alt="WCB Logo" /> : <img class="img-list-default" src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
                      </div>
                    </div>

                    <div class="broker-tab-col broker-name">
                      <h3>{brok.title}</h3>
                    </div>

                    <div class="broker-tab-col broker-content">
                      <div class="points-col broker-content-col text-center">
                        <div class="wrap">
                          <p class="val">{Parser(brok.cptBrokers.allSpreadsPoints ? brok.cptBrokers.allSpreadsPoints : '')}</p>
                          <p>Spreads:</p>
                        </div>
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See All Spreads</Link> : ''}
                      </div>
                      <div class="min-dep-col broker-content-col text-center">
                        <div class="wrap">
                          <p class="val">{Parser(brok.cptBrokers.minDeposit ? brok.cptBrokers.minDeposit : '')}</p>
                          <p>Min. deposit</p>
                        </div>
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Learn More</Link> : ''}
                      </div>
                      <div class="platf-col broker-content-col text-center">
                        <div class="wrap cont-col" >
                          <ul>
                            {platfomsList.map(platf => {
                              if (brok.cptBrokers.platformsList) {
                                return brok.cptBrokers.platformsList.includes(
                                  platf
                                ) ? (
                                    <li className="checked">{platf}</li>
                                  ) : (
                                    <li>{platf}</li>
                                  )
                              }
                            })}
                          </ul>
                        </div>
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Platforms</Link> : ''}
                      </div>
                      <div class="acc-col broker-content-col text-center">
                        <div class="wrap cont-col" >
                          <ul>
                            {accountsList.map(account => {
                              if (brok.cptBrokers.accountsList) {
                                return brok.cptBrokers.accountsList.includes(
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
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Accounts</Link> : ''}
                      </div>
                      <div class="spreads-col broker-content-col text-center">
                        <div class="wrap cont-col" >
                          <ul>
                            {spreadsList.map(spread => {
                              if (brok.cptBrokers.spreadsList) {
                                return brok.cptBrokers.spreadsList.includes(
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
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Spreads</Link> : ''}
                      </div>
                      <div class="methods-col broker-content-col text-center">
                        <div class="wrap cont-col" >
                          <ul>
                            {methodsList.map(method => {
                              if (brok.cptBrokers.methodsList) {
                                return brok.cptBrokers.methodsList.includes(
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
                        {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Methods</Link> : ''}
                      </div>
                    </div>

                    <div class="broker-tab-col btn-col">
                      {brok.cptBrokers.affiliateLink ? (
                        <span class="aff-wrap">
                          <a class="btn small" href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Take Me To Broker</a>
                          {brok.cptBrokers.takeMeToBrokerButtonNoteText ? <span class="floating-note">{brok.cptBrokers.takeMeToBrokerButtonNoteText}</span> : ''}
                        </span>
                      ) : null}
                      <span data-id={brok.id} class="btn small compare-btn">Compare Brokers Side by Side</span>
                      <Link class="btn small" to={brok.uri}>Read Full Review</Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
            <div class="row collapse brokers-list">
              <div class="small-12 columns">
                {themeGeneralSettings.brokerRelatedGuides.map((brok) => {
                  return (
                    <div class="row collapse broker-wrap">
                      <div class="broker-tab-col img-col">
                        <div class="thumb-wrap" >
                          {brok.featuredImage.node ? <img class="img-list-default" src={brok.featuredImage.node.mediaItemUrl} alt="WCB Logo" /> : <img class="img-list-default" src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
                        </div>
                      </div>

                      <div class="broker-tab-col broker-name">
                        <h3>{brok.title}</h3>
                      </div>

                      <div class="broker-tab-col broker-content">
                        <div class="points-col broker-content-col text-center">
                          <div class="wrap">
                            <p class="val">{Parser(brok.cptBrokers.allSpreadsPoints ? brok.cptBrokers.allSpreadsPoints : '')}</p>
                            <p>Spreads:</p>
                          </div>
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See All Spreads</Link> : ''}
                        </div>
                        <div class="min-dep-col broker-content-col text-center">
                          <div class="wrap">
                            <p class="val">{Parser(brok.cptBrokers.minDeposit ? brok.cptBrokers.minDeposit : '')}</p>
                            <p>Min. deposit</p>
                          </div>
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Learn More</Link> : ''}
                        </div>
                        <div class="platf-col broker-content-col text-center">
                          <div class="wrap cont-col" >
                            <ul>
                              {platfomsList.map(platf => {
                                if (brok.cptBrokers.platformsList) {
                                  return brok.cptBrokers.platformsList.includes(
                                    platf
                                  ) ? (
                                      <li className="checked">{platf}</li>
                                    ) : (
                                      <li>{platf}</li>
                                    )
                                }
                              })}
                            </ul>
                          </div>
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Platforms</Link> : ''}
                        </div>
                        <div class="acc-col broker-content-col text-center">
                          <div class="wrap cont-col" >
                            <ul>
                              {accountsList.map(account => {
                                if (brok.cptBrokers.accountsList) {
                                  return brok.cptBrokers.accountsList.includes(
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
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Accounts</Link> : ''}
                        </div>
                        <div class="spreads-col broker-content-col text-center">
                          <div class="wrap cont-col" >
                            <ul>
                              {spreadsList.map(spread => {
                                if (brok.cptBrokers.spreadsList) {
                                  return brok.cptBrokers.spreadsList.includes(
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
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Spreads</Link> : ''}
                        </div>
                        <div class="methods-col broker-content-col text-center">
                          <div class="wrap cont-col" >
                            <ul>
                              {methodsList.map(method => {
                                if (brok.cptBrokers.methodsList) {
                                  return brok.cptBrokers.methodsList.includes(
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
                          {brok.cptBrokers.affiliateLink ? <Link to={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">See Methods</Link> : ''}
                        </div>
                      </div>

                      <div class="broker-tab-col btn-col">
                        {brok.cptBrokers.affiliateLink ? (
                          <span class="aff-wrap">
                            <a class="btn small" href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">Take Me To Broker</a>
                            {brok.cptBrokers.takeMeToBrokerButtonNoteText ? <span class="floating-note">{brok.cptBrokers.takeMeToBrokerButtonNoteText}</span> : ''}
                          </span>
                        ) : null}
                        <span data-id={brok.id} class="btn small compare-btn">Compare Brokers Side by Side</span>
                        <Link class="btn small" to={brok.uri}>Read Full Review</Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          )}
      </div>
    )
  }

  const ReviewCols = () => {
    if (
      broker.cptBrokers.brokerHealth === "good" ||
      (broker.cptBrokers.brokerHealth === "banned" &&
        broker.cptBrokers.allFieldsChecker)
    ) {
      return (
        <div class="row collapse review-cols">
          <ReviewNavigationColumn />
          <ReviewBodyCol />
        </div>
      )
    } else return null
  }

  const pageInfo = {
    isFrontPage: broker.isFrontPage,
    contentType: broker.contentType,
    title: broker.title,
  }
  return (
    <Layout pageInfo={pageInfo}>
      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={broker.seo.title}
        meta={[
          { name: "description", content: broker.seo.metaDesc },
          { property: "og:type", content: broker.seo.opengraphType },
        ]}
      />
      <CompareFrom />
      <div class="single-broker-wrap">
        <div class="broker-floating-btn show-for-small-only">
          <Link
            class="btn blue"
            to={
              broker.cptBrokers.affiliateLink
                ? broker.cptBrokers.affiliateLink
                : ""
            }
            target="_blank"
            rel="nofollow sponsored"
          >
            {broker.cptBrokers.tabButtonAlternativeText
              ? broker.cptBrokers.tabButtonAlternativeText
              : "Take Me To Broker"}
          </Link>
          {broker.cptBrokers.takeMeToBrokerButtonNoteText && (
            <span class="floating-note">
              {broker.cptBrokers.takeMeToBrokerButtonNoteText}
            </span>
          )}
        </div>
        <div class="row">
          <div class="small-12 columns">
            <div class="crumbs">
              <Link to={"/"}>Home page</Link> -&gt;
              <Link to={"/find-a-broker"}>Broker finder</Link> -&gt;
              <span>{broker.title}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="small-12 columns">
            <div class="brok-rew-wrap">
              <ReviewBrokerTop />
              <LikeDislikesRow />
              <ReviewCols />
            </div>

            {broker.cptBrokers.brokerInfoRelatedArticles ? (
              <div class="brok-rew-wrap overal-rat-wrap related-articles-block">
                <div class="row collapse">
                  <div class="small-12 columns related-articles-wrap">
                    <h4>Related articles:</h4>
                    <ul>
                      {broker.cptBrokers.brokerInfoRelatedArticles.map((article) => {
                        return <li><Link to={article.uri}>{article.uri}</Link></li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {broker.cptBrokers.brokerHealth === 'good' || broker.cptBrokers.brokerHealth === 'banned' && broker.cptBrokers.allFieldsChecker ? (
              <div class="brok-rew-wrap overal-rat-wrap">
                <div class="row collapse">
                  <div class="large-4 medium-6 columns overal-left">
                    <div class="title-wrap">
                      <h4>Ratings</h4>
                      <span class="rating">
                        <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                        <span class="rat-color" style={{ width: `${avarageRatingCounter(broker.cptBrokers) * 20}%` }}></span>
                      </span>
                    </div>
                    <ul>
                      {broker.cptBrokers.ratingCommFees !== 0 ? (
                        <li>
                          {Parser('Commissions &amp; Fees')}
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingCommFees * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                      {broker.cptBrokers.ratingPlatfTools !== 0 ? (
                        <li>
                          {Parser('Platforms & Tools')}
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingPlatfTools * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                      {broker.cptBrokers.ratingCustServ !== 0 ? (
                        <li>
                          Customer Service
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingCustServ * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                      {broker.cptBrokers.ratingCustResearch !== 0 ? (
                        <li>
                          Research
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingCustResearch * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                      {broker.cptBrokers.ratingEase !== 0 ? (
                        <li>
                          Ease of Use
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingEase * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                      {broker.cptBrokers.ratingMobTrad !== 0 ? (
                        <li>
                          Mobile Trading
                          <span class="rating">
                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${broker.cptBrokers.ratingMobTrad * 20}%` }}></span>
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  <div class="large-8 medium-6 columns overal-right">
                    {broker.cptBrokers.yearList ? (
                      <div class="rat-hist-list">
                        {broker.cptBrokers.yearList.map((year) => {
                          return (
                            <div class="year-row latest">
                              <div class="hist-col col-year"><p>{year.year}</p></div>
                              <div class="hist-col col-pos"><p><span>{year.position}</span> of {year.opponents}</p></div>
                              <div class="hist-col col-type"><p>Overall</p></div>
                              <div class="hist-col col-rat">
                                <span class="rating">
                                  <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask-grey-light.svg" alt="Rating" />
                                  <span class="rat-color" style={{ width: `${year.overallRating * 20}%` }}></span>
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <div class="brok-rew-wrap disqus-wrap">
              <div class="row collapse">
                <div class="small-12 columns">
                  {Parser(themeGeneralSettings.disqusBodyText ? themeGeneralSettings.disqusBodyText : '')}
                  {/* <?php comments_template(); ?> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
