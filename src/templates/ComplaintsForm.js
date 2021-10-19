import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import SideBarComplaints from "../components/SideBarComplaints"
const shortid = require("shortid")

export const query = graphql`
  query ($id: ID!) {
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

      acfOptionsComplaintsSettings {
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

      brokers123(first: 10000) {
        nodes {
          title
          uri
          id
          databaseId
        }
      }
    }
  }
`

export default function ComplaintsFormTemplate({ data }) {
  const page = data.wpgraphql.page
  const brokers123 = data.wpgraphql.brokers123.nodes
  const { optListCopy } =
    data.wpgraphql.acfOptionsComplaintsSettings.optComplaintsSettings || {}

  useEffect(() => {
    $("#thread_broker").select2({
      placeholder: "Select a broker",
    })

    $('input[name="comp_cat"]').click(function () {
      var opt = $(this).val(),
        optText = $(this).next().html()

      $(".option-descr").slideUp()
      $(".options-text-wrap #" + opt).slideDown()
      $(".helpful-radio").show(500)
      $("#comp-cat").val(optText)
    })

    $(".complaint-radio .complaint-radio__item input").click(function () {
      var radioChecked = $(this).attr("id")
      if (radioChecked == "helpful_yes") {
        $(".cma-form-container").hide(500)
        $(".thank-you-wrapper").show(500)
      } else {
        $(".thank-you-wrapper").hide(500)
        $(".cma-form-container").show(500)
      }
    })

    $("#cma-thread-add").submit(function (e) {
      e.preventDefault()
      window.location = page.uri
      $.ajax({
        url: "https://meek-hint.flywheelsites.com/wp-admin/admin-post.php",
        type: "post",
        xhrFields: {
          withCredentials: true,
        },
        data: $("#cma-thread-add").serialize(),
        success: function () {
          window.location = page.uri
        },
      })
    })
  })

  const TopContent = () => {
    return (
      <div class="top-content-wrap find-page">
        <div class="row top-content fraud-top">
          <div class="small-12 columns">
            <div class="crumbs">
              <Link to={"/"}>Home page</Link> -&gt;
              <span>{page.title}</span>
            </div>
            <article>
              <h1 class="page_title">
                {page.allPagesFields.pageIcon ? (
                  <img
                    src={page.allPagesFields.pageIcon.mediaItemUrl}
                    alt="Title"
                  />
                ) : null}
                {page.allPagesFields.alternativeTitle
                  ? Parser(
                      page.allPagesFields.alternativeTitle
                        ? page.allPagesFields.alternativeTitle
                        : ""
                    )
                  : page.title}
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
    let optgr_count = 0
    let opt_count = 0
    let opt_num = 0
    optListCopy.forEach(opt => (opt.type === "optgroup" ? opt_num++ : opt_num))

    const ListWrapsView = () => {
      let view = '<div class="list-wrap">'
      optListCopy.forEach(opt => {
        if (opt.type === "optgroup") {
          optgr_count++
          if (opt_count != 0 && opt_num != optgr_count) {
            view += '</div><div class="list-wrap">'
          }
          view += `<h5><img src=${opt.icon.mediaItemUrl} >${opt.option}</h5>`
        } else {
          view += `<div class="complaint-radio__item"><input type="radio" name="comp_cat" id=${opt.value} value=${opt.value} /><label for=${opt.value}>${opt.option}</label></div>`
        }
        opt_count++
      })
      return Parser(view)
    }

    return (
      <div class="cma-comp-list-wrap form">
        {optListCopy ? (
          <>
            <h2>SELECT AN OPTION THAT BEST DESCRIBES THE ISSUE</h2>
            {Parser(page.content ? page.content : "")}

            <div class="opt-wrap">
              <ListWrapsView />
            </div>
          </>
        ) : null}

        {optListCopy ? (
          <div class="options-text-wrap">
            {optListCopy.map(opt => {
              if (opt.type === "option") {
                return (
                  <div id={opt.value} class="option-descr">
                    {Parser(
                      opt.optionDescriptionText ? opt.optionDescriptionText : ""
                    )}
                  </div>
                )
              }
            })}
          </div>
        ) : null}

        <div class="helpful-radio">
          <h4>Was this helpful?</h4>
          <div class="complaint-radio">
            <div class="complaint-radio__item">
              <input
                type="radio"
                name="complaint-radio-choice"
                id="helpful_yes"
              />
              <label for="helpful_yes">
                Yes. I understand how to resolve my issue.
              </label>
            </div>
            <div class="complaint-radio__item">
              <input
                type="radio"
                name="complaint-radio-choice"
                id="helpful_no"
              />
              <label for="helpful_no">No. I want to submit a complaint.</label>
            </div>
          </div>
        </div>

        <div class="thank-you-wrapper">
          <img
            src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/comp-res.svg"
            alt="Resolved"
          />
          <h6>We're glad we could be of help.</h6>
          <p>
            Thank you for following the suggested steps to resolve your issue!
          </p>
        </div>

        <div class="cma-form-container">
          <form
            action="https://meek-hint.flywheelsites.com/wp-admin/admin-post.php"
            method="post"
            class="cma-thread-add"
            id="cma-thread-add"
          >
            <input type="hidden" name="action" value="add_complaint" />
            <input id="comp-cat" type="hidden" name="comp_cat" value="" />
            <input
              type="hidden"
              name="nonce"
              value="<?php echo esc_attr(wp_create_nonce('cma_question')); ?>"
            />
            <h4>Fill in the complaint submission form</h4>
            <ul>
              <li>Be descriptive</li>
              <li>Provide proof to support your claim</li>
              <li>Play fair</li>
              <li>Using false or fake evidence is against the law</li>
              <li>Don’t use caps lock</li>
            </ul>
            <div id="summary"></div>

            <input
              class="inp-half inp-left"
              type="text"
              name="thread_title"
              placeholder="Complaint title"
            />
            <select name="thread_broker" id="thread_broker">
              <option></option>
              {brokers123.map(brok => {
                return (
                  <option
                    key={shortid.generate()}
                    id={brok.id}
                    value={brok.databaseId}
                  >
                    {brok.title}
                  </option>
                )
              })}
            </select>
            <textarea
              name="thread_comment"
              cols="50"
              rows="3"
              placeholder="What is your complaint about?"
            ></textarea>
            <h4>
              The following information will not be published and will be used
              to correspond with you and the broker on your behalf.
            </h4>
            <input
              class="inp-half inp-left"
              type="text"
              name="thread_user_nick"
              placeholder="Account name used at this broker site"
            />
            <input
              class="inp-half inp-right"
              type="text"
              name="thread_user_email"
              placeholder="Email used at this broker site"
            />
            <div class="clearfix"></div>
            <label class="notify-checkbox">
              <input name="thread_notify" type="checkbox" value="1" checked />
              Notify me of follow
            </label>

            <div id="g-recaptcha"></div>

            <div class="btn-wrap">
              <input
                id="comp-submit"
                class="btn"
                type="submit"
                value="SUBMIT MY COMPLAINT"
              />
            </div>
          </form>
          <script
            src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
            async
            defer
          ></script>
        </div>
      </div>
    )
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
    uri: page.uri,
  }
  const { seo } = page
  return (
    <Layout pageInfo={pageInfo}>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta name="og:type" content={seo.opengraphType} />
        <meta name="og:title" content={seo.title} />
        <meta name="og:description" content={seo.metaDesc} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            headline: page.title,
            url: `https://www.wecomparebrokers.com${page.uri}`,
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
                  "@id": `https://www.wecomparebrokers.com${page.uri}`,
                  name: page.title,
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <Helmet>
        <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
      </Helmet>
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
