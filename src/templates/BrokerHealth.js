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
  const char = search.char ? search.char : ''

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)

  useEffect(() => {
    $('.broker-col').matchHeight()
  })
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const brokerSorter = () => {
    if (name) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.title.toLowerCase().includes(name.toLowerCase())) {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (name && good) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.title.toLowerCase().includes(name.toLowerCase()) && eachBroker.cptBrokers.brokerHealth === 'good') {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (name && banned) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.title.toLowerCase().includes(name.toLowerCase()) && eachBroker.cptBrokers.brokerHealth === 'banned') {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (good) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.cptBrokers.brokerHealth === 'good') {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (banned) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.cptBrokers.brokerHealth === 'banned') {
          return eachBroker
        }
      })
      return sortedBrokers
    } else if (char) {
      const sortedBrokers = brokers.filter(eachBroker => {
        if (eachBroker.title.toLowerCase().split('')[0] === char.toLowerCase()) {
          return eachBroker
        }
      })
      return sortedBrokers
    }
    else {
      const sortedBrokers = brokers
      return sortedBrokers
    }
  }
  const currentBrokers = brokerSorter().slice(indexOfFirstPost, indexOfLastPost)

  const HealthFilter = () => {

    return (
      <div className="row">
        <div className="small-12 columns">
          <div className="filter-wrap health-filter">
            <h3>Search <strong>Here</strong></h3>
            <form id="health-form" action={page.uri} method="get">
              <div className="inp-wrap">
                <input id="broker-name" name="broker-name" type="text" value={name ? name : null} placeholder="Company name here..." autoComplete="off" />
                <div className="inp-popup">
                </div>
              </div>
              <div className="check-wrap">
                <label><input id="good" name="good" type="checkbox" value="good" />Show only good brokers<span></span></label>
                <label><input id="banned" name="banned" type="checkbox" value="banned" />Show brokers with warnings<span></span></label>
              </div>
              <button id="form-submit" className="btn blue" type="submit">Check Broker Health</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const alphabetArr = [...Array(26)].map((_, y) => String.fromCharCode(y + 65))
  const AlphabetFilter = () => {
    return (
      <div className="row">
        <div className="small-12 columns">
          <div className="filter-wrap alph-filter">
            <ul className="alph-pag">
              {alphabetArr.map((letter) => {
                return <li key={shortid.generate()}><Link to={`${page.uri}?char=${letter}`}>{letter}</Link></li>
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
      <div className="row collapse broker-wrap health-wrap">
        <div className="large-2 medium-4 columns img-col broker-col">
          <div className='thumb-wrap'>
            {brok.featuredImage ? <img onLoad={() => $('.broker-col').matchHeight()} src={brok.featuredImage.node.mediaItemUrl} /> : <img className="img-list-default" src="https://www.wecomparebrokers.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" />}
          </div>
        </div>
        <div className="large-4 medium-8 columns broker-content broker-col">
          <h3>{brok.title}</h3>
          {brok.cptBrokers.affiliateLink ? <a href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored"><span>{brok.cptBrokers.brokerLink}</span></a> : null}
          {Parser(brok.excerpt ? brok.excerpt : '')}
        </div>
        <div className="large-6 medium-12 columns health-btns broker-col">
          {brok.cptBrokers.brokerHealth === 'banned' ? <Link className="btn small warning" to={brok.uri}>Warning</Link> : null}
          {brok.cptBrokers.affiliateLink ? (
            <a className="btn small" href={brok.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored">{generalSettings.takeMeToBrokerButtonAlternativeText ? generalSettings.takeMeToBrokerButtonAlternativeText : 'Take Me To Broker'}</a>
          ) : null}

          <Link className="btn small" to={brok.uri}>{generalSettings.readFullReviewButtonAlternativeText ? generalSettings.readFullReviewButtonAlternativeText : 'Read Full Review'}</Link>

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
      <div className="row brokers-list plarform-list">
        <div className="small-12 columns">
          {currentBrokers.map((brok) => {
            return <BrokerTableItem brok={brok} />
          })}
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={brokerSorter().length} noNumbers={brokerSorter().length <= 6 ? true : false} />
        </div>
      </div>
      {template.bottomText ? (
        <div className="row bot-text bot-text-health">
          <div className="small-12 columns">
            {Parser(template.bottomText ? template.bottomText : '')}
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export default withLocation(BrokerHealthTemplate)