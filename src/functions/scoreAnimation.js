import React from "react"

export const scoreAnimation = (
  ourScore = null,
  chartClass = "small-chart",
  title = false
) => {
  if (ourScore) {
    return (
      <span className={`chart ${chartClass}`} data-percent={ourScore}>
        <span className="chart-inner">
          <span className="percent"></span>
        </span>
        {title && <span className="score-head">our score</span>}
      </span>
    )
  } else return null
}
