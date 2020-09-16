import React, { useEffect, useState, useRef } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

export default function ArchiveBrokerInfo() {

    const brokerInfo = useStaticQuery(graphql`
    query {
        wpgraphql {
            brokerInfo123(first: 1000) {
                nodes {
                    title
                    uri
                }
            }
        }
    }
    `)

    const brokersInfo = brokerInfo.wpgraphql.brokerInfo123.nodes

    return (
        <Layout>
            <div className='row'>
                <div className='column large-12'>
                    {brokersInfo.map(brok => (
                        <Link to={brok.uri}><h2>{brok.title}</h2></Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
