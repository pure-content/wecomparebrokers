/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config();

module.exports = {
    /* Your site config here */
    plugins: [{
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'WPGraphQL',
                fieldName: 'wpgraphql',
                url: 'https://www.wecomparebrokers.com/graphql',
            }
        },
        {
            resolve: 'gatsby-plugin-sass'
        },
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                // Base URL needs to include protocol (http/https)
                baseUrl: 'https://www.wecomparebrokers.com',
                // Gravity Forms API
                api: {
                    key: process.env.CONSUMER_KEY,
                    secret: process.env.CONSUMER_SECRET,
                },
                basicAuth: {
                    username: process.env.WORDPRESS_USER,
                    password: process.env.WORDPRESS_PASSWORD,
                },
            },
        },
        `gatsby-transformer-remark`
    ]
}
console.log('WORDPRESS USER ' + process.env.WORDPRESS_USER)