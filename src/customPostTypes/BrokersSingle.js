import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
const shortid = require("shortid")

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      broker123(id: $id) {
        title
        uri
        contentType {
          node {
            name
          }
        }
      }
    }
  }
`

export default function BrokersSingle({ data }) {
  return (
    <Layout contentType={data.wpgraphql.broker123.contentType}>
      <h1>{data.wpgraphql.broker123.title}</h1>
    </Layout>
  )
}
