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
                    }, {
                        test: /exit-intent/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
    actions.setWebpackConfig({
        node: { fs: 'empty' },
    })
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

            contentTypes(first: 1000) {
                nodes {
                  name
                  id
                  uri
                }
            }

            brokerInfoTaxonomies {
                nodes {
                  name
                  id
                  uri
                }
            }

            topBrokerAreas {
                nodes {
                  name
                  uri
                  id
                }
            }

            forexMarketNews123(first: 1000) {
                nodes {
                    uri
                    id
                }
            }

            comparisons123(first: 10000) {
                nodes {
                    title
                    uri
                    id
                }
            }

            topBrokers123(first: 1000) {
                nodes {
                  title
                  uri
                  id
                }
            }

            brokerComparisons123(first: 1000) {
                nodes {
                    title
                    uri
                    id
                }
            }

            brokerInfo123(first: 1000) {
                nodes {
                    title
                    uri
                    id
                }
            }

            qas(first: 1000) {
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
            case "ComplaintsForm":
                actions.createPage({
                    path: page.uri,
                    component: require.resolve("./src/templates/ComplaintsForm.js"),
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

    //Archive Pages for Custom Post Types
    const contentTypes = result.data.wpgraphql.contentTypes.nodes
    contentTypes.forEach(type => {
        switch (type.name) {
            case 'cma_thread':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/CMAThread.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;
            case 'brokers':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/ArchiveBrokers.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;

            case 'platforms':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/ArchivePlatforms.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;

            case 'compare':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/ArchiveCompare.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;

            case 'crypto_currency':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/ArchiveCryptoCurrency.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;

            case 'broker_comparison':

                break;

            case 'broker_info':
                actions.createPage({
                    path: '/broker-info/',
                    component: require.resolve("./src/templates/archives/ArchiveBrokerInfo.js"),
                    context: {
                        id: type.id,
                    },
                })
                const brokerInfoTaxonomies = result.data.wpgraphql.brokerInfoTaxonomies.nodes
                brokerInfoTaxonomies.forEach((tax) => {
                    actions.createPage({
                        path: tax.uri,
                        component: require.resolve("./src/templates/archives/ArchiveBrokerInfoTax.js"),
                        context: {
                            id: tax.id,
                        },
                    })
                })
                break;

            case 'top_brokers':
                const topBrokerAreas = result.data.wpgraphql.topBrokerAreas.nodes
                topBrokerAreas.forEach((tax) => {
                    actions.createPage({
                        path: tax.uri,
                        component: require.resolve("./src/templates/archives/ArchiveBrokerArea.js"),
                        context: {
                            id: tax.id,
                        },
                    })
                })
                break;
            case 'forex_market_news':
                actions.createPage({
                    path: type.uri,
                    component: require.resolve("./src/templates/archives/ArchiveForexMarketNews.js"),
                    context: {
                        id: type.id,
                    },
                })
                break;
            default:
                // actions.createPage({
                //     path: type.uri,
                //     component: require.resolve("./src/templates/Default.js"),
                //     context: {
                //         id: type.id,
                //     },
                // })
                break;
        }
    })


    //Single Pages for Custom Post Types
    const forexMarketNews123 = result.data.wpgraphql.forexMarketNews123.nodes
    forexMarketNews123.forEach(article => {
        actions.createPage({
            path: article.uri,
            component: require.resolve("./src/customPostTypes/ForexMarketNewsSingle.js"),
            context: {
                id: article.id,
            },
        })
    })

    const comparisons123 = result.data.wpgraphql.comparisons123.nodes
    comparisons123.forEach(comparison => {
        actions.createPage({
            path: comparison.uri,
            component: require.resolve("./src/customPostTypes/CompareSingle.js"),
            context: {
                id: comparison.id,
            },
        })
    })


    const brokers = result.data.wpgraphql.brokers123.nodes
    brokers.forEach(broker => {
        actions.createPage({
            path: broker.uri,
            component: require.resolve("./src/customPostTypes/BrokersSingle.js"),
            context: {
                id: broker.id,
            },
        })
    })

    const topBrokers123 = result.data.wpgraphql.topBrokers123.nodes
    topBrokers123.forEach(broker => {
        actions.createPage({
            path: broker.uri,
            component: require.resolve("./src/customPostTypes/TopBrokerSingle.js"),
            context: {
                id: broker.id,
            },
        })
    })


    const brokerComparisons123 = result.data.wpgraphql.brokerComparisons123.nodes
    brokerComparisons123.forEach(broker => {
        actions.createPage({
            path: broker.uri,
            component: require.resolve("./src/customPostTypes/BrokerComparisonSingle.js"),
            context: {
                id: broker.id,
            },
        })
    })

    const brokerInfo123 = result.data.wpgraphql.brokerInfo123.nodes
    brokerInfo123.forEach(broker => {
        actions.createPage({
            path: broker.uri,
            component: require.resolve("./src/customPostTypes/BrokerInfoSingle.js"),
            context: {
                id: broker.id,
            },
        })
    })

    const posts = result.data.wpgraphql.posts.nodes
    posts.forEach(post => {
        actions.createPage({
            path: post.uri,
            component: require.resolve("./src/templates/post-template.js"),
            context: {
                id: post.id,
            },
        })
    })

    const qas = result.data.wpgraphql.qas.nodes
    qas.forEach(qa => {
        actions.createPage({
            path: qa.uri,
            component: require.resolve("./src/customPostTypes/QandASingle.js"),
            context: {
                id: qa.id,
            },
        })
    })

    //Search Page
    actions.createPage({
        path: 'search',
        component: require.resolve("./src/templates/SearchPage.js")
    })

    //Forex Market News Feed Page
    actions.createPage({
        path: 'forex-market-news/feed/',
        component: require.resolve("./src/templates/ForexMarketNewsFeed.js")
    })
}