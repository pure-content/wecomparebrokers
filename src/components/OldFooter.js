import React, { useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"
import Equalizer from "./Equalizer"
const shortid = require("shortid")

// gfForm(formId: {eq: 1}) {
//   formId
//   slug
//   apiURL
//   descriptionPlacement
//   formFields {
//       id
//       label
//       labelPlacement
//       description
//       descriptionPlacement
//       type
//       choices
//       content
//       errorMessage
//       inputMaskValue
//       isRequired
//       visibility
//       cssClass
//       placeholder
//       size
//       defaultValue
//       maxLength
//       conditionalLogic
//       emailConfirmEnabled
//   }
//   button {
//       text
//   }
//   confirmations {
//       message
//   }
// }


// allGfForm {
//   edges {
//     node {
//       formId
//       slug
//       apiURL
//       descriptionPlacement
//       formFields {
//         id
//         label
//         labelPlacement
//         description
//         descriptionPlacement
//         type
//         choices
//         content
//         errorMessage
//         inputMaskValue
//         isRequired
//         visibility
//         cssClass
//         placeholder
//         size
//         defaultValue
//         maxLength
//         conditionalLogic
//         emailConfirmEnabled
//       }
//       button {
//           text
//       }
//       confirmations {
//           message
//       }
//     }
//   }
// }

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

  useEffect(() => {
    $(".light-grey-wrap .columns").matchHeight()
    $('.fooler-col').matchHeight()
  })

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
              <a
                className="footer-btn left"
                href={footerOptions.appstoreButtonLink}
              >
                <img
                  className="lazy footer-appstore"
                  src={store_img}
                  data-src={store_img}
                  alt="AppStore"
                />
              </a>
              <a
                className="footer-btn left"
                href={footerOptions.googlePlayButtonLink}
              >
                <img
                  className="lazy footer-playmarket"
                  src={market_img}
                  data-src={market_img}
                  alt="GooglePlay"
                />
              </a>
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
                      <a href={partner.link} target="_blank">
                        <img src={partner.logo.mediaItemUrl} alt="Partner" />
                      </a>
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
                  ? eachLink.linkText.replace(url, "")
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

          <div class="large-6 medium-12 columns footer-half half-right">

            {/* <GravityFormForm
              id={1}
              formData={allGfForm}
              lambda={process.env.LAMBDA_ENDPOINT}
              successCallback={handleSuccess}
              errorCallback={handleError}
            /> */}

            <div class="gf_browser_chrome gform_wrapper" id="gform_wrapper_1">
              <div id="gf_1" class="gform_anchor" tabindex="-1"></div>
              <form method="post" enctype="multipart/form-data" target="gform_ajax_frame_1" id="gform_1" action="https://meek-hint.flywheelsites.com/#gf_1">
                <div class="gform_body">
                  <ul id="gform_fields_1" class="gform_fields top_label form_sublabel_below description_below">
                    <li id="field_1_1" class="gfield gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                      <label class="gfield_label" for="input_1_1">Email<span class="gfield_required">*</span></label>
                      <div class="ginput_container ginput_container_email">
                        <input name="input_1" id="input_1_1" type="text" class="large" placeholder='Get Daily Email Alerts' aria-required="true" aria-invalid="false" />
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="gform_footer top_label">
                  <input type="submit" id="gform_submit_button_1" class="gform_button button btn " value="Sign Up" onclick="if(window[&quot;gf_submitting_1&quot;]){return false;}  window[&quot;gf_submitting_1&quot;]=true;  " onkeypress="if( event.keyCode == 13 ){ if(window[&quot;gf_submitting_1&quot;]){return false;} window[&quot;gf_submitting_1&quot;]=true;  jQuery(&quot;#gform_1&quot;).trigger(&quot;submit&quot;,[true]); }" />
                  <input type="hidden" name="gform_ajax" value="form_id=1&amp;title=&amp;description=&amp;tabindex=0" />
                  <input type="hidden" class="gform_hidden" name="is_submit_1" value="1" />
                  <input type="hidden" class="gform_hidden" name="gform_submit" value="1" />
                  <input type="hidden" class="gform_hidden" name="gform_unique_id" value="" />
                  <input type="hidden" class="gform_hidden" name="state_1" value="WyJbXSIsImQ2ZDg2YWUyMTUzYzk5ODM3ZDBmNzE5Njc3NDAzMGI0Il0=" />
                  <input type="hidden" class="gform_hidden" name="gform_target_page_number_1" id="gform_target_page_number_1" value="0" />
                  <input type="hidden" class="gform_hidden" name="gform_source_page_number_1" id="gform_source_page_number_1" value="1" />
                  <input type="hidden" name="gform_field_values" value="" />
                </div>
              </form>
            </div>

          </div>

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
