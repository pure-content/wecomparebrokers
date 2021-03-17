/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
 require("dotenv").config({
    path: `.env`
  })

module.exports = {
    /* Your site config here */
    siteMetadata: {
        siteUrl: `https://www.wecomparebrokers.com`,
    },
    plugins: [{
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'WPGraphQL',
                fieldName: 'wpgraphql',
                url: 'https://meek-hint.flywheelsites.com/graphql',
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://www.wecomparebrokers.com',
                sitemap: 'https://www.wecomparebrokers.com/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: 'gatsby-plugin-sass'
        },
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `www-wecomparebrokers-com`
            }
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-netlify`,
        `gatsby-plugin-sitemap`
    ]
}