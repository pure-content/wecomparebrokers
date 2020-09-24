import React, { useEffect } from "react"
import $ from "jquery"
import NewHeader from "./NewHeader"
import OldHeader from "./OldHeader"
import NewFooter from "./NewFooter"
import OldFooter from "./OldFooter"
import Helmet from "react-helmet"
import Parser from "html-react-parser"

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

    // if (window) {
    //   $('head').append(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','GTM-NBXR75M');</script>`)
    // }
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
        <script>
          {
            window ? (
              (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-NBXR75M')
            ) : null
          }
        </script>
      </Helmet>

      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NBXR75M" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>

      {CurrentHeader}
      <main className={mainClass}>{children}</main>
      {CurrentFooter}
    </>
  )
}

export default Layout
