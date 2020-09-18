// import React from 'react'
// import GravityFormForm from 'gatsby-gravityforms-component'
// import { useStaticQuery, graphql } from 'gatsby'

// const allGravityData = () => {
//     const { allGfForm } = useStaticQuery(
//         graphql`
//             query {
//                 allGfForm {
//                     edges {
//                         node {
//                             ...GravityFormComponent
//                         }
//                     }
//                 }
//             }
//         `
//     )
//     return allGfForm
// }

// const handleError = ({ values, error, reset }) => {
//     //handle error
// }

// const handleSuccess = ({ values, reset, confirmations }) => {
//     //handle success
// }

// const FooterGravityForm = () => {
//     return <GravityFormForm
//         id={1}
//         formData={allGravityData()}
//         lambda={process.env.LAMBDA_ENDPOINT}
//         successCallback={handleSuccess}
//         errorCallback={handleError}
//     />
// }

// export default FooterGravityForm