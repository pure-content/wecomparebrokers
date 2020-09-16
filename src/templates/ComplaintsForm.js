import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import SideBarComplaints from "../components/SideBarComplaints"

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


      }

      complaintsSettings {
        optComplaintsSettings {
          optListCopy {
            value
            type
            optionDescriptionText
            option
            icon {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`

export default function ComplaintsFormTemplate({ data }) {
  const page = data.wpgraphql.page
  const { optListCopy } = data.wpgraphql.complaintsSettings.optComplaintsSettings
  console.log(optListCopy)

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
              <h1 class="page_title">
                {page.allPagesFields.pageIcon ? <img src={page.allPagesFields.pageIcon.mediaItemUrl} alt="Title" /> : null}
                {page.allPagesFields.alternativeTitle ? Parser(page.allPagesFields.alternativeTitle ? page.allPagesFields.alternativeTitle : '') : page.title}
              </h1>
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

  const FormContent = () => {
    let optgr_count = 0;
    let opt_count = 0;
    let opt_num = 0;
    optListCopy.forEach(opt => (
      opt.type === 'optgroup' ? opt_num++ : opt_num
    ))
    return (
      <div class="cma-comp-list-wrap form">
        {optListCopy ? (
          <>
            <h2>SELECT AN OPTION THAT BEST DESCRIBES THE ISSUE</h2>
            {Parser(page.content ? page.content : '')}

            <div class="opt-wrap">
              <div class="list-wrap">
                {optListCopy.map(opt => {
                  let res = ''
                  if (opt.type === 'optgroup') {
                    optgr_count++
                    if (opt_count != 0 && opt_num != optgr_count) {
                      res += '</div><div class="list-wrap">'
                    }
                    res += `<h5><img src=${opt.icon.mediaItemUrl} >${opt.option}</h5>`
                  } else {
                    res += `<div class="complaint-radio__item"><input type="radio" name="comp_cat" id="<?php echo $val; ?>" value="<?php echo $val; ?>" /><label for="<?php echo $val; ?>"><?php echo $opt; ?></label></div>`
                  }
                  opt_count++
                  return Parser(res)
                })}
              </div>
            </div>
          </>
        ) : null}
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
      <div class="blog-tmpl-wrap">
        <TopContent />
        <div class="row cma-wrap">
          <div class="large-9 medium-8 columns">
            <FormContent />
          </div>
          <div class="large-3 medium-4 columns sidebar">
            <SideBarComplaints />
          </div>
        </div>
      </div>
    </Layout>
  )
}
