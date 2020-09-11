import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
const shortid = require('shortid');

export default function SideBarRight() {
    const sidebarInfo = useStaticQuery(graphql`
        query {
            wpgraphql {
                themeSidebarSettings {
                    optBlogSidebar {
                      topNewsList {
                        ... on WPGraphQL_Post {
                          id
                          featuredImage {
                            node {
                              mediaItemUrl
                            }
                          }
                          uri
                          title
                          date
                        }
                      }
                    }
                }
                posts(first: 8) {
                    nodes {
                        uri
                        title
                        date
                    }
                }
            }
        }
    `)

    const { topNewsList } = sidebarInfo.wpgraphql.themeSidebarSettings.optBlogSidebar
    const posts = sidebarInfo.wpgraphql.posts.nodes

    return (
        <>
            {topNewsList ? (
                <aside class="widget top-news-widget">
                    <h3>TOP news</h3>
                    <div class="dot-sep">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="top-list">
                        {topNewsList.map((post, i) => (
                            <a key={shortid.generate()} href={post.uri} class="top-itm" style={{ backgroundImage: `url(${post.featuredImage.node.mediaItemUrl})` }}>
                                <span class="num">{i}</span>
                                <span class="cover"></span>
                                <h6>{post.title}</h6>
                                <span class="date">{post.date.split('T')[0]}</span>
                            </a>
                        ))}
                    </div>
                </aside>
            ) : null}

            <aside class="widget popular-news-widget">
                <h3>Popular views</h3>
                <div class="dot-sep">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="post-list">
                    {posts.map(post => (
                        <li key={shortid.generate()}><a href={post.uri} class="sidebar-post">
                            <span class="date">{post.date.split('T')[0]}</span>
                            <h6>{post.title}</h6>
                        </a></li>
                    ))}
                </ul>
                <a class="btn small transparent" href={'/forex-market-news'}>Show All Popular News</a>
            </aside>

            <aside class="widget latest-news-widget">
                <h3>Latest news</h3>
                <div class="dot-sep">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="post-list">
                    {posts.map(post => (
                        <li key={shortid.generate()}><a href={post.uri} class="sidebar-post">
                            <span class="date">{post.date.split('T')[0]}</span>
                            <h6>{post.title}</h6>
                        </a></li>
                    ))}
                </ul>
                <a class="btn small transparent" href={'/forex-market-news'}>Show All Latest News</a>
            </aside>
        </>
    )
}
