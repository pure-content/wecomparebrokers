import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"
import Equalizer from "./Equalizer"
const shortid = require("shortid")

export default function OldFooter(props) {
  const footer = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          url
        }
        themeFooterSettings {
          optFooter {
            newFooterSidebarContent
            buttonsHeader
            appstoreButtonLink
            googlePlayButtonLink
            partnersList {
              link
              logo {
                mediaItemUrl
              }
            }
            topFooterBackground {
              mediaItemUrl
            }
            appsImage {
              mediaItemUrl
            }
            appstoreButtonImage {
              mediaItemUrl
            }
            googlePlayButtonImage {
              mediaItemUrl
            }
            footerText
            socialsList {
              link
              icon {
                mediaItemUrl
                title
              }
            }
            copyrightOptions
            firstColTitle
            firstColLinks {
              title
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Page {
                  id
                  link
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                  link
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                  link
                }
              }
              linkType
              linkText
            }
            secColTitle
            secColLinks {
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                }
                ... on WPGraphQL_Page {
                  id
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                }
              }
              linkText
              linkType
              title
            }
            threeColTitle
            threeColLinks {
              title
              linkType
              linkText
              link {
                ... on WPGraphQL_Post {
                  id
                  uri
                }
                ... on WPGraphQL_Page {
                  id
                  uri
                }
                ... on WPGraphQL_MediaItem {
                  id
                  uri
                }
                ... on WPGraphQL_Broker123 {
                  id
                  uri
                }
                ... on WPGraphQL_Platform123 {
                  id
                  uri
                }
                ... on WPGraphQL_Comparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_CryptoCurrency123 {
                  id
                  uri
                }
                ... on WPGraphQL_BrokerComparison123 {
                  id
                  uri
                }
                ... on WPGraphQL_Article123 {
                  id
                  uri
                }
                ... on WPGraphQL_TopBroker123 {
                  id
                  uri
                }
                ... on WPGraphQL_ForexMarketNewsPage123 {
                  id
                  uri
                }
              }
            }
            fourColTitle
            fourColLinks {
              title
              linkType
              linkText
            }
            footerLogo {
              mediaItemUrl
              id
            }
          }
        }
        menu(id: "dGVybToz") {
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
      }
    }
  `)

  const { url } = footer.wpgraphql.generalSettings
  const contentType = props.contentType ? props.contentType.node.name : ""
  const footerOptions = footer.wpgraphql.themeFooterSettings.optFooter
  const dt = new Date()

  // loop through the menu items and make the links relative
  const menuItems = footer.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  const TopFooterWrap = () => {
    if (contentType !== "top_brokers") {
      const foot_bg = footerOptions.topFooterBackground.mediaItemUrl
      const foot_app_img = footerOptions.appsImage.mediaItemUrl
      const store_img = footerOptions.appstoreButtonImage.mediaItemUrl
      const market_img = footerOptions.googlePlayButtonImage.mediaItemUrl

      return (
        <div
          className="top-footer-wrap"
          style={{ backgroundImage: `url(${foot_bg})` }}
        >
          <div className="blue-overlay"></div>
          <div className="row top-footer-cont">
            <div className="large-7 columns top-left-footer">
              <h3 className="btns-heading">{footerOptions.buttonsHeader}</h3>
              <img
                className="lazy left app-img"
                src={foot_app_img}
                data-src={foot_app_img}
                alt="Application"
              />
              <Link
                className="footer-btn left"
                to={footerOptions.appstoreButtonLink}
              >
                <img
                  className="lazy footer-appstore"
                  src={store_img}
                  data-src={store_img}
                  alt="AppStore"
                />
              </Link>
              <Link
                className="footer-btn left"
                to={footerOptions.googlePlayButtonLink}
              >
                <img
                  className="lazy footer-playmarket"
                  src={market_img}
                  data-src={market_img}
                  alt="GooglePlay"
                />
              </Link>
            </div>
            <div className="large-5 columns">
              {Parser(footerOptions.newFooterSidebarContent)}
            </div>
          </div>
        </div>
      )
    } else return null
  }

  const PartnersList = () => {
    if (footerOptions.partnersList.length > 0) {
      return (
        <div className="footer-partners-wrap">
          <div className="row">
            <div className="small-12 columns">
              <ul>
                {footerOptions.partnersList.map(partner => (
                  <li key={shortid.generate()}>
                    {partner.link && (
                      <Link to={partner.link} target="_blank">
                        <img src={partner.logo.mediaItemUrl} alt="Partner" />
                      </Link>
                    )}
                    {!partner.link && (
                      <img src={partner.logo.mediaItemUrl} alt="Partner" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    } else return null
  }

  const LightGrey = () => {
    const ColGenerator = (title, links, logo) => {
      return (
        <div className="large-3 medium-6 columns" data-mh="fooler-col">
          {logo && (
            <Link className="logo-link" to={url}>
              <img className="lazy" src={logo.mediaItemUrl} alt="Footer logo" />
            </Link>
          )}
          {title && <h3>{title}</h3>}
          <ul>
            {links.map(eachLink => {
              const linkTitle = eachLink.title
              const linkType = eachLink.linkType
              const linkItself =
                linkType === "text"
                  ? eachLink.linkText
                      .split("/")
                      .splice(3, eachLink.linkText.split("/").length - 1)
                      .join("/")
                  : eachLink.link.uri
              return (
                <li key={shortid.generate()}>
                  <Link to={linkItself}>{linkTitle}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
    const FirstCol = () => {
      if (footerOptions.firstColLinks.length > 0) {
        return ColGenerator(
          footerOptions.firstColTitle,
          footerOptions.firstColLinks
        )
      } else return null
    }
    const SecondCol = () => {
      if (footerOptions.secColLinks.length > 0) {
        return ColGenerator(
          footerOptions.secColTitle,
          footerOptions.secColLinks
        )
      } else return null
    }

    const ThirdCol = () => {
      if (footerOptions.threeColLinks.length > 0) {
        return ColGenerator(
          footerOptions.threeColTitle,
          footerOptions.threeColLinks
        )
      } else return null
    }
    const ForthCol = () => {
      if (footerOptions.fourColLinks.length > 0) {
        return ColGenerator(
          footerOptions.fourColTitle,
          footerOptions.fourColLinks,
          footerOptions.footerLogo
        )
      } else return null
    }

    return (
      <div className="light-grey-wrap">
        <div className="row">
          <Equalizer>
            <FirstCol />
            <SecondCol />
            <ThirdCol />
            <ForthCol />
          </Equalizer>
          {footerOptions.socialsList.length > 0 && (
            <div className="large-6 medium-12 columns footer-half half-left">
              <ul className="socials">
                {footerOptions.socialsList.map(soc => {
                  return (
                    <li key={shortid.generate()}>
                      <Link to={soc.link} target="_blank">
                        <img src={soc.icon.mediaItemUrl} alt={soc.icon.title} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {footerOptions.footerText.length > 0 && (
            <div className="small-12 columns footer-full">
              <div className="text-wrap">
                {Parser(footerOptions.footerText)}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  const DarkGrey = () => {
    return (
      <div className="dark-grey-wrap">
        <div className="row">
          {footerOptions.copyrightOptions.length > 0 && (
            <div className="medium-6 columns">
              <p>
                &copy;
                {Parser(footerOptions.copyrightOptions)} {dt.getFullYear()}
              </p>
            </div>
          )}
          <div className="medium-6 columns">
            <div className="menu-footer-menu-container">
              <ul id="menu-footer-menu" className="inline-list">
                {menuItems.map(menuItem => {
                  return (
                    <li key={shortid.generate()} className="menu-item">
                      <Link to={menuItem.url}>{menuItem.label}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <footer>
      <TopFooterWrap />
      <PartnersList />
      <LightGrey />
      <DarkGrey />
    </footer>
  )
}
