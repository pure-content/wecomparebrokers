import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import PageTopContent from "../components/PageTopContent"
import withLocation from "../hoc/withLocation"
import Pagination from "../components/Pagination"
const shortid = require("shortid")

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
        tmplBrokerHealth {
          bottomText
          introTextHealth
        }
        allPagesFields {
          alternativeTitle
          pageIcon {
            mediaItemUrl
          }
          videoPage
        }
      }

      brokers123(first: 10000) {
        nodes {
          title
          uri
          id
          content
          excerpt
          cptBrokers {
            brokerHealth
            affiliateLink
            brokerLink
          }
          featuredImage {
            node {
              mediaItemUrl
              sizes(size: BROKERS_REW_THUMB_NEW)
            }
          }
          
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

function BrokerHealthTemplate({ data, search }) {
  const page = data.wpgraphql.page
  const template = page.tmplBrokerHealth
  const brokers = data.wpgraphql.brokers123.nodes
  const generalSettings = data.wpgraphql.themeGeneralSettings.optGeneralSettings
  const name = search['broker-name'] ? search['broker-name'] : ''
  const good = search.good ? search.good : ''
  const banned = search.banned ? search.banned : ''

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)

  useEffect(() => {
    console.log(currentPage)
    $('.broker-col').matchHeight()
  }, [currentPage])
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentBrokers = brokers.slice(indexOfFirstPost, indexOfLastPost)

  const HealthFilter = () => {

    return (
      <div class="row">
        <div class="small-12 columns">
          <div class="filter-wrap health-filter">
            <h3>Search <strong>Here</strong></h3>
            <form id="health-form" action={page.uri} method="get">
              <div class="inp-wrap">
                <input id="broker-name" name="broker-name" type="text" value={name ? name : null} placeholder="Company name here..." autoComplete="off" />
                <div class="inp-popup">
                </div>
              </div>
              <div class="check-wrap">
                <label><input id="good" name="good" type="checkbox" value="good" />Show only good brokers<span></span></label>
                <label><input id="banned" name="banned" type="checkbox" value="banned" />Show brokers with warnings<span></span></label>
              </div>
              <button id="form-submit" class="btn blue" type="submit">Check Broker Health</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const alphabetArr = [...Array(26)].map((_, y) => String.fromCharCode(y + 65))
  const AlphabetFilter = () => {
    return (
      <div class="row">
        <div class="small-12 columns">
          <div class="filter-wrap alph-filter">
            <ul class="alph-pag">
              {alphabetArr.map((letter) => {
                return <li key={shortid.generate()}><Link to={`${page.uri}/?char=${letter}`}>{letter}</Link></li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const BrokerTableItem = (props) => {
    const { brok } = props
    const bg = brok.cptBrokers.brokerHealth === 'good' ? 'green' : 'red'
    return (
      <div class="row collapse broker-wrap health-wrap">
        <div class="large-2 medium-4 columns img-col broker-col">
          <div class='thumb-wrap'>
            {brok.featuredImage ? <img src={brok.featuredImage.node.mediaItemUrl} /> : <img class="img-list-default" src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
          </div>
        </div>
        <div class="large-4 medium-8 columns broker-content broker-col">
          <h3>{brok.title}</h3>
          {brok.cptBrokers.affiliateLink ? <a href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored"><span>{brok.cptBrokers.brokerLink}</span></a> : null}
          {Parser(brok.excerpt ? brok.excerpt : '')}
        </div>
        <div class="large-6 medium-12 columns health-btns broker-col">
          {brok.cptBrokers.brokerHealth === 'banned' ? <Link class="btn small warning" to={brok.uri}>Warning</Link> : null}
          {brok.cptBrokers.affiliateLink ? (
            <a class="btn small" href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{generalSettings.takeMeToBrokerButtonAlternativeText ? generalSettings.takeMeToBrokerButtonAlternativeText : 'Take Me To Broker'}</a>
          ) : null}

          <Link class="btn small" to={brok.uri}>{generalSettings.readFullReviewButtonAlternativeText ? generalSettings.readFullReviewButtonAlternativeText : 'Read Full Review'}</Link>

        </div>
      </div>
    )
  }

  const pageInfo = {
    isFrontPage: page.isFrontPage,
    contentType: page.contentType,
    title: page.title,
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
      <CompareFrom />
      <PageTopContent page={page} template={template} />
      <HealthFilter />
      <AlphabetFilter />
      <div class="row brokers-list plarform-list">
        <div class="small-12 columns">
          {currentBrokers.map((brok) => {
            return <BrokerTableItem brok={brok} />
          })}
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={brokers.length} />
        </div>
      </div>
      {template.bottomText ? (
        <div class="row bot-text bot-text-health">
          <div class="small-12 columns">
            {Parser(template.bottomText ? template.bottomText : '')}
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export default withLocation(BrokerHealthTemplate)