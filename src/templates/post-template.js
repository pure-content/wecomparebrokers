import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import Parser from "html-react-parser"
import Layout from "../components/layout"
import SideBarRight from '../components/SideBarRight'

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        id
        uri
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            mediaItemUrl
            sizes(size: BLOG_SINGLE_THUMB)
            srcSet(size: BLOG_SINGLE_THUMB)
          }
        }
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
      }

      wpusb {
        wpusb
      }

    }
  }
`

const PostTemplate = ({ data }) => {
  const post = data.wpgraphql.post
  const wpusb = data.wpgraphql.wpusb.wpusb

  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={post.seo.title}
        meta={[
          { name: "description", content: post.seo.metaDesc },
          { property: "og:type", content: post.seo.opengraphType },
        ]}
      />
      <div class="blog-tmpl-wrap">
        <div class="row top-content top-single-post">
          <div class="small-12 columns">
            <div class="crumbs">
              <Link to={'/'}>Home page</Link> {Parser('->')}
              <Link to={'/broker-news'}>Latest<strong>Broker <strong>News</strong></strong></Link> {Parser('->')}
              <span>{post.title}</span>
            </div>
            <article>
              <h1 class="page_title">

                <img src="https://meek-hint.flywheelsites.com/wp-content/uploads/2019/02/blog.svg" alt="Title" />
                <div class="title-text">
                  <span class="title">
                    {post.title}
                  </span>
                </div>
              </h1>
              <div class="post-meta">
                <span class="author">By {post.author.node.name}</span>
                <span class="date">{post.date.split('T')[0].split('-').join('.')}</span>
              </div>

              <div class="dot-sep">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </article>
          </div>
        </div>

        <div class="row blog-content-row">
          <div class="large-8 medium-8 small-12 columns blog-post">
            <article>
              {post.featuredImage ? <img className='attachment-blog-single-thumb size-blog-single-thumb wp-post-image lazyloaded' src={post.featuredImage.node.mediaItemUrl} sizes={post.featuredImage.node.sizes} srcSet={post.featuredImage.node.srcSet} /> : null}
              <div class="post-meta">
                <div class="social-share">
                  {Parser(wpusb ? wpusb : '')}
                </div>
              </div>
              {Parser(post.content ? post.content : '')}
            </article>
          </div>
          <div class="large-4 medium-4 small-12 columns sidebar">
            <SideBarRight />
          </div>
        </div>
      </div>


    </Layout>
  )
}

export default PostTemplate
