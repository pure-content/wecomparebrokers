import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default function SideBarComplaints({ complainInfo }) {
  const sidebarInfo = useStaticQuery(graphql`
    query {
      wpgraphql {
        page(id: "cG9zdDoxMjY=") {
          tmplComplaintsArchivePage {
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
    sidebarInfo.wpgraphql.page.tmplComplaintsArchivePage || {}

  return (
    <>
      {complainInfo ? (
        <aside class="widget comp-information">
          <h3>Complaint Info</h3>
          <div class="dot-sep">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {complainInfo.assignedBroker ? (
            <div class="broker-data comp-info-wrap">
              <h6>Disputed casino</h6>
              <p>{complainInfo.assignedBroker.title}</p>
            </div>
          ) : null}
          {complainInfo.assignedBroker ? (
            <div class="reason-data comp-info-wrap">
              <h6>Reason</h6>
              <p>{complainInfo.complaintReason}</p>
            </div>
          ) : null}
        </aside>
      ) : null}

      <aside class="widget popular-brok-widget">
        <h3>Most popular brokers</h3>
        <div class="dot-sep">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {sidebarPopularBrokersList ? (
          <ul>
            {sidebarPopularBrokersList.map(brok => (
              <li>
                <Link to={brok.broker.uri}>
                  {brok.broker.featuredImage ? (
                    <span class="logo-wrap">
                      <img src={brok.broker.featuredImage.node.mediaItemUrl} />
                    </span>
                  ) : null}
                  {brok.alternativeBrokerName ? (
                    <h3>{brok.alternativeBrokerName}</h3>
                  ) : (
                    <h3>{brok.broker.title}</h3>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </>
  )
}
