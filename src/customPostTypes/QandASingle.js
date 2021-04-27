import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import SideBarComplaints from '../components/SideBarComplaints'


export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            qa(id: $id){
                content
                title
                uri
                status

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

                postmeta {
                    resolved
                }

                seo {
                    metaDesc
                    title
                    opengraphType
                }

            }

        }
    }
`

export default function QandASingle({ data }) {
    const { qa } = data.wpgraphql

    const TopContent = () => {
        return (
            <div class="top-content-wrap find-page">
                <div class="row top-content fraud-top">
                    <div class="small-12 columns">
                        <div class="crumbs">
                            <Link to={'/'}>Home page</Link> -&gt;
                    <Link to={'/answers'}>Complains</Link> -&gt;
                    <span> {qa.title} </span>
                        </div>
                        <article>
                            <h3 class="page_title">
                                <img src='https://meek-hint.flywheelsites.com/wp-content/uploads/2019/03/fraud.svg' alt="Title" />
                             Having trouble with a Brokers? <strong>We’re here to help!</strong>
                            </h3>
                            <div class="dot-sep">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }

    const MainColumn = () => {
        return (
            <div class="large-9 medium-8 columns">
                <div class="cma-comp-list-wrap">
                    {qa.status !== 'publish' ? <div class="msg-notification"><h6>Your complaint has been submited. Your message is being held for moderation and will be published when gets approval.</h6></div> : null}
                    <div class="msg-title">
                        <h1>{qa.title}</h1>
                        <span class={`comp-stat ${qa.postmeta.resolved}`}>{qa.postmeta.resolved}</span>
                    </div>
                    <div class="msg-wrap">

                    </div>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title={qa.seo.title}
                meta={[
                    { name: "description", content: qa.seo.metaDesc },
                    { property: "og:type", content: qa.seo.opengraphType },
                    { property: "og:title", content: qa.seo.title },
                    { property: "og:description", content: qa.seo.metaDesc },
                ]}
            />
            <TopContent />
            <div class="row cma-wrap">
                <MainColumn />
                <div class="large-3 medium-4 columns sidebar">
                    <SideBarComplaints complainInfo={qa.cptQuestion} />
                </div>
            </div>

        </Layout>
    )
}
