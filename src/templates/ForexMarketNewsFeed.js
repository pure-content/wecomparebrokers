import React, { useEffect, useState } from 'react'
import Parser from "html-react-parser"

export default function ForexMarketNewsFeed() {
    const [rss, setRss] = useState('')

    useEffect(() => {
        fetch('https://meek-hint.flywheelsites.com/wp-json/getrss/forexmarketnews').then(data => data.json()).then(data => setRss(data))
    })


    return <pre>{Parser(rss)}</pre>
}
