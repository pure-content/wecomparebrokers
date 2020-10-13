import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import Parser from "html-react-parser"
import Helmet from "react-helmet"


export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            qa(id: $id){
                content
                title
                uri
                cptQuestion {
                    accountName
                    assignedBroker {
                    ... on WPGraphQL_Broker123 {
                        id
                        title
                        uri
                    }
                    }
                    complaintReason
                    userEmail
                }
            }
        }
    }
`

export default function QandASingle({ data }) {
    const { qa } = data.wpgraphql
    console.log(qa)
    return (
        <Layout>

        </Layout>
    )
}
