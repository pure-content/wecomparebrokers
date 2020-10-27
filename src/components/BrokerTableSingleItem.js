import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import $ from "jquery"
import Parser from "html-react-parser"
import "jquery-match-height"
import "easy-pie-chart/dist/jquery.easypiechart"
import { scoreAnimation } from "../functions/scoreAnimation"
import AllData from '../data/allData'

export default function BrokerTableSingleItem(props) {
  const themeGeneralSettings = useStaticQuery(graphql`
    query {
      wpgraphql {
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
  useEffect(() => {
    $(document).ready(function () {
      $(".broker-col").matchHeight()
      if ($(".small-chart") != "") {
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
      if ($(".big-chart") != "") {
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
      //   var first = $('form #first-usr option[value="<?php echo $user_one; ?>"]'),
      //     firstVal = first.val(),
      //     sec = $('form #sec-usr option[value="<?php echo $user_two; ?>"]'),
      //     secVal = sec.val()
      //   $("form #first-usr").val(firstVal).trigger("change")
      //   $("form #sec-usr").val(secVal).trigger("change")
      //$(".broker-col").matchHeight()
    })
    // $(".compare-btn").click(function () {
    //   var brokId = $(this).attr("data-id")
    //   $("#first-user").val(brokId)
    //   $("#compare-form-wrap").fadeIn("fast")
    // })
  })

  const { platfomsList, accountsList, spreadsList, methodsList } = AllData()
  // const platfomsList = [
  //   "MT5",
  //   "MT4",
  //   "WebTrader",
  //   "Mobile apps",
  //   "Proprietary",
  //   "cTrader",
  // ]
  // const accountsList = ["Micro", "Retail", "VIP", "Professional"]
  // const spreadsList = ["Fixed", "Variable"]
  // const methodsList = ["Bank transfer", "Credit Cards", "PayPal"]
  const { brokerInfo } = props
  const platformThumb = brokerInfo.cptBrokers.platformRelation
    ? brokerInfo.cptBrokers.platformRelation.featuredImage.node.mediaItemUrl
    : null

  const BrokerButtons = () => {

    return (
      <>
        <span className="aff-wrap">
          <a
            className="btn small"
            href={brokerInfo.cptBrokers.affiliateLink}
            target="_blank"
            rel="nofollow sponsored"
          >
            {themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText ? themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText : 'Take Me To Broker'}

          </a>
          {brokerInfo.cptBrokers.takeMeToBrokerButtonNoteText && (
            <span className="floating-note">
              {brokerInfo.cptBrokers.takeMeToBrokerButtonNoteText}
            </span>
          )}
        </span>
        <span data-id={brokerInfo.id} value={JSON.stringify(brokerInfo)} className="btn small compare-btn">
          {themeGeneralSettings.wpgraphql.themeGeneralSettings
            .optGeneralSettings.compareBrokerSideBySideButtonAlternativeText
            ? themeGeneralSettings.wpgraphql.themeGeneralSettings
              .optGeneralSettings
              .compareBrokerSideBySideButtonAlternativeText
            : "Compare Brokers Side by Side"}
        </span>
        <Link className="btn small" to={brokerInfo.uri}>
          {themeGeneralSettings.wpgraphql.themeGeneralSettings
            .optGeneralSettings.readFullReviewButtonAlternativeText
            ? themeGeneralSettings.wpgraphql.themeGeneralSettings
              .optGeneralSettings.readFullReviewButtonAlternativeText
            : "Read Full Review"}
        </Link>
      </>
    )
  }

  if (brokerInfo) {
    return (
      <div className="row collapse broker-wrap">
        {brokerInfo.cptBrokers.specialOffer && (
          <img
            className="spec-offer-ico"
            src={
              themeGeneralSettings.wpgraphql.themeGeneralSettings
                .optGeneralSettings.specialOfferIcon.mediaItemUrl
            }
            alt="Special Offer"
          />
        )}
        <div className="broker-tab-col first-col broker-identity full broker-col">
          <div className="img-col img-center">
            <div className="thumb-wrap">
              {brokerInfo.featuredImage ? (
                <img
                  src={brokerInfo.featuredImage.node.mediaItemUrl}
                  alt="WCB Logo"
                />
              ) : (
                  <img
                    className="img-list-default"
                    src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/generic-logo.png"
                    alt="WCB Logo"
                  />
                )}
            </div>
          </div>

          <div className="broker-name align-right">
            {platformThumb && <img src={platformThumb} />}
            {/* <h3>{brokerInfo.title}</h3> */}
            {scoreAnimation(
              brokerInfo.cptBrokers.ourScore,
              "small-chart",
              true
            )}
          </div>
          <div className="btn-wrap">
            <a className="btn call-back-form" data-brokname={brokerInfo.title}>
              {themeGeneralSettings.wpgraphql.themeGeneralSettings
                .optGeneralSettings.brokerCallBackButtonAlternativeText
                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                  .optGeneralSettings.brokerCallBackButtonAlternativeText
                : "Broker Callback"}
            </a>
            <a
              className="btn"
              href={brokerInfo.cptBrokers.affiliateLink}
              target="_blank"
            >
              {themeGeneralSettings.wpgraphql.themeGeneralSettings
                .optGeneralSettings.visitBrokerButtonAlternativeText
                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                  .optGeneralSettings.visitBrokerButtonAlternativeText
                : "Visit Broker"}
            </a>
          </div>
        </div>
        <div className="broker-tab-col broker-content broker-col">
          <div className="points-col broker-content-col text-center">
            <div className="wrap">
              <p className="val">
                {Parser(
                  brokerInfo.cptBrokers.allSpreadsPoints
                    ? brokerInfo.cptBrokers.allSpreadsPoints
                    : ""
                )}
              </p>
              <p>Spreads:</p>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
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
                  brokerInfo.cptBrokers.minDeposit
                    ? brokerInfo.cptBrokers.minDeposit
                    : ""
                )}
              </p>
              <p>Min. deposit</p>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
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
                  if (brokerInfo.cptBrokers.platformsList) {
                    return brokerInfo.cptBrokers.platformsList.includes(
                      platf
                    ) ? (
                        <li className="checked">{platf}</li>
                      ) : (
                        <li>{platf}</li>
                      )
                  } else {
                    return <li>{platf}</li>
                  }
                })}
              </ul>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
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
                  if (brokerInfo.cptBrokers.accountsList) {
                    return brokerInfo.cptBrokers.accountsList.includes(
                      account
                    ) ? (
                        <li className="checked">{account}</li>
                      ) : (
                        <li>{account}</li>
                      )
                  } else {
                    return <li>{account}</li>
                  }
                })}
              </ul>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
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
                  if (brokerInfo.cptBrokers.spreadsList) {
                    return brokerInfo.cptBrokers.spreadsList.includes(
                      spread
                    ) ? (
                        <li className="checked">{spread}</li>
                      ) : (
                        <li>{spread}</li>
                      )
                  } else {
                    return <li>{spread}</li>
                  }
                })}
              </ul>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
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
                  if (brokerInfo.cptBrokers.methodsList) {
                    return brokerInfo.cptBrokers.methodsList.includes(
                      method
                    ) ? (
                        <li className="checked">{method}</li>
                      ) : (
                        <li>{method}</li>
                      )
                  } else {
                    return <li>{method}</li>
                  }
                })}
              </ul>
            </div>
            {brokerInfo.cptBrokers.affiliateLink && (
              <a
                href={brokerInfo.cptBrokers.affiliateLink}
                target="_blank"
                rel="nofollow sponsored"
              >
                See Methods
              </a>
            )}
          </div>
          {brokerInfo.cptBrokers.tableInfo && (
            <div className="info-text-col text-center">
              <p>{brokerInfo.cptBrokers.tableInfo}</p>
            </div>
          )}
        </div>
        <div className="broker-tab-col btn-col broker-col">
          <BrokerButtons />
        </div>
      </div>
    )
  } else return null
}
