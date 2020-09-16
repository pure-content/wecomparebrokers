import React, { useEffect } from "react"
import $ from "jquery"
import NewHeader from "./NewHeader"
import OldHeader from "./OldHeader"
import NewFooter from "./NewFooter"
import OldFooter from "./OldFooter"
import Helmet from "react-helmet"

import "../assets/css/foundation.min.css"
import "../assets/css/normalize.css"
import "../assets/style.css"
import "../assets/css/all-styles.css"
import "../assets/css/media-screens.css"
import "select2"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../assets/local-style.css"
import "../assets/css/plugins/font-awesome.min.css"
import "../assets/css/plugins/jquery.fancybox.min.css"
import "../assets/css/plugins/select2.min.css"
import "../assets/css/plugins/slick.css"

const Layout = props => {

  const { children, pageInfo } = props
  const { isFrontPage, contentType, title, uri } = pageInfo ? pageInfo : ""
  const mainClass = isFrontPage ? "homePage" : ""

  useEffect(() => {
    // $('a').each(function (i, link) {
    //   link.href = link.href.replace('https://wecomparebrokers.netlify.app/', 'https://www.wecomparebrokers.com/')
    // })
  })

  const CurrentHeader = isFrontPage ? (
    <NewHeader title={title} />
  ) : (
      <OldHeader title={title} uri={uri} />
    )
  const CurrentFooter = isFrontPage ? (
    <NewFooter />
  ) : (
      <OldFooter contentType={contentType} />
    )
  return (
    <>
      <Helmet>
        <script
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery.matchHeight/0.7.2/jquery.matchHeight-min.js"
          integrity="sha512-/bOVV1DV1AQXcypckRwsR9ThoCj7FqTV2/0Bm79bL3YSyLkVideFLE3MIZkq1u5t28ke1c0n31WYCOrO01dsUg=="
          crossorigin="anonymous"
        ></script>
      </Helmet>
      {CurrentHeader}
      <main className={mainClass}>{children}</main>
      {CurrentFooter}
    </>
  )
}

export default Layout
