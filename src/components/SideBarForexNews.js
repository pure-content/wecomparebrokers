import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default function SideBarForexNews() {
  const sidebarInfo = useStaticQuery(graphql`
    query {
      wpgraphql {
        acfOptionsForexNewsSettings {
          optForexNewsSettings {
            sidebarPopularBrokersList {
              alternativeBrokerName
              broker {
                ... on WPGraphQL_Broker123 {
                  id
                  title
                  uri
                  featuredImage {
                    node {
                      mediaItemUrl
                      sizes(size: POP_BROK_THUMB)
                      srcSet(size: POP_BROK_THUMB)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { sidebarPopularBrokersList } =
    sidebarInfo.wpgraphql.acfOptionsForexNewsSettings.optForexNewsSettings || {}

  return (
    <aside class="widget popular-brok-widget">
      <h3>Most popular brokers</h3>
      <div class="dot-sep">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {sidebarPopularBrokersList ? (
        <ul>
          {sidebarPopularBrokersList.map(brok => {
            if (brok.broker) {
              return (
                <li>
                  <Link to={brok.broker.uri}>
                    {brok.broker.featuredImage ? (
                      <span class="logo-wrap">
                        <img
                          sizes={brok.broker.featuredImage.node.sizes}
                          srcSet={brok.broker.featuredImage.node.srcSet}
                          src={brok.broker.featuredImage.node.mediaItemUrl}
                        />
                      </span>
                    ) : null}
                    {brok.alternativeBrokerName ? (
                      <h3>{brok.alternativeBrokerName}</h3>
                    ) : (
                      <h3>{brok.broker.title}</h3>
                    )}
                  </Link>
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      ) : null}
    </aside>
  )
}
