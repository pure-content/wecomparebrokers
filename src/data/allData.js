import { useStaticQuery, graphql } from "gatsby"

export default function AllData() {
    const data = useStaticQuery(graphql`
        query {
            wpgraphql {
                brokerDetails {
                    platformsList
                    accountsList
                    spreadsList
                    methodsList
                }
            }
        }
    `)
    const gatheredData = {
        platfomsList: data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.platformsList.split(' | ') : null,
        accountsList: data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.accountsList.split(' | ') : null,
        spreadsList: data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.spreadsList.split(' | ') : null,
        methodsList: data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.methodsList.split(' | ') : null
    }
    return gatheredData
}



// const PLATFORMSLIST = data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.platformsList.split('|') : null
// const ACCOUNTLIST = data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.accountsList.split('|') : null
// const SPREADSLIST = data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.spreadsList.split('|') : null
// const METHODLIST = data.wpgraphql.brokerDetails ? data.wpgraphql.brokerDetails.methodsList.split('|') : null
