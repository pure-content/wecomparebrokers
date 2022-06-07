import React, { useState, useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Slider from "react-slick"
import Parser from "html-react-parser"
import Equalizer from "../components/Equalizer"
import Helmet from "react-helmet"
import { avarageRatingCounter } from "../functions/avarageRatingCounter"
const shortid = require("shortid")

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
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
        newHomePage {
          homeBannerColor
          newBannerText
          trustSubsectionText
          bottomTextDropdown
          etfBrokerInfoBox
          forexBrokerInfoBox
          stockBrokerInfoBox
          headingSocProof
          listSocProof {
            text
          }
          iconsListDropdown {
            title
            icon {
              mediaItemUrl
            }
          }
          trustSubsectionLogos {
            trustSubsectionLogo {
              mediaItemUrl
            }
          }
          leftDropdownName
          leftDropdown {
            ... on WPGraphQL_Broker123 {
              id
              uri
              title
            }
          }
          rightDropdownName
          rightDropdown {
            ... on WPGraphQL_Broker123 {
              id
              uri
              title
            }
          }
          bodyTextDropdowns
          stockBrokerAward {
            ... on WPGraphQL_Broker123 {
              id
              title
              cptBrokers {
                ratingCommFees
                ratingPlatfTools
                ratingCustServ
                ratingCustResearch
                ratingEase
                ratingMobTrad
                traderInformationForStocks
                affiliateLink
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
              uri
            }
          }
          forexBrokerAward {
            ... on WPGraphQL_Broker123 {
              id
              title
              cptBrokers {
                ratingCommFees
                ratingPlatfTools
                ratingCustServ
                ratingCustResearch
                ratingEase
                ratingMobTrad
                traderInformationForForex
                affiliateLink
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
              uri
            }
          }
          etfBrokerAward {
            ... on WPGraphQL_Broker123 {
              id
              title
              cptBrokers {
                ratingCommFees
                ratingPlatfTools
                ratingCustServ
                ratingCustResearch
                ratingEase
                ratingMobTrad
                traderInformationForEtf
                affiliateLink
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
              uri
            }
          }

          topThreeStockHeading
          topThreeStockButtonText
          topThreeStockButtonLink {
            ... on WPGraphQL_Page {
              uri
            }
          }
          topThreeStockBrokers {
            broker {
              ... on WPGraphQL_Broker123 {
                uri
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                cptBrokers {
                  minDeposit
                  platformsList
                  typicalLeverageForStocks
                  bonusFeatureForStocks
                  affiliateLink
                }
              }
            }
          }

          topThreeForexHeading
          topThreeForexButtonText
          topThreeForexButtonLink {
            ... on WPGraphQL_Page {
              uri
            }
          }
          topThreeForexBrokers {
            broker {
              ... on WPGraphQL_Broker123 {
                uri
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                cptBrokers {
                  minDeposit
                  platformsList
                  typicalLeverageForForex
                  bonusFeatureForForex
                  affiliateLink
                }
              }
            }
          }

          topThreeCryptoHeading
          topThreeCryptoButtonText
          topThreeCryptoButtonLink {
            ... on WPGraphQL_Page {
              uri
            }
          }
          topThreeCryptoBrokers {
            broker {
              ... on WPGraphQL_Broker123 {
                uri
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                cptBrokers {
                  minDeposit
                  platformsList
                  typicalLeverageForCrypto
                  bonusFeatureForCrypto
                  affiliateLink
                }
              }
            }
          }
        }
      }

      acfOptionsGeneralSettings {
        optGeneralSettings {
          topAddSection {
            typeOfAdd
            topAdLink
            topAdImage {
              mediaItemUrl
            }
            topAdTag
            topAdScript
          }
          leftAdBanners {
            bannerType
            bannerTag
            bannerScript
            bannerLink
            bannerImage {
              mediaItemUrl
            }
          }
          rightAdBanner {
            bannerType
            bannerTag
            bannerScript
            bannerLink
            bannerImage {
              mediaItemUrl
            }
          }
          topAdFirstBannerSectionForMobile {
            bannerType
            bannerTag
            bannerScript
            bannerLink
            bannerImage {
              mediaItemUrl
            }
          }

          topAdSecondBannerSectionForMobile {
            bannerTag
            bannerScript
            bannerLink
            bannerType
            bannerImage {
              mediaItemUrl
            }
          }

          bottomAdFirstBannerSectionForMobile {
            bannerType
            bannerTag
            bannerScript
            bannerLink
            bannerImage {
              mediaItemUrl
            }
          }

          bottomAdSecondBannerSectionForMobile {
            bannerType
            bannerTag
            bannerScript
            bannerLink
            bannerImage {
              mediaItemUrl
            }
          }
        }
      }

      acfOptionsRedirectsSettings {
        opt_redirects_settings {
          redirects {
            oldUrl
            newUrl
          }
        }
      }

      acfOptionsHeader {
        optHeader {
          newHomepageLogo {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`

export default function NewHomePage({ data }) {
  const page = data.wpgraphql.page
  const seo = page.seo
  const templateFields = page.newHomePage
  const generalSettings =
    data.wpgraphql.acfOptionsGeneralSettings.optGeneralSettings

  useEffect(() => {
    $(function () {
      $(".left_banner_dropdown, .right_banner_dropdown").on(
        "click",
        function () {
          $(this).find(".banner_body").slideToggle("fast")
          $(this).toggleClass("open")
        }
      )
      $(".slide-wrap").matchHeight()
      $(".tabs-brok-card-wrap .top-cols").matchHeight()
    })
  })

  const AwardCol = () => {
    let brokAmount = 0
    let wrp_cls = ""
    let col_cls = ""
    if (Object.keys(templateFields.stockBrokerAward).length > 0) brokAmount++
    if (Object.keys(templateFields.forexBrokerAward).length > 0) brokAmount++
    if (Object.keys(templateFields.etfBrokerAward).length > 0) brokAmount++
    switch (brokAmount) {
      case 1:
        wrp_cls = "large-4 medium-6"
        col_cls = "small-12"
        break
      case 2:
        wrp_cls = "medium-8"
        col_cls = "medium-6"
        break
      case 3:
        wrp_cls = "large-10 medium-12"
        col_cls = "medium-4"
        break
      default:
        wrp_cls = "large-4 medium-6"
        col_cls = "small-12"
    }

    const brokerSubComponent = brokerInfo => {
      //Gathering all the info
      let awdclassName = ""
      let traderInfo = ""
      let bestBrokText = ""
      let brokerAvarage = ""

      if ("traderInformationForStocks" in brokerInfo.cptBrokers) {
        awdclassName = "stock-awd"
        traderInfo = templateFields.stockBrokerInfoBox
        bestBrokText = "Best Forex Broker"
        brokerAvarage = avarageRatingCounter(
          templateFields.stockBrokerAward.cptBrokers
        )
      }
      if ("traderInformationForForex" in brokerInfo.cptBrokers) {
        awdclassName = "forex-awd"
        traderInfo = templateFields.forexBrokerInfoBox
        bestBrokText = "Best Global Broker"
        brokerAvarage = avarageRatingCounter(
          templateFields.forexBrokerAward.cptBrokers
        )
      }
      if ("traderInformationForEtf" in brokerInfo.cptBrokers) {
        awdclassName = "etf-awd"
        traderInfo = templateFields.etfBrokerInfoBox
        bestBrokText = "Best Mobile App"
        brokerAvarage = avarageRatingCounter(
          templateFields.etfBrokerAward.cptBrokers
        )
      }
      const ratingColorWidth = brokerAvarage * 20 + "%"

      //Assembling whole subcomponent
      if (Object.keys(brokerInfo).length > 0) {
        return (
          <div className={`${col_cls} columns ${awdclassName} awd-col`}>
            <div className="tabs-brok-card-wrap">
              <div className="award-head">
                <h5>{bestBrokText}</h5>
                <p>trader award</p>
              </div>
              <div className="top-wrap">
                <div className="top-left top-cols" data-mh="top-cols">
                  <h6>{brokerInfo.title}</h6>
                  <p>Trader Rating</p>
                  <div className="rat-wrap">
                    <span className="rating">
                      <img
                        className="lazy"
                        data-src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg"
                        alt="Rating"
                        src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg"
                      />
                      <span
                        className="rat-color"
                        style={{ width: ratingColorWidth }}
                      ></span>
                    </span>
                    {brokerAvarage}
                  </div>
                </div>
                <div
                  className="top-right top-cols text-center"
                  data-mh="top-cols"
                >
                  <img src={brokerInfo.featuredImage.node.sourceUrl} alt="" />
                </div>
              </div>
              <div className="brok-info-wrap">{Parser(traderInfo)}</div>
              <div className="btn-wrap">
                <a
                  href={brokerInfo.cptBrokers.affiliateLink}
                  className="btn blue small"
                  target="_blank"
                  rel="nofollow sponsored"
                >
                  Visit Broker
                </a>
                <Link to={brokerInfo.uri} className="btn small">
                  Broker Review
                </Link>
              </div>
            </div>
          </div>
        )
      } else {
        return null
      }
    }

    //Assembling awardCol
    if (
      Object.keys(templateFields.stockBrokerAward).length > 0 ||
      Object.keys(templateFields.forexBrokerAward).length > 0 ||
      Object.keys(templateFields.etfBrokerAward).length > 0
    ) {
      if (brokAmount > 0) {
        return (
          <div className={`${wrp_cls} columns small-centered`}>
            <div className="row">
              {brokerSubComponent(templateFields.stockBrokerAward)}
              {brokerSubComponent(templateFields.forexBrokerAward)}
              {brokerSubComponent(templateFields.etfBrokerAward)}
            </div>
          </div>
        )
      }
    } else {
      return ""
    }
  }

  const [leftDropdownOpen, setLeftDropdownOpen] = useState({
    isVisible: false,
    className: "",
    style: {
      maxHeight: "0",
      opacity: "0",
      visibility: "hidden",
    },
  })
  const [rightDropdownOpen, setRightDropdownOpen] = useState({
    isVisible: false,
    className: "",
    style: {
      maxHeight: "0",
      opacity: "0",
      visibility: "hidden",
    },
  })

  const NewBannerDropdown = () => {
    if (
      templateFields.leftDropdown.length > 0 ||
      templateFields.rightDropdown.length > 0
    ) {
      const bannerDropdownHandler = side => {
        side === "left"
          ? setLeftDropdownOpen({
              isVisible: !leftDropdownOpen.isVisible,
              className: leftDropdownOpen.className === "" ? "open" : "",
              style: {
                maxHeight:
                  leftDropdownOpen.style.maxHeight === "0" ? "inherit" : "0",
                opacity: leftDropdownOpen.style.opacity === "0" ? "1" : "0",
                visibility:
                  leftDropdownOpen.style.visibility === "hidden"
                    ? "visible"
                    : "hidden",
              },
            })
          : setRightDropdownOpen({
              isVisible: !rightDropdownOpen.isVisible,
              className: rightDropdownOpen.className === "" ? "open" : "",
              style: {
                maxHeight:
                  rightDropdownOpen.style.maxHeight === "0" ? "inherit" : "0",
                opacity: rightDropdownOpen.style.opacity === "0" ? "1" : "0",
                visibility:
                  rightDropdownOpen.style.visibility === "hidden"
                    ? "visible"
                    : "hidden",
              },
            })
      }

      return (
        <div className="new_banner_dropdown">
          <div className={`left_banner_dropdown ${leftDropdownOpen.className}`}>
            <span className="banner_heading">
              {Parser(templateFields.leftDropdownName)}
            </span>

            <div style={{ display: "none" }} className="banner_body">
              {templateFields.leftDropdown.map(ddbrok => {
                return (
                  <Link key={ddbrok.id} to={ddbrok.uri}>
                    {Parser(ddbrok.title)}
                  </Link>
                )
              })}
            </div>

            <svg
              className="new_banner_dropdown_arrow"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.11221 12.9992L0.150538 1.10964L15.7375 0.891128L8.11221 12.9992Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div
            className={`right_banner_dropdown ${rightDropdownOpen.className}`}
          >
            <span className="banner_heading">
              {Parser(templateFields.rightDropdownName)}
            </span>
            <div style={{ display: "none" }} className="banner_body">
              {templateFields.rightDropdown.map(ddbrok => {
                return (
                  <Link key={ddbrok.id} to={ddbrok.uri}>
                    {Parser(ddbrok.title)}
                  </Link>
                )
              })}
            </div>
            <svg
              className="new_banner_dropdown_arrow"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.11221 12.9992L0.150538 1.10964L15.7375 0.891128L8.11221 12.9992Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const BodyTextDropdowns = () => {
    if (templateFields.bodyTextDropdowns.length > 0) {
      return (
        <div className="row">
          <div className="small-12 columns">
            {Parser(templateFields.bodyTextDropdowns)}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const HPIcons = () => {
    if (templateFields.iconsListDropdown.length > 0) {
      return (
        <div className="row hp-icons">
          <div className="large-12 columns">
            <ul className="icons-list">
              {templateFields.iconsListDropdown.map(iconInfo => {
                return (
                  <li key={shortid.generate()}>
                    <img
                      className="lazy loaded"
                      src={iconInfo.icon.mediaItemUrl}
                    />
                    <h4>{iconInfo.title}</h4>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const TopThreeBrokersWIthAds = () => {
    //@issue - change width in iframe fail
    // useEffect(() => {
    //   console.log("LALALALA Load")
    //   setTimeout(() => {
    //     console.log("settimeout")
    //     console.log("page loaded")
    //     console.log($("#cmstrader3778WcqDDi iframe"))

    //     let head = $(".a-d-column iframe").contents().find("head")
    //     console.log("iframe head", $(".a-d-column iframe").find("head"))
    //     let css =
    //       '<style type="text/css"> a img { width: 100%; height: 100%; } </style>'
    //     $(head).append(css)
    //   }, 3000)
    // }, [generalSettings.leftAdBanners])
    return (
      <div className="brokers-top-section row expanded">
        {generalSettings.leftAdBanners?.length > 0 && (
          <div
            className="brokers-top__left-a-d a-d-column column hide-for-small-only medium-12 large-2"
            data-mh="brok-ad"
          >
            {generalSettings.leftAdBanners?.map(ad =>
              ad.bannerType === "link" ? (
                <a className="brokers-top__left-a-d-each" href={ad.bannerLink}>
                  <img src={ad.bannerImage?.mediaItemUrl} alt="" />
                </a>
              ) : (
                Parser(ad.bannerTag)
              )
            )}
          </div>
        )}

        <div
          className="brokers-top__content column medium-12 large-8"
          data-mh="brok-ad"
        >
          {templateFields.topThreeStockBrokers.length > 0 && (
            <div className="top-three top-three-stock">
              {generalSettings.topAdFirstBannerSectionForMobile?.bannerType &&
                (generalSettings.topAdFirstBannerSectionForMobile
                  ?.bannerType === "link" ? (
                  <div className="brokAd show-for-small-only">
                    <a
                      href={
                        generalSettings.topAdFirstBannerSectionForMobile
                          .bannerLink
                      }
                    >
                      <img
                        src={
                          generalSettings.topAdFirstBannerSectionForMobile
                            .bannerImage.mediaItemUrl
                        }
                        alt=""
                      />
                    </a>
                  </div>
                ) : (
                  Parser(
                    generalSettings.topAdFirstBannerSectionForMobile?.bannerTag
                  )
                ))}
              {templateFields.topThreeStockHeading && (
                <h2>{templateFields.topThreeStockHeading}</h2>
              )}

              <div class="dot-sep">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="top-three-brok-wrap">
                {templateFields.topThreeStockBrokers.map((brok, i) => {
                  return (
                    <div className="top-three-brok-each">
                      <div className="count-name brok-each-box">
                        <span className={`count count${++i}`}>{i}</span>
                        <Link to={brok.broker.uri}>
                          <span className="name">{brok.broker.title}</span>
                        </Link>
                        <Link className="broker-img-link" to={brok.broker.uri}>
                          <img
                            src={brok.broker.featuredImage.node.mediaItemUrl}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="min-deposit brok-each-box">
                        <h6>Min. Deposit</h6>
                        <span>{brok.broker.cptBrokers.minDeposit}</span>
                      </div>

                      <div className="platforms brok-each-box">
                        <h6>Platforms</h6>
                        {brok.broker.cptBrokers.platformsList && (
                          <span>
                            {brok.broker.cptBrokers.platformsList.map(
                              (platf, i, list) => {
                                if (i !== list.length - 1) {
                                  return `${platf} and `
                                }
                                return platf
                              }
                            )}
                          </span>
                        )}
                      </div>

                      <div className="leverage brok-each-box">
                        <h6>Typical Leverage</h6>
                        <span>
                          {brok.broker.cptBrokers.typicalLeverageForStocks}
                        </span>
                      </div>

                      <div className="bonus brok-each-box">
                        <h6>Bonus Feature</h6>
                        <span>
                          {brok.broker.cptBrokers.bonusFeatureForStocks}
                        </span>
                      </div>

                      <div className="to-broker brok-each-box">
                        <a href={brok.broker.cptBrokers.affiliateLink}>
                          Go to Broker
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {templateFields.topThreeStockButtonText &&
                templateFields.topThreeStockButtonLink && (
                  <div className="top-three-brok-bottom-btn">
                    <Link to={templateFields.topThreeStockButtonLink.uri}>
                      {templateFields.topThreeStockButtonText}
                    </Link>
                  </div>
                )}

              {generalSettings.topAdSecondBannerSectionForMobile &&
                (generalSettings.topAdSecondBannerSectionForMobile
                  .bannerType === "link" ? (
                  <div className="brokAd show-for-small-only">
                    <a
                      href={
                        generalSettings.topAdSecondBannerSectionForMobile
                          ?.bannerLink
                      }
                    >
                      <img
                        src={
                          generalSettings.topAdSecondBannerSectionForMobile
                            ?.bannerImage?.mediaItemUrl
                        }
                        alt=""
                      />
                    </a>
                  </div>
                ) : (
                  Parser(
                    generalSettings.topAdSecondBannerSectionForMobile?.bannerTag
                  )
                ))}
            </div>
          )}

          {templateFields.topThreeForexBrokers.length > 0 && (
            <div className="top-three top-three-stock">
              {templateFields.topThreeForexHeading && (
                <h2>{templateFields.topThreeForexHeading}</h2>
              )}

              <div class="dot-sep">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="top-three-brok-wrap">
                {templateFields.topThreeForexBrokers.map((brok, i) => {
                  return (
                    <div className="top-three-brok-each">
                      <div className="count-name brok-each-box">
                        <span className={`count count${++i}`}>{i}</span>
                        <Link to={brok.broker.uri}>
                          <span className="name">{brok.broker.title}</span>
                        </Link>
                        <Link className="broker-img-link" to={brok.broker.uri}>
                          <img
                            src={brok.broker.featuredImage.node.mediaItemUrl}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="min-deposit brok-each-box">
                        <h6>Min. Deposit</h6>
                        <span>{brok.broker.cptBrokers.minDeposit}</span>
                      </div>

                      <div className="platforms brok-each-box">
                        <h6>Platforms</h6>
                        {brok.broker.cptBrokers.platformsList && (
                          <span>
                            {brok.broker.cptBrokers.platformsList.map(
                              (platf, i, list) => {
                                if (i !== list.length - 1) {
                                  return `${platf} and `
                                }
                                return platf
                              }
                            )}
                          </span>
                        )}
                      </div>

                      <div className="leverage brok-each-box">
                        <h6>Typical Leverage</h6>
                        <span>
                          {brok.broker.cptBrokers.typicalLeverageForStocks}
                        </span>
                      </div>

                      <div className="bonus brok-each-box">
                        <h6>Bonus Feature</h6>
                        <span>
                          {brok.broker.cptBrokers.bonusFeatureForStocks}
                        </span>
                      </div>

                      <div className="to-broker brok-each-box">
                        <a href={brok.broker.cptBrokers.affiliateLink}>
                          Go to Broker
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {templateFields.topThreeForexButtonText &&
                templateFields.topThreeForexButtonLink && (
                  <div className="top-three-brok-bottom-btn">
                    <Link to={templateFields.topThreeForexButtonLink.uri}>
                      {templateFields.topThreeForexButtonText}
                    </Link>
                  </div>
                )}
            </div>
          )}

          {templateFields.topThreeCryptoBrokers.length > 0 && (
            <div className="top-three top-three-stock">
              {generalSettings.bottomAdFirstBannerSectionForMobile &&
                (generalSettings.bottomAdFirstBannerSectionForMobile
                  .bannerType === "link" ? (
                  <div className="brokAd show-for-small-only">
                    <a
                      href={
                        generalSettings.bottomAdFirstBannerSectionForMobile
                          .bannerLink
                      }
                    >
                      <img
                        src={
                          generalSettings.bottomAdFirstBannerSectionForMobile
                            ?.bannerImage?.mediaItemUrl
                        }
                        alt=""
                      />
                    </a>
                  </div>
                ) : (
                  Parser(
                    generalSettings.bottomAdFirstBannerSectionForMobile
                      ?.bannerTag
                  )
                ))}

              {templateFields.topThreeCryptoHeading && (
                <h2>{templateFields.topThreeCryptoHeading}</h2>
              )}

              <div class="dot-sep">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="top-three-brok-wrap">
                {templateFields.topThreeCryptoBrokers.map((brok, i) => {
                  return (
                    <div className="top-three-brok-each">
                      <div className="count-name brok-each-box">
                        <span className={`count count${++i}`}>{i}</span>
                        <Link to={brok.broker.uri}>
                          <span className="name">{brok.broker.title}</span>
                        </Link>
                        <Link className="broker-img-link" to={brok.broker.uri}>
                          <img
                            src={brok.broker.featuredImage.node.mediaItemUrl}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="min-deposit brok-each-box">
                        <h6>Min. Deposit</h6>
                        <span>{brok.broker.cptBrokers.minDeposit}</span>
                      </div>

                      <div className="platforms brok-each-box">
                        <h6>Platforms</h6>
                        {brok.broker.cptBrokers.platformsList && (
                          <span>
                            {brok.broker.cptBrokers.platformsList.map(
                              (platf, i, list) => {
                                if (i !== list.length - 1) {
                                  return `${platf} and `
                                }
                                return platf
                              }
                            )}
                          </span>
                        )}
                      </div>

                      <div className="leverage brok-each-box">
                        <h6>Typical Leverage</h6>
                        <span>
                          {brok.broker.cptBrokers.typicalLeverageForStocks}
                        </span>
                      </div>

                      <div className="bonus brok-each-box">
                        <h6>Bonus Feature</h6>
                        <span>
                          {brok.broker.cptBrokers.bonusFeatureForStocks}
                        </span>
                      </div>

                      <div className="to-broker brok-each-box">
                        <a href={brok.broker.cptBrokers.affiliateLink}>
                          Go to Broker
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {templateFields.topThreeCryptoButtonText &&
                templateFields.topThreeCryptoButtonLink && (
                  <div className="top-three-brok-bottom-btn">
                    <Link to={templateFields.topThreeCryptoButtonLink.uri}>
                      {templateFields.topThreeCryptoButtonText}
                    </Link>
                  </div>
                )}

              {generalSettings.bottomAdSecondBannerSectionForMobile &&
                (generalSettings.bottomAdSecondBannerSectionForMobile
                  .bannerType === "link" ? (
                  <div className="brokAd show-for-small-only">
                    <a
                      href={
                        generalSettings.bottomAdSecondBannerSectionForMobile
                          ?.bannerLink
                      }
                    >
                      <img
                        src={
                          generalSettings.bottomAdSecondBannerSectionForMobile
                            ?.bannerImage?.mediaItemUrl
                        }
                        alt=""
                      />
                    </a>
                  </div>
                ) : (
                  Parser(
                    generalSettings.bottomAdSecondBannerSectionForMobile
                      ?.bannerTag
                  )
                ))}
            </div>
          )}
        </div>

        {generalSettings.rightAdBanner?.length > 0 && (
          <div
            className="brokers-top__right-a-d a-d-column column hide-for-small-only medium-12 large-2"
            data-mh="brok-ad"
          >
            {generalSettings.rightAdBanner?.map(ad =>
              ad.bannerType === "link" ? (
                <a className="brokers-top__right-a-d-each" href={ad.bannerLink}>
                  <img src={ad.bannerImage?.mediaItemUrl} alt="" />
                </a>
              ) : (
                Parser(ad.bannerTag)
              )
            )}
          </div>
        )}
      </div>
    )
  }

  const TrustSection = () => {
    if (templateFields.trustSubsectionLogos.length > 0) {
      return (
        <div className="row trust-section">
          <div className="large-12 columns">
            <ul className="trust-list">
              {templateFields.trustSubsectionLogos.map(logo => {
                return (
                  <li key={shortid.generate()}>
                    <img
                      className="lazy"
                      src={logo.trustSubsectionLogo.mediaItemUrl}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const TrustSectionText = () => {
    if (templateFields.bottomTextDropdown.length > 0) {
      return (
        <div className="trust-section-bot-text">
          <div className="row">
            <div className="small-12 columns">
              {Parser(
                templateFields.bottomTextDropdown
                  ? templateFields.bottomTextDropdown
                  : ""
              )}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const ListSocProof = () => {
    if (templateFields.listSocProof.length > 0) {
      const sliderSettings = {
        arrows: true,
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1281,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 641,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 451,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      }
      return (
        <div className="slider-wrap">
          <div className="row slider-row">
            <div className="large-12 columns soc-heading">
              <h2>{templateFields.headingSocProof}</h2>
            </div>
            <div className="large-10 columns small-centered">
              <Equalizer>
                <Slider className="soc-slider" {...sliderSettings}>
                  {templateFields.listSocProof.map(each => {
                    return (
                      <div
                        className="soc-slide"
                        key={shortid.generate()}
                        data-mh="soc-slide"
                      >
                        <div name="soc-slide" className="slide-wrap">
                          {Parser(each.text)}
                        </div>
                      </div>
                    )
                  })}
                </Slider>
              </Equalizer>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
  }

  const logoUrl =
    data.wpgraphql?.acfOptionsHeader?.optHeader?.newHomepageLogo?.mediaItemUrl

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
            "@type": "Organization",
            name: "We Compare Brokers",
            url: "https://www.wecomparebrokers.com",
            logo: logoUrl,
          })}
        </script>
        {generalSettings.topAddSection?.typeOfAdd === "iframe"
          ? Parser(generalSettings.topAddSection?.topAdScript)
          : null}
        {generalSettings.leftAdBanners?.map(ad =>
          Parser(ad.bannerScript ? ad.bannerScript : "")
        )}
        {generalSettings.rightAdBanner?.map(ad =>
          Parser(ad.bannerScript ? ad.bannerScript : "")
        )}
        {generalSettings.topAdFirstBannerSectionForMobile.bannerScript &&
          Parser(
            generalSettings.topAdFirstBannerSectionForMobile?.bannerScript
          )}
        {generalSettings.topAdSecondBannerSectionForMobile.bannerScript &&
          Parser(
            generalSettings.topAdSecondBannerSectionForMobile?.bannerScript
          )}
        {generalSettings.bottomAdFirstBannerSectionForMobile.bannerScript &&
          Parser(
            generalSettings.bottomAdFirstBannerSectionForMobile?.bannerScript
          )}
        {generalSettings.bottomAdSecondBannerSectionForMobile.bannerScript &&
          Parser(
            generalSettings.bottomAdSecondBannerSectionForMobile?.bannerScript
          )}
      </Helmet>
      <div className="new-hp-wrap">
        <div
          className="new_banner_bg"
          style={{ backgroundColor: templateFields.homeBannerColor }}
        >
          <div className="row">
            <div className="large-12 columns">
              <div className="new_banner_content">
                {Parser(templateFields.newBannerText)}
              </div>
            </div>
          </div>
          <div className="row awards-cols">{<AwardCol />}</div>
          <div className="row banner-bot-text">
            <div className="small-12 columns">
              {Parser(templateFields.trustSubsectionText)}
            </div>
          </div>
        </div>

        {generalSettings.topAddSection?.typeOfAdd && (
          <div className="row top-a-d-wrap">
            <div className="large-12 columns">
              {generalSettings.topAddSection?.typeOfAdd === "iframe"
                ? Parser(generalSettings.topAddSection.topAdTag)
                : null}
              {generalSettings.topAddSection?.typeOfAdd === "link" ? (
                <a
                  href={generalSettings.topAddSection?.topAdLink}
                  className="top-a-d"
                >
                  <img
                    src={
                      generalSettings.topAddSection?.topAdImage?.mediaItemUrl
                    }
                    alt=""
                  />
                </a>
              ) : null}
            </div>
          </div>
        )}

        <div className="row dropdown-wrap">
          <div className="large-12 columns">{<NewBannerDropdown />}</div>
        </div>
        <BodyTextDropdowns />
        <HPIcons />
        <TopThreeBrokersWIthAds />
        <TrustSection />
        <TrustSectionText />
        <ListSocProof />
      </div>
    </Layout>
  )
}
