import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import RecommendedBroker from "../components/RecommendedBroker"
import BrokerTableSingleItem from "../components/BrokerTableSingleItem"
import { brokerRegions } from "../data/brokerRegions"
import { brokerTypes } from "../data/brokerTypes"
import withLocation from "../hoc/withLocation"
import PageTopContent from "../components/PageTopContent"
import Pagination from "../components/Pagination"
const shortid = require("shortid")

export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            comparison123(id: $id) {
                title
                content
                id
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
            }

            comparisons123(first: 10000) {
                nodes {
                  title
                  uri
                }
            }
        }
    }
`

export default function CompareSingle() {
    return (
        <div>

        </div>
    )
}
