import React, { useEffect, useState } from 'react'
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import Pagination from '../../components/Pagination'

export default function ArchiveForexMarketNews() {
    const forexNews = useStaticQuery(graphql`
    query {
        wpgraphql {
            forexMarketNews123(first: 1000) {
                nodes {
                    title
                    uri
                    id
                    featuredImage {
                        node {
                          mediaItemUrl
                          sizes(size: CRYPTO_POST_THUMB)
                          srcSet(size: CRYPTO_POST_THUMB)
                        }
                    }
                    cptForexMarketNews {
                        forexMarketMainTextExerpt
                    }
                }
            }
            forexArchiveData {
                title
            }
        }
    }
    `)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)
    const news = forexNews.wpgraphql.forexMarketNews123.nodes

    useEffect(() => {

        $('.post-wrap').matchHeight()
    }, [currentPage])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentNews = news.slice(indexOfFirstPost, indexOfLastPost)



    const TopContent = () => {
        return (
            <div class="row top-content">
                <div class="small-12 columns">
                    <div class="crumbs">
                        <Link to={'/'}>Home page</Link> -&gt;
                        <span>{forexNews.wpgraphql.forexArchiveData.title}</span>
                    </div>
                </div>
                <div class="small-12 columns crypto-top-left">
                    <article>
                        <h1 class="page_title">{forexNews.wpgraphql.forexArchiveData.title}</h1>
                        <div class="dot-sep">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </article>
                </div>
            </div>
        )
    }

    const BlogContent = () => {
        return (
            <div class="row blog-content-row">
                <div class="small-12 columns blog-listing">
                    {news ? (
                        <>
                            <div class="row post-row">
                                {currentNews.map((article) => (
                                    <div class="medium-6 columns">
                                        <Link class="post-wrap" to={article.uri} >
                                            {article.featuredImage ? <img onLoad={() => $('.post-wrap').matchHeight()} src={article.featuredImage.node.mediaItemUrl} sizes={article.featuredImage.node.sizes} srcSet={article.featuredImage.node.srcSet} /> : null}
                                            <h4>{article.title}</h4>
                                            {article.cptForexMarketNews.forexMarketMainTextExerpt ? <p>{Parser(article.cptForexMarketNews.forexMarketMainTextExerpt ? article.cptForexMarketNews.forexMarketMainTextExerpt : '')} ...</p> : null}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={news.length} />
                        </>
                    ) : null}
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title='Forex Market News Archive | We Compare Brokers'
                meta={[
                    { name: "description", content: '' },
                    { property: "og:type", content: '' },
                    { property: "og:title", content: 'Forex Market News Archive | We Compare Brokers' },
                ]}
            />
            <section class="forex-market-news">
                <div class="blog-tmpl-wrap crypto-blog">
                    <TopContent />
                    <BlogContent />
                </div>
            </section>

        </Layout>
    )
}
