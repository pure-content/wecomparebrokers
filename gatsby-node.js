exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [{
                        test: /jquery-match-height/,
                        use: loaders.null(),
                    },
                    {
                        test: /select2/,
                        use: loaders.null(),
                    },
                    {
                        test: /easy-pie-chart/,
                        use: loaders.null(),
                    }
                ],
            },
        })
    }
}

exports.createPages = async({ actions, graphql }) => {
    // query for WordPress page data
    const result = await graphql(`
    {
        wpgraphql {
            pages(first: 5000) {
                nodes {
                    id
                    uri
                    template {
                        ... on WPGraphQL_DefaultTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ForexMarketNewsArchiveTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ComplaintSinglePageTemplate {
                            templateName
                        }
                        ... on WPGraphQL_CheapestBrokerTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ComparisonPageTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ComplaintsArchivePageTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ComplaintsFormTemplate {
                            templateName
                        }
                        ... on WPGraphQL_BrokersPlatformTemplate {
                            templateName
                        }
                        ... on WPGraphQL_BrokerFinderTemplate {
                            templateName
                        }
                        ... on WPGraphQL_BrokerHealthTemplate {
                            templateName
                        }
                        ... on WPGraphQL_HomePageTemplate {
                            templateName
                        }
                        ... on WPGraphQL_NewHomePageTemplate {
                            templateName
                        }
                        ... on WPGraphQL_PlatformsListTemplate {
                            templateName
                        }
                        ... on WPGraphQL_PopularPostsTemplate {
                            templateName
                        }
                        ... on WPGraphQL_ComingSoonTemplate {
                            templateName
                        }
                    }
                }
            }
            posts {
                nodes {
                    id
                    uri
                }
            }
            brokers123(first: 5000) {
                nodes {
                  title
                  uri
                  id
                }
            }
        }
    }
    `)

    // pull the page data out of the query response
    const pages = result.data.wpgraphql.pages.nodes
    const brokers = result.data.wpgraphql.brokers123.nodes
    const templates = []
    pages.forEach(page => {
        templates.includes(page.template.templateName) ? '' : templates.push(page.template.templateName.split(' ').join(''));
    });

    // loop through WordPress pages and create a Gatsby page for each one
    pages.forEach(page => {
        switch (page.template.templateName.split(' ').join('')) {
            case "NewHomePage":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/NewHomePage.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "CheapestBroker":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/CheapestBroker.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "ComplaintsForm":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/ComplaintsForm.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "ComingSoon":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/ComingSoon.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "BrokerHealth":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/BrokerHealth.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "PlatformsList":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/PlatformsList.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "ComplaintsArchivePage":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/ComplaintsArchivePage.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "ComparisonPage":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/ComparisonPage.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            case "BrokerFinder":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/BrokerFinder.js"),
                    context: {
                        id: page.id,
                    },
                })
                break;
            default:
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/Default.js"),
                    context: {
                        id: page.id,
                    },
                })
        }

    })


    brokers.forEach(broker => {
        actions.createPage({
            path: broker.uri,
            component: require.resolve("./src/customPostTypes/BrokersSingle.js"),
            context: {
                id: broker.id,
            },
        })
    })

    const posts = result.data.wpgraphql.posts.nodes
    posts.forEach(post => {
        actions.createPage({
            path: `blog${post.uri}`,
            component: require.resolve("./src/templates/post-template.js"),
            context: {
                id: post.id,
            },
        })
    })
}