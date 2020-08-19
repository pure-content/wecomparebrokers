import React from "react"
import $ from "jquery"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"

export default function BrokerList() {
  const brokers = useStaticQuery(graphql`
    query {
      wpgraphql {
        brokers123(first: 10000) {
          nodes {
            title
            uri
            id
          }
        }
      }
    }
  `)
  return (
    <div>
      {brokers.wpgraphql.brokers123.nodes.map(brok => {
        return (
          <h1>
            <Link to={brok.uri}>{brok.title}</Link>
          </h1>
        )
      })}
    </div>
  )
}
