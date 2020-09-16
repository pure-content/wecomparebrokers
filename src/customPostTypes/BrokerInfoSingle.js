import React, { useEffect, useState, useRef } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"

export const query = graphql`
    query($id: ID!) {
        wpgraphql {
            article123(id: $id){
                title
                uri
                id
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

                featuredImage {
                    node {
                        mediaItemUrl
                        sizes(size: CRYPTO_LATEST_THUMB)
                        srcSet(size: CRYPTO_LATEST_THUMB)
                    }
                }
            }

            wpusb {
                wpusb
            }
        }
    }
`

export default function BrokerInfoSingle({ data }) {

    const { article123, wpusb } = data.wpgraphql
    const seo = article123.seo
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
            <div class="blog-tmpl-wrap crypto-blog">
                <div class="row top-content top-single-post">
                    <div class="small-12 columns">
                        <div class="crumbs">
                            <Link to={'/'}>Home page</Link> -&gt;
                            <span>{article123.title}</span>
                        </div>
                    </div>
                </div>

                <div class="row blog-content-row">
                    <div class="small-12 columns blog-post">
                        <article>
                            {article123.featuredImage ? <div class="single-crypto-bg-wrap" style={{ backgroundImage: `url(${article123.featuredImage.node.mediaItemUrl})` }}></div> : null}
                            <div class="post-meta">
                                <div class="social-share">
                                    {Parser(wpusb.wpusb ? wpusb.wpusb : '')}
                                </div>
                            </div>
                            <h1 class="page_title">
                                <div class="dot-sep">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="title-text">
                                    <span class="title">
                                        {article123.title}
                                    </span>
                                </div>
                            </h1>
                            {Parser(article123.content ? article123.content : '')}
                        </article>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
