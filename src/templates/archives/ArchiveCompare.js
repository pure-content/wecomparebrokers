import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../../components/CompareFrom"
import RecommendedBroker from "../../components/RecommendedBroker"
import BrokerTableSingleItem from "../../components/BrokerTableSingleItem"
import { brokerRegions } from "../../data/brokerRegions"
import { brokerTypes } from "../../data/brokerTypes"
import withLocation from "../../hoc/withLocation"
import PageTopContent from "../../components/PageTopContent"
import Pagination from "../../components/Pagination"
const shortid = require("shortid")

export default function ArchiveCompare() {

    const comparisonsInfo = useStaticQuery(graphql`
    query {
        wpgraphql {
            comparisons123(first: 10000) {
                nodes {
                  title
                  uri
                  id
                }
            }
            comparisonArchiveData {
                title
            }
        }
    }
    `)

    const comparisons123 = comparisonsInfo.wpgraphql.comparisons123.nodes
    console.log(comparisons123)

    return (
        <Layout >
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title='Comparison Archive | We Compare Brokers'
                meta={[
                    { name: "description", content: '' },
                    { property: "og:type", content: '' },
                ]}
            />
            <div class="top-content-compare">
                <div class="row top-content">
                    <div class="small-12 columns" data-mh="top-content-col">
                        <div class="crumbs">
                            <a href="<?php echo get_home_url(); ?>">Home page</a> -&gt;
                        </div>
                        <article>
                            <h1 class="page_title"></h1>
                            <div class="dot-sep">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="row">
                    <div class="small-12 columns">
                        <div class="authors-row"></div>
                        <ul class="comparison-list">
                            {comparisons123 ? (
                                comparisons123.map(post => (
                                    <li key={post.id} class='compare-itm' ><Link to={post.uri}>{post.title}</Link></li>
                                ))
                            ) : null}
                        </ul>
                        <div class="comparison-list__pagination"></div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
