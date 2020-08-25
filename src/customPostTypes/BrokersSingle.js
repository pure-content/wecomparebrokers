import React from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import CompareForm from "../components/CompareFrom"

const shortid = require("shortid")

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      broker123(id: $id) {
        title
        uri
        contentType {
          node {
            name
          }
        }
        seo {
          metaDesc
          title
          opengraphType
        }
        cptBrokers {
          accountsList
          affiliateLink
          allFieldsChecker
          allSpreadsPoints
          banReason
          basicLibraryEduSup
          basicLibraryEduSupScore
          bonusFeatureForBinOpt
          bonusFeatureForCfd
          bonusFeatureForCommodities
          bonusFeatureForCrypto
          bonusFeatureForEtf
          bonusFeatureForForex
          bonusFeatureForSocTrad
          bonusFeatureForSpreadBet
          bonusFeatureForStocks
          brokerAddress
          brokerEmails {
            email
            emailLink
          }
          brokerHealth
          brokerInfoRelatedArticles {
            ... on WPGraphQL_Article123 {
              id
              title
              uri
            }
          }
          brokerLink
          brokerRegion
          brokerTelephones {
            telephone
            telephoneNumber
          }
          brokerType
          brokerWarningMessage
          cfdLossRate
          commissionsFeesChargesFeesCharges
          commissionsFeesChargesFeesChargesScore
          commissionsOnTrades
          compareTableTextBelowLogo
          con1ProsCons
          con1ProsConsScore
          con2ProsCons
          con2ProsConsScore
          con3ProsCons
          con3ProsConsScore
          countryBroker
          currencyPairsOffered
          customAuthorBroker {
            nicename
          }
          depProtectionForBinOpt
          depProtectionForCfd
          depProtectionForCommodities
          depProtectionForCrypto
          depProtectionForEtf
          depProtectionForForex
          depProtectionForSocTrad
          depProtectionForSpreadBet
          depProtectionForStocks
          dislikesList
          faqsQualityCustSup
          faqsQualityCustSupScore
          featureASpecFeat
          featureASpecFeatScore
          featureBSpecFeat
          fieldGroupName
          financialCommentaryResToolsScore
          fixedSpreads
          forexBreadthInvProd
          forexBreadthInvProdScore
          ftseSpreadForBinOpt
          ftseSpreadForCfd
          ftseSpreadForCommodities
          ftseSpreadForCrypto
          ftseSpreadForEtf
          ftseSpreadForForex
          ftseSpreadForSocTrad
          ftseSpreadForSpreadBet
          ftseSpreadForStocks
          generalAverageRating3Scale
          generalAverageRating3ScaleSummary
          generalEduSup
          generalEduSupScore
          generalFeesCharges
          generalFeesChargesScore
          headquartersLocation
          headquartersLocationOfficesBg
          headquartersLocationOfficesBgScore
          includeToMostPopularBrokersTable
          introTextCommFees
          introTextPlatfTools
          likesList
          liveChatWebTeleOfficesCustSup
          liveChatWebTeleOfficesCustSupScore
          maxLevelForBinOpt
          maxLevelForCfd
          maxLevelForCommodities
          maxLevelForCrypto
          maxLevelForEtf
          maxLevelForForex
          maxLevelForSocTrad
          maxLevelForSpreadBet
          maxLevelForStocks
          maximumLeverage
          methodsList
          minDeposit
          minDepositForBinOpt
          minDepositForCfd
          minDepositForCommodities
          minDepositForCrypto
          minDepositForEtf
          minDepositForForex
          minDepositForSocTrad
          minDepositForSpreadBet
          minDepositForStocks
          minimumDeposit
          mt4OrEquivalantPlatfExp
          mt4OrEquivalantPlatfExpScore
          multipleComplianceRegComp
          multipleComplianceRegCompScore
          nofollowAffiliateLink
          otherCommCryptoSpreadCfdInvProd
          otherCommCryptoSpreadCfdInvProdScore
          otherGuidanceResTools
          otherGuidanceResToolsScore
          ourScore
          platformRelation {
            ... on WPGraphQL_Platform123 {
              id
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          platformsForBinOpt
          platformsForCfd
          platformsForCommodities
          platformsForCrypto
          platformsForEtf
          platformsForForex
          platformsForSocTrad
          platformsForSpreadBet
          platformsForStocks
          platformsList
          predefinedRelatedBrokers {
            ... on WPGraphQL_Broker123 {
              id
              title
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              cptBrokers {
                allSpreadsPoints
                affiliateLink
                minDeposit
                platformsList
                accountsList
                spreadsList
                methodsList
                tabButtonAlternativeText
                takeMeToBrokerButtonNoteText
              }
              uri
            }
          }
          primaryRegulator
          primaryRegulatorRegCompScore
          pro1ProsCons
          pro1ProsConsScore
          pro2ProsCons
          pro2ProsConsScore
          pro3ProsCons
          pro3ProsConsScore
          proprietaryOptionsPlatfExp
          proprietaryOptionsPlatfExpScore
          publiclyTradedBg
          publiclyTradedEntityOrParent
          ratingCommFees
          ratingCustResearch
          ratingCustServ
          ratingEase
          ratingMobTrad
          ratingPlatfTools
          regulated
          regulatedOrUnregulatedRegCompScore
          responsivenessCustSup
          responsivenessCustSupScore
          reviewBodyCommFees
          reviewBodyCrypto
          reviewBodyCustServ
          reviewBodyEase
          reviewBodyFinThoughts
          reviewBodyLatBrokNews
          reviewBodyMetod
          reviewBodyMobTrad
          reviewBodyOther
          reviewBodyPlatfTools
          reviewBodyRelGuides
          reviewBodyResearch
          reviewIntroText
          safetyOfDepositsRegComp
          safetyOfDepositsRegCompScore
          sizeMeasureBg
          sizeMeasureBgScore
          specialAdvancedPlatfExp
          specialAdvancedPlatfExpScore
          specialOffer
          spreadsFeesCharges
          spreadsFeesChargesScore
          spreadsList
          stocksBreadthInvProd
          stocksBreadthInvProdScore
          summaryScoreBg
          summaryScoreCustSup
          summaryScoreEduSup
          summaryScoreFeesCharges
          summaryScoreInvProd
          summaryScorePlatfExp
          summaryScoreProsCons
          summaryScoreRegComp
          summaryScoreResTools
          tabButtonAlternativeText
          tableCommFees {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
          }
          tableInfo
          tableMobTrad {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tablePlatfTools {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tableResearch {
            rowLabel
            valueType
            tdAmeritradeValueText
            tdAmeritradeValueRat
            tdAmeritradeValueCheck
            merrillEdgeValueText
            merrillEdgeValueRat
            merrillEdgeValueCheck
            fidelityValueText
            fidelityValueRat
            fidelityValueCheck
            etradeValueText
            etradeValueRat
            etradeValueCheck
            charlesSchwabValueText
            charlesSchwabValueRat
            charlesSchwabValueCheck
          }
          tableTitleCommFees
          tableTitleMobTrad
          tableTitlePlatfTools
          tableTitleResearch
          takeMeToBrokerButtonNoteText
          technicalAnlaysisResToolsScore
          textBelowVideo
          traderInformationForBinOpt
          traderInformationForCfd
          traderInformationForCommodities
          traderInformationForCrypto
          traderInformationForEtf
          traderInformationForForex
          traderInformationForSocTrad
          traderInformationForSpreadBet
          traderInformationForStocks
          tradingInstrumentType
          tradingType
          typicalLeverageForBinOpt
          typicalLeverageForCfd
          typicalLeverageForCommodities
          typicalLeverageForCrypto
          typicalLeverageForEtf
          typicalLeverageForForex
          typicalLeverageForSocTrad
          typicalLeverageForSpreadBet
          typicalLeverageForStocks
          useThisDataBinOpt
          useThisDataCfd
          useThisDataCommodities
          useThisDataCrypto
          useThisDataEtf
          useThisDataForex
          useThisDataSocTrad
          useThisDataSpreadBet
          useThisDataStocks
          videoBroker
          webinarssupportEduSup
          webinarssupportEduSupScore
          yearFounded
          yearFoundedBg
          yearFoundedBgScore
          yearList {
            year
            position
            overallRating
            opponents
          }
        }
      }
    }
  }
`

export default function BrokersSingle({ data }) {
  const broker = data.wpgraphql.broker123

  const pageInfo = {
    isFrontPage: broker.isFrontPage,
    contentType: broker.contentType,
    title: broker.title,
  }
  return (
    <Layout pageInfo={pageInfo}>
      <h1>{broker.title}</h1>
    </Layout>
  )
}
