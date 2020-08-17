import React, { useEffect, useState } from "react"
import NewHeader from "./NewHeader"
import OldHeader from "./OldHeader"
import NewFooter from "./NewFooter"
import OldFooter from "./OldFooter"
//import MatchHeight from "matchheight"

import "@wordpress/block-library/build-style/style.css"
import "../assets/css/foundation.min.css"
import "../assets/css/normalize.css"
import "../assets/style.css"
import "../assets/css/media-screens.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../assets/local-style.css"

const Layout = props => {
  const { children, isFrontPage } = props
  const mainClass = isFrontPage ? "homePage" : ""
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    //MatchHeight.init()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [width])

  const resize = () => {
    setWidth(window.innerWidth)
    //MatchHeight.update()
  }

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
  const CurrentFooter = isFrontPage ? <NewFooter /> : <OldFooter />
  return (
    <>
      {CurrentHeader}
      <main className={mainClass}>{children}</main>
      {CurrentFooter}
    </>
  )
}

export default Layout
