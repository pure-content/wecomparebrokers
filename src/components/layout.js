import React, { useEffect, useState } from "react"
import $ from "jquery"
import "jquery-match-height"
import NewHeader from "./NewHeader"
import OldHeader from "./OldHeader"
import NewFooter from "./NewFooter"
import OldFooter from "./OldFooter"
import Helmet from "react-helmet"

import "@wordpress/block-library/build-style/style.css"
import "../assets/css/foundation.min.css"
import "../assets/css/normalize.css"
import "../assets/style.css"
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
  const { children, isFrontPage, contentType } = props
  const mainClass = isFrontPage ? "homePage" : ""
  //const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    //MatchHeight.init()
    // window.addEventListener("resize", resize)
    // return () => {
    //   window.removeEventListener("resize", resize)
    // }
  }, [])

  // const resize = () => {
  //   setWidth(window.innerWidth)
  //   MatchHeight.update()
  // }

  // const { url } = menu.wpgraphql.generalSettings
  // const {
  //   altText,
  //   mediaItemUrl,
  // } = menu.wpgraphql.themeGeneralSettings.optHeader.newHomepageLogo

  // // loop through the menu items and make the links relative
  // const items = menu.wpgraphql.menu.menuItems.nodes.map(item => ({
  //   ...item,
  //   url: item.url.replace(url, ""),
  // }))

  // let headerProps = {
  //   mediaItemUrl,
  //   altText,
  //   items,
  // }

  const CurrentHeader = isFrontPage ? <NewHeader /> : <OldHeader />
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
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery.matchHeight/0.7.2/jquery.matchHeight-min.js"
          integrity="sha512-/bOVV1DV1AQXcypckRwsR9ThoCj7FqTV2/0Bm79bL3YSyLkVideFLE3MIZkq1u5t28ke1c0n31WYCOrO01dsUg=="
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      {CurrentHeader}
      <main className={mainClass}>{children}</main>
      {CurrentFooter}
    </>
  )
}

export default Layout
