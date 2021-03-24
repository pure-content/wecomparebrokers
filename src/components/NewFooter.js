import React, { useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"
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

export default function Footer() {
  const footer = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          url
        }
        themeFooterSettings {
          optFooter {
            newFooterSidebarContent
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
  const footerOptions = footer.wpgraphql.themeFooterSettings.optFooter
  const dt = new Date()

  // loop through the menu items and make the links relative
  const menuItems = footer.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  const DarkBlue = () => {
    if (footerOptions.newFooterSidebarContent.length > 0) {
      return (
        <div className="dark-blue-wrap">
          <div className="row">
            <div className="small-12 colunms">
              {Parser(footerOptions.newFooterSidebarContent)}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  const LightGrey = () => {
    const ColGenerator = (title, links, logo) => {
      return (
        <div className="large-3 medium-6 columns" data-mh="fooler-col">
          {logo && (
            <Link className="logo-link" to={'/'}>
              <img className="lazy" src={logo.mediaItemUrl} alt="Footer logo" />
            </Link>
          )}
          {title && <h3>{title}</h3>}
          <ul>
            {links.map(eachLink => {
              const linkTitle = eachLink.title
              const linkType = eachLink.linkType
              const linkItself = linkType === "text" ? eachLink.linkText.includes('wp-content') ? eachLink.linkText : eachLink.linkText.replace(url, "") : eachLink.link.uri
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
          <FirstCol />
          <SecondCol />
          <ThirdCol />
          <ForthCol />
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

          <div className="large-6 medium-12 columns footer-half half-right">
            {/* <GravityFormForm
              id={1}
              formData={allGfForm}
              presetValues={{ input_1: 'Get Daily Email Alerts' }}
              lambda={process.env.LAMBDA_ENDPOINT}
              successCallback={handleSuccess}
              errorCallback={handleError}
            /> */}
            <div className="gf_browser_chrome gform_wrapper" id="gform_wrapper_1">
              <div id="gf_1" className="gform_anchor" tabindex="-1"></div>
              <form method="post" encType="multipart/form-data" target="gform_ajax_frame_1" id="gform_1" action="https://meek-hint.flywheelsites.com/#gf_1">
                <div className="gform_body">
                  <ul id="gform_fields_1" className="gform_fields top_label form_sublabel_below description_below">
                    <li id="field_1_1" className="gfield gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                      <label className="gfield_label" for="input_1_1">Email<span className="gfield_required">*</span></label>
                      <div className="ginput_container ginput_container_email">
                        <input name="input_1" id="input_1_1" type="text" className="large" placeholder='Get Daily Email Alerts' aria-required="true" aria-invalid="false" />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="gform_footer top_label">
                  <input type="submit" id="gform_submit_button_1" className="gform_button button btn " value="Sign Up" onClick="if(window[&quot;gf_submitting_1&quot;]){return false;}  window[&quot;gf_submitting_1&quot;]=true;  " onKeyPress="if( event.keyCode == 13 ){ if(window[&quot;gf_submitting_1&quot;]){return false;} window[&quot;gf_submitting_1&quot;]=true;  jQuery(&quot;#gform_1&quot;).trigger(&quot;submit&quot;,[true]); }" />
                  <input type="hidden" name="gform_ajax" value="form_id=1&amp;title=&amp;description=&amp;tabindex=0" />
                  <input type="hidden" className="gform_hidden" name="is_submit_1" value="1" />
                  <input type="hidden" className="gform_hidden" name="gform_submit" value="1" />
                  <input type="hidden" className="gform_hidden" name="gform_unique_id" value="" />
                  <input type="hidden" className="gform_hidden" name="state_1" value="WyJbXSIsImQ2ZDg2YWUyMTUzYzk5ODM3ZDBmNzE5Njc3NDAzMGI0Il0=" />
                  <input type="hidden" className="gform_hidden" name="gform_target_page_number_1" id="gform_target_page_number_1" value="0" />
                  <input type="hidden" className="gform_hidden" name="gform_source_page_number_1" id="gform_source_page_number_1" value="1" />
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
                  if (menuItem.url.includes('sitemap')) {
                    return (
                      <li key={shortid.generate()} className="menu-item">
                        <a href='https://meek-hint.flywheelsites.com/sitemap_index.xml'>{menuItem.label}</a>
                      </li>
                    )
                  } else {
                    return (
                      <li key={shortid.generate()} className="menu-item">
                        <Link to={menuItem.url}>{menuItem.label}</Link>
                      </li>
                    )
                  }
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
      <DarkBlue />
      <LightGrey />
      <DarkGrey />
    </footer>
  )
}
