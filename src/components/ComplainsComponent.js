import React, { useEffect } from "react"
import $ from "jquery"
import { Link, useStaticQuery, graphql } from "gatsby"
import Parser from "html-react-parser"
import "jquery-match-height"

//cG9zdDoxMjY=

export default function ComplainsComponent() {
    const complainsInfo = useStaticQuery(graphql`
        query {
            wpgraphql{
                page(id: "cG9zdDoxMjY="){
                    pageBrokerFraudComplaints {
                        textIntro
                        pointsList {
                        text
                        icone {
                            mediaItemUrl
                        }
                        }
                        bottomText
                    }
                }

                qas(first: 1000) {
                    nodes {
                    content
                    title
                    uri
                    cptQuestion {
                        accountName
                        complaintReason
                        userEmail
                    }
                    postmeta {
                        resolved
                    }
                    }
                }
            }
        }
    `)
    const page = complainsInfo.wpgraphql.page
    const qas = complainsInfo.wpgraphql.qas.nodes


    useEffect(() => {
        $('.comp-col-link').matchHeight()
    })

    return (
        <div class="row cma-comp-list">
            <div class="small-12 columns intro-content">
                {Parser(page.pageBrokerFraudComplaints.textIntro ? page.pageBrokerFraudComplaints.textIntro : '')}
            </div>
            {page.pageBrokerFraudComplaints.pointsList ? (
                <div class="small-12 columns points-list-wrap">
                    {page.pageBrokerFraudComplaints.pointsList.map((pointsItem) => (
                        <div class="item-wrap">
                            <div class="ico-wrap"><img src={pointsItem.icone.mediaItemUrl} alt="Icon" /></div>
                            <div class="text-wrap"><p>{pointsItem.text}</p></div>
                        </div>
                    ))}
                </div>
            ) : null}
            <div class="small-12 columns text-center add-new-comp">
                <Link to={"/complaints-form/"} class="btn blue">SUBMIT MY COMPLAINT</Link>
            </div>
            {complainsInfo.wpgraphql.qas ? (
                qas.map((qa) => (
                    <div class={`large-3 medium-6 columns comp-col ${qa.postmeta.resolved}`}>
                        <Link class='comp-col-link' to={qa.uri}>
                            <div class="comp-top text-center">
                                {qa.postmeta.resolved === 'resolved' ? (
                                    <>
                                        <img onLoad={() => $('.comp-col-link').matchHeight()} src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/comp-res.svg" alt="Resolved" />
                                        <p>resolved</p>
                                    </>
                                ) : (
                                        <>
                                            <img src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/comp-unres.svg" alt="Resolved" />
                                            <p>unresolved</p>
                                        </>
                                    )}
                            </div>
                            <div class="comp-bot">
                                <h3>{qa.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))
            ) : <h5 class="text-center">There is no complaints yet.</h5>}
        </div>
    )
}
