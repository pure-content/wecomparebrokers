import React from "react"
import { graphql, Link } from "gatsby"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

export const query = graphql`
  query ($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        uri
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

        allPagesFields {
          alternativeTitle
          pageIcon {
            mediaItemUrl
          }
          videoPage
        }

        tmplCheapestBroker {
          mainHeading
          pageDescription
          pageImage {
            mediaItemUrl
          }
          brokersTable {
            anyOtherFees
            avarageComission
            brokerTableImage {
              mediaItemUrl
            }
            brokerTableName
            commision
            overnightFee
            spread
            tradingFee
            thisBroker {
              ... on WPGraphQL_Broker123 {
                id
                uri
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                cptBrokers {
                  affiliateLink
                }
              }
            }
          }
        }
      }
    }
  }
`

export default function CheapestBrokerTemplate({ data }) {
  const page = data.wpgraphql.page

  const FirstColumn = () => {
    return (
      <div class="cheap-column__wrap first-column">
        <div class="cheap-column__cell cell-name" data-mh="cell-name"></div>
        <div class="cheap-column__cell cell-image" data-mh="cell-image"></div>
        <div class="cheap-column first-column">
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/TRADING_FEE.png" />
            <p class="cheap-column__head">
              <strong>TRADING FEE</strong>
            </p>
          </div>
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/COMMISSION.png" />
            <p class="cheap-column__head">
              <strong>COMMISSION</strong>
            </p>
          </div>
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/SPREAD (EURUSD).png" />
            <p class="cheap-column__head">
              <strong>SPREAD</strong> (EUR/USD)
            </p>
          </div>
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/AVERAGE COMMISSION.png" />
            <p class="cheap-column__head">
              <strong>AVERAGE COMMISSION</strong> ON A 1K TRADE (EUR/USD)
            </p>
          </div>
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/OVERNIGHTS FEE.png" />
            <p class="cheap-column__head">
              <strong>OVERNIGHTS FEE</strong>
            </p>
          </div>
          <div class="cheap-column__cell">
            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/ANY OTHER FEES.png" />
            <p class="cheap-column__head">
              <strong>ANY OTHER FEES</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const EachColumn = ({ brokTableInfo }) => {
    return (
      <div class="cheap-column__wrap">
        <div class="cheap-column__cell cell-name" data-mh="cell-name">
          {brokTableInfo.brokerTableName}
        </div>
        <div class="cheap-column column-broker">
          <div class="cheap-column__cell cell-image" data-mh="cell-image">
            <a href={brokTableInfo.thisBroker.cptBrokers.affiliateLink}>
              <img
                src={brokTableInfo.thisBroker.featuredImage.node.mediaItemUrl}
              />
            </a>
          </div>
          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>TRADING FEE</strong>
            </p>
            {brokTableInfo.tradingFee || brokTableInfo.tradingFee == 0 ? (
              Parser(brokTableInfo.tradingFee)
            ) : (
              <span class="dash"></span>
            )}
          </div>
          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>COMMISSION</strong>
            </p>
            {brokTableInfo.commision ? (
              Parser(brokTableInfo.commision)
            ) : (
              <span class="dash"></span>
            )}
          </div>
          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>SPREAD</strong> (EUR/USD)
            </p>
            {brokTableInfo.spread ? (
              Parser(brokTableInfo.spread)
            ) : (
              <span class="dash"></span>
            )}
          </div>
          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>AVERAGE COMMISSION</strong> ON A 1K TRADE (EUR/USD)
            </p>
            {brokTableInfo.avarageComission ? (
              Parser(brokTableInfo.avarageComission)
            ) : (
              <span class="dash"></span>
            )}
          </div>
          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>OVERNIGHTS FEE</strong>
            </p>
            {brokTableInfo.overnightFee ? (
              Parser(brokTableInfo.overnightFee)
            ) : (
              <span class="dash"></span>
            )}
          </div>

          <div class="cheap-column__cell">
            <p class="cheap-column__head">
              <strong>ANY OTHER FEES</strong>
            </p>
            {brokTableInfo.anyOtherFees ? (
              Parser(brokTableInfo.anyOtherFees)
            ) : (
              <span class="dash"></span>
            )}
          </div>
        </div>
        <Link
          class="btn"
          to={brokTableInfo.thisBroker.uri}
          data-wpel-link="internal"
        >
          Go to broker
        </Link>
      </div>
    )
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
  }
  const { seo } = page
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
            "@type": "WebPage",
            headline: page.title,
            url: `https://www.wecomparebrokers.com${page.uri}`,
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
                  "@id": `https://www.wecomparebrokers.com${page.uri}`,
                  name: page.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div class="row cheap-compare">
        {page.tmplCheapestBroker.mainHeading
          ? Parser(
              page.tmplCheapestBroker.mainHeading
                ? page.tmplCheapestBroker.mainHeading
                : ""
            )
          : null}
        {page.tmplCheapestBroker.pageDescription ? (
          <div class="cheap-compare__descr">
            {Parser(
              page.tmplCheapestBroker.pageDescription
                ? page.tmplCheapestBroker.pageDescription
                : ""
            )}
          </div>
        ) : null}
        {page.tmplCheapestBroker.pageImage ? (
          <div class="cheap-compare__img">
            <img src={page.tmplCheapestBroker.pageImage.mediaItemUrl} />
          </div>
        ) : null}
        <div class="cheap-compare__table">
          <FirstColumn />
          {page.tmplCheapestBroker.brokersTable
            ? page.tmplCheapestBroker.brokersTable.map(brokTableInfo => (
                <EachColumn brokTableInfo={brokTableInfo} />
              ))
            : null}
        </div>
        <div class="cheap-compare__logo">
          <img src="https://meek-hint.flywheelsites.com/wp-content/uploads/2018/10/Group.svg" />
        </div>
      </div>
    </Layout>
  )
}
