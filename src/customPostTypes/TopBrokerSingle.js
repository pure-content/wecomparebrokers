import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import { avarageRatingCounter } from '../functions/avarageRatingCounter'
const shortid = require("shortid")

export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            topBroker123(id: $id) {
                title
                uri
                content
                
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

                cptPpcPages {
                    pageCurrency
                    imageOrientation
                    bottomTextBody
                    additionalText
                    bottomTextImage {
                        mediaItemUrl
                    }
                    brokersList {
                        buttonLink
                        buttonText
                        broker {
                        ... on WPGraphQL_Broker123 {
                            id
                            title
                            uri
                            cptBrokers {
                                specialOffer
                                ourScore
                                allSpreadsPoints
                                minDeposit
                                platformsList
                                accountsList
                                spreadsList
                                methodsList
                            }
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    sizes(size: BROKERS_REW_THUMB_NEW)
                                    srcSet(size: BROKERS_REW_THUMB_NEW)
                                }
                            }
                        }
                        }
                    }
                    optionalBrokersList {
                        buttonLinkOpt
                        buttonTextOpt
                        brokerOpt {
                        ... on WPGraphQL_Broker123 {
                            id
                            title
                            uri
                            cptBrokers {
                                specialOffer
                                ourScore
                                allSpreadsPoints
                                minDeposit
                                platformsList
                                accountsList
                                spreadsList
                                methodsList
                            }
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    sizes(size: BROKERS_REW_THUMB_NEW)
                                    srcSet(size: BROKERS_REW_THUMB_NEW)
                                }
                            }
                        }
                        }
                    }
                }
            }
        }
    }
`

export default function TopBrokerSingle({ data }) {
    const { topBroker123 } = data.wpgraphql
    const seo = topBroker123.seo
    console.log(topBroker123)
    return (
        <Layout>
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title={seo.title}
                meta={[
                    { name: "description", content: seo.metaDesc },
                    { property: "og:type", content: seo.opengraphType },
                ]}
            />

        </Layout>
    )
}
