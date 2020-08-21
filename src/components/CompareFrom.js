import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default function CompareFrom() {
  const brokers = useStaticQuery(graphql`
    query {
      wpgraphql {
        brokers123(first: 10000) {
          nodes {
            title
            uri
            id
          }
        }
      }
    }
  `)

  return (
    <div id="compare-form-wrap">
      <div id="compare-form">
        <span className="close">
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
        <h4>Please select the second broker</h4>
        <form action="/compare-forex-brokers/" method="get">
          <input id="first-user" name="first-usr" type="hidden" value="" />

          <select id="popup-sec-usr" name="sec-usr">
            <option></option>
            {brokers.wpgraphql.brokers123.nodes.map(brok => {
              return (
                <option id={brok.id} value={JSON.stringify(brok)}>
                  {brok.title}
                </option>
              )
            })}
          </select>

          <button className="btn blue" type="submit">
            Go to comparison page
          </button>
        </form>
      </div>
    </div>
  )
}
