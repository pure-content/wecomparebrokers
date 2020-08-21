// import React from "react"
// import $ from "jquery"
// import { Link, useStaticQuery, graphql } from "gatsby"
// import Parser from "html-react-parser"
// import RecommendedBroker from "./RecommendedBroker"

// export default function BrokerList(props) {
//   const { recommendedBroker, recommendedBrokerAdditionalText } = props
//   const givenBrokers = props.brokers

//   const allBrokers = useStaticQuery(graphql`
//     query {
//       wpgraphql {
//         brokers123(first: 10000) {
//           nodes {
//             title
//             uri
//             id
//           }
//         }
//       }
//     }
//   `)
//   return (
//     <div class="row brokers-list">
//       <div class="small-12 columns">
//         {recommendedBroker && (
//           <RecommendedBroker
//             recommendedBroker={recommendedBroker}
//             recommendedBrokerAdditionalText={recommendedBrokerAdditionalText}
//           />
//         )}
//         {brokers.wpgraphql.allBrokers.nodes.map(brok => {
//           return (
//             <h1>
//               <Link to={brok.uri}>{brok.title}</Link>
//             </h1>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
