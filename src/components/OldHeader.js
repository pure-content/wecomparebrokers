import React, { useEffect } from "react"
import $ from "jquery"
import { Link, useStaticQuery, graphql } from "gatsby"

export default function OldHeader(props) {
  const menu = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          url
        }
        menu(id: "dGVybToy") {
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
        themeGeneralSettings {
          optHeader {
            newHomepageLogo {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  `)

  const { url } = menu.wpgraphql.generalSettings
  const { title, uri } = props
  const {
    altText,
    mediaItemUrl,
  } = menu.wpgraphql.themeGeneralSettings.optHeader.newHomepageLogo

  // loop through the menu items and make the links relative
  const items = menu.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  useEffect(() => {
    $('.toggle-topbar').on('click', function () {
      $('.top-bar').toggleClass('expanded')
    })
  })

  return (
    <header style={{ backgroundColor: "#fff" }}>
      <div className="row large-uncollapse medium-uncollapse small-collapse">
        <div className="large-3 columns">
          <div className="logo small-only-text-center">
            <a href="/" className="home">
              <img
                src={
                  "https://www.wecomparebrokers.com/wp-content/uploads/2018/10/Group.svg"
                }
                alt={altText}
              />
            </a>
          </div>
        </div>
        <div className="large-7 columns">
          <nav
            className="top-bar"
            data-topbar=""
            role="navigation"
            data-options="{is_hover: false, mobile_show_parent_link: true}"
          >
            <ul className="title-area">
              <li className="name"></li>
              <li className="toggle-topbar menu-icon">
                <a className="home">
                  <span>Menu</span>
                </a>
              </li>
            </ul>
            <section className="top-bar-section">
              <div className="menu-new-header-menu-container">
                <ul id="menu-new-header-menu" className="menu">
                  {items.map(item => (
                    <li
                      key={item.id}
                      className={`menu-item ${title === item.label ? "current-menu-item" : ""} ${uri === item.url ? "current-menu-item" : ""}`}
                    >
                      <a key={item.url} href={item.url}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </nav>
        </div>

        <div className="large-2 columns search-header">
          <form method="get" id="searchform" action={"/"}>
            <input
              type="text"
              name="s"
              id="s"
              placeholder="Search for broker..."
            />

            <input
              type="submit"
              className="prefix"
              name="submit"
              id="searchsubmit"
              value=""
            />
          </form>
        </div>
      </div>
    </header>
  )
}
