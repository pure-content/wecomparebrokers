import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Slider from "react-slick"
import Parser from "html-react-parser"
const shortid = require("shortid")

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
        newHomePage {
          homeBannerColor
          newBannerText
          trustSubsectionText
          bottomTextDropdown
          listSocProof {
            text
          }
          iconsListDropdown {
            title
            icon {
              mediaItemUrl
            }
          }
          trustSubsectionText
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
        }
      }
    }
  }
`

export default function NewHomePage({ data }) {
  const page = data.wpgraphql.page
  const templateFields = page.newHomePage

  const avarageRatingCounter = brokerRatings => {
    let avarage =
      Object.values(brokerRatings).reduce((a, b) =>
        typeof b === "number" ? a + b : a
      ) / 6
    const avarageRound = Math.round(avarage * 10) / 10
    return avarageRound
  }

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
        traderInfo = brokerInfo.cptBrokers.traderInformationForStocks
        bestBrokText = "Best Stock Broker"
        brokerAvarage = avarageRatingCounter(
          templateFields.stockBrokerAward.cptBrokers
        )
      }
      if ("traderInformationForForex" in brokerInfo.cptBrokers) {
        awdclassName = "forex-awd"
        traderInfo = brokerInfo.cptBrokers.traderInformationForForex
        bestBrokText = "Best Forex Broker"
        brokerAvarage = avarageRatingCounter(
          templateFields.forexBrokerAward.cptBrokers
        )
      }
      if ("traderInformationForEtf" in brokerInfo.cptBrokers) {
        awdclassName = "etf-awd"
        traderInfo = brokerInfo.cptBrokers.traderInformationForEtf
        bestBrokText = "Best ETF Broker"
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
                <span className="nmbr">1</span>
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
                        data-src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg"
                        alt="Rating"
                        src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg"
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
                  Go to award
                </a>
                <a href={brokerInfo.uri} className="btn small">
                  View More
                </a>
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
          <div
            className={`left_banner_dropdown ${leftDropdownOpen.className}`}
            onClick={() => {
              bannerDropdownHandler("left")
            }}
          >
            <span className="banner_heading">
              {Parser(templateFields.leftDropdownName)}
            </span>

            <div style={leftDropdownOpen.style} className="banner_body">
              {templateFields.leftDropdown.map(ddbrok => {
                return (
                  <a key={ddbrok.id} href={ddbrok.uri}>
                    {Parser(ddbrok.title)}
                  </a>
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
            onClick={() => {
              bannerDropdownHandler("right")
            }}
          >
            <span className="banner_heading">
              {Parser(templateFields.rightDropdownName)}
            </span>
            <div style={rightDropdownOpen.style} className="banner_body">
              {templateFields.rightDropdown.map(ddbrok => {
                return (
                  <a key={ddbrok.id} href={ddbrok.uri}>
                    {Parser(ddbrok.title)}
                  </a>
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
        <div className="row trust-section-bot-text">
          <div className="small-12 columns">
            {Parser(templateFields.bottomTextDropdown)}
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
            <div className="large-10 columns small-centered">
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
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <Layout isFrontPage={page.isFrontPage}>
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
        <div className="row dropdown-wrap">
          <div className="large-12 columns">{<NewBannerDropdown />}</div>
        </div>
        {<BodyTextDropdowns />}
        {<HPIcons />}
        {<TrustSection />}
        {<TrustSectionText />}
        {<ListSocProof />}
      </div>
    </Layout>
  )
}
