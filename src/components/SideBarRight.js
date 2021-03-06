import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
const shortid = require("shortid")

export default function SideBarRight() {
  const sidebarInfo = useStaticQuery(graphql`
    query {
      wpgraphql {
        acfOptionsBlogSidebar {
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

  const { topNewsList } =
    sidebarInfo.wpgraphql.acfOptionsBlogSidebar.optBlogSidebar
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
              <Link
                key={shortid.generate()}
                to={post.uri}
                class="top-itm"
                style={{
                  backgroundImage: `url(${post.featuredImage.node.mediaItemUrl})`,
                }}
              >
                <span class="num">{i}</span>
                <span class="cover"></span>
                <h6>{post.title}</h6>
                <span class="date">{post.date.split("T")[0]}</span>
              </Link>
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
            <li key={shortid.generate()}>
              <Link to={post.uri} class="sidebar-post">
                <span class="date">{post.date.split("T")[0]}</span>
                <h6>{post.title}</h6>
              </Link>
            </li>
          ))}
        </ul>
        <Link class="btn small transparent" to={"/forex-market-news"}>
          Show All Popular News
        </Link>
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
            <li key={shortid.generate()}>
              <Link to={post.uri} class="sidebar-post">
                <span class="date">{post.date.split("T")[0]}</span>
                <h6>{post.title}</h6>
              </Link>
            </li>
          ))}
        </ul>
        <Link class="btn small transparent" to={"/forex-market-news"}>
          Show All Latest News
        </Link>
      </aside>
    </>
  )
}
