import React from 'react'

export const avarageRatingCounter = cptBrokers => {

    const {
        ratingCommFees,
        ratingCustResearch,
        ratingCustServ,
        ratingEase,
        ratingMobTrad,
        ratingPlatfTools,
    } = cptBrokers
    let arrayOfRatings = [
        ratingCommFees,
        ratingCustResearch,
        ratingCustServ,
        ratingEase,
        ratingMobTrad,
        ratingPlatfTools,
    ]
    let divider = 0
    Object.values(arrayOfRatings).map((item) =>
        typeof item !== 'null' ? divider++ : divider
    )
    let avarage =
        Object.values(arrayOfRatings).reduce((a, b) =>
            typeof b === "number" ? a + b : a
        ) / divider
    const avarageRound = Math.round(avarage * 10) / 10
    return avarageRound
}