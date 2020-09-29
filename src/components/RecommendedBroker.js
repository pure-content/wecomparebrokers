import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import $ from "jquery"
import "easy-pie-chart/dist/jquery.easypiechart"
import Parser from "html-react-parser"
import { scoreAnimation } from "../functions/scoreAnimation"

export default function RecommendedBroker(props) {
  const { recommendedBroker, recommendedBrokerAdditionalText } = props
  const brokerFields = recommendedBroker.cptBrokers
  const brokerImage = recommendedBroker.featuredImage.node

  const specialOffer = useStaticQuery(graphql`
    query {
      wpgraphql {
        themeGeneralSettings {
          optGeneralSettings {
            specialOfferIcon {
              mediaItemUrl
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
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
  }, [])

  const BrokerButtons = () => {
    if (brokerFields.affiliateLink && !brokerFields.tabButtonAlternativeText) {
      return (
        <span className="aff-wrap">
          <a
            className="btn blue"
            href={brokerFields.affiliateLink}
            target="_blank"
            rel="nofollow sponsored"
          >
            Take Me To Broker
          </a>
          {brokerFields.takeMeToBrokerButtonNoteText && (
            <span className="floating-note">
              {brokerFields.takeMeToBrokerButtonNoteText}
            </span>
          )}
        </span>
      )
    } else if (
      brokerFields.affiliateLink &&
      brokerFields.tabButtonAlternativeText
    ) {
      return (
        <span className="aff-wrap">
          <a
            className="btn blue"
            href={brokerFields.affiliateLink}
            target="_blank"
            rel="nofollow sponsored"
          >
            {brokerFields.tabButtonAlternativeText}
          </a>
          {brokerFields.takeMeToBrokerButtonNoteText && (
            <span className="floating-note">
              {brokerFields.takeMeToBrokerButtonNoteText}
            </span>
          )}
        </span>
      )
    }
  }

  return (
    <div className="rec-brok-wrap">
      <h3>Recommended broker</h3>
      <div className="row collapse broker-wrap">
        {brokerFields.specialOffer && (
          <img
            className="spec-offer-ico"
            src={
              specialOffer.wpgraphql.themeGeneralSettings.optGeneralSettings
                .specialOfferIcon.mediaItemUrl
            }
            alt="Special Offer"
          />
        )}
        <div className="broker-tab-col img-col broker-col">
          <div className="thumb-wrap">
            {brokerImage ? (
              <img
                src={brokerImage.mediaItemUrl}
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

        <div className="broker-tab-col broker-name broker-col align-right">
          {/* <h3>{recommendedBroker.title}</h3> */}
          {scoreAnimation(brokerFields.ourScore, "small-chart", true)}
        </div>

        <div className="broker-tab-col broker-content broker-col">
          <div className="likes-col">
            <p>
              <strong>Pros:</strong>
            </p>
            {Parser(brokerFields.likesList)}
          </div>
          {recommendedBrokerAdditionalText && (
            <div className="text-col">
              {Parser(recommendedBrokerAdditionalText)}
            </div>
          )}
        </div>

        <div className="broker-tab-col btn-col broker-col">
          <BrokerButtons />
        </div>
      </div>
    </div>
  )
}
