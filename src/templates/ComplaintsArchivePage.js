import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import SideBarComplaints from "../components/SideBarComplaints"
import ComplainsComponent from "../components/ComplainsComponent"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        id
        isFrontPage
        uri
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

        allPagesFields {
          alternativeTitle
          pageIcon {
            mediaItemUrl
          }
          videoPage
        }

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

      themeGeneralSettings {
        optGeneralSettings {
          takeMeToBrokerButtonAlternativeText
          readFullReviewButtonAlternativeText
        }
      }

    }
  }
`

export default function ComplaintsArchivePageTemplate({ data }) {
  const page = data.wpgraphql.page

  useEffect(() => {
    // var onloadCallback = function () {
    //   grecaptcha.render('g-recaptcha', {
    //     'sitekey': '6LcWcJwUAAAAABbqKp2XNtC7zLs-cyVhYQzaMl-6'
    //   });
    // };
    $('.comp-col-link').matchHeight()
  })

  const TopContent = () => {
    return (
      <div class="top-content-wrap find-page">
        <div class="row top-content fraud-top">
          <div class="small-12 columns">
            <div class="crumbs">
              <Link to={'/'}>Home page</Link> -&gt;
                    <span>
                {page.title}
              </span>
            </div>
            <article>
              <h3 class="page_title">
                {page.allPagesFields.pageIcon ? <img src={page.allPagesFields.pageIcon.mediaItemUrl} alt="Title" /> : null}
                {page.allPagesFields.alternativeTitle ? Parser(page.allPagesFields.alternativeTitle ? page.allPagesFields.alternativeTitle : '') : page.title}
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
          <ComplainsComponent showList={true} />
          {page.pageBrokerFraudComplaints.bottomText ? (
            <div class="row bot-text">
              <div class="small-12 columns">
                {Parser(page.pageBrokerFraudComplaints.bottomText ? page.pageBrokerFraudComplaints.bottomText : '')}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
    uri: page.uri
  }

  return (
    <Layout pageInfo={pageInfo}>
      <Helmet
        htmlAttributes={{ lang: "en", amp: undefined }}
        title={page.seo.title}
        meta={[
          { name: "description", content: page.seo.metaDesc },
          { property: "og:type", content: page.seo.opengraphType },
        ]}
      />
      <TopContent />
      <div class="row cma-wrap">
        <MainColumn />
        <div class="large-3 medium-4 columns sidebar">
          <SideBarComplaints />
        </div>
      </div>
    </Layout>
  )
}
