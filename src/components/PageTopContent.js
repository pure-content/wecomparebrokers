import React from 'react'
import Parser from "html-react-parser"
import { graphql, Link } from "gatsby"

export default function PageTopContent(props) {
    const { page } = props
    const pageTemplate = props.template
    const dt = new Date()
    return (
        <div className="top-content-wrap find-page">
            <div className="row top-content">
                <div className="large-5 medium-6 columns top-content-col">
                    <div className="crumbs">
                        <Link to="/">Home page</Link> -&gt;
                        <span>
                            {page.allPagesFields.alternativeTitle
                                ? Parser(page.allPagesFields.alternativeTitle)
                                : Parser(page.title)}
                        </span>
                    </div>
                    <article>
                        <h1 className="page_title">
                            {page.allPagesFields.pageIcon.mediaItemUrl ? (
                                <img
                                    src={page.allPagesFields.pageIcon.mediaItemUrl}
                                    alt="Title"
                                />
                            ) : (
                                    ""
                                )}
                            {page.allPagesFields.alternativeTitle
                                ? Parser(page.allPagesFields.alternativeTitle)
                                : Parser(page.title)}
                        </h1>
                        <div className="dot-sep">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </article>
                </div>
                <div className="medium-6 columns top-content-col">
                    <div className="thumb-wrap">
                        {pageTemplate.rightColumnTitle ? (
                            <h2>
                                {pageTemplate.rightColumnTitle} {dt.getFullYear()}
                            </h2>
                        ) : (
                                ""
                            )}
                        {page.allPagesFields.videoPage ? (
                            page.allPagesFields.videoPage
                        ) : page.featuredImage ? (
                            <img src={page.featuredImage.node.mediaItemUrl} />
                        ) : (
                                    ""
                                )}
                        {Parser(page.content ? page.content : '')}
                        {Parser(pageTemplate.introTextHealth ? pageTemplate.introTextHealth : '')}
                    </div>
                </div>
            </div>
        </div>
    )
}
