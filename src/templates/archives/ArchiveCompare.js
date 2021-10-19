import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

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

  return (
    <Layout>
      <Helmet>
        <title>Comparison Archive | We Compare Brokers</title>
        <meta name="description" content="" />
        <meta name="og:type" content="" />
        <meta
          name="og:title"
          content="Comparison Archive | We Compare Brokers"
        />
        <meta name="og:description" content="" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            headline: "Comparison Archive",
            url: `https://www.wecomparebrokers.com/compare`,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://www.wecomparebrokers.com/",
                  url: "https://www.wecomparebrokers.com",
                  name: "Home Page",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `https://www.wecomparebrokers.com/compare`,
                  name: "Comparison Archive",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div class="top-content-compare">
        <div class="row top-content">
          <div class="small-12 columns" data-mh="top-content-col">
            <div class="crumbs">
              <Link to={"/"}>Home page</Link> -&gt;
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
              {comparisons123
                ? comparisons123.map(post => (
                    <li key={post.id} class="compare-itm">
                      <Link to={post.uri}>{post.title}</Link>
                    </li>
                  ))
                : null}
            </ul>
            <div class="comparison-list__pagination"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
