import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import $ from "jquery"
import Parser from "html-react-parser"
import "jquery-match-height"
import { scoreAnimation } from "../functions/scoreAnimation"
import { avarageRatingCounter } from "../functions/avarageRatingCounter"

export default function BrokerTableSingleItemNewView(props) {
    const themeGeneralSettings = useStaticQuery(graphql`
    query {
      wpgraphql {
        themeGeneralSettings {
          optGeneralSettings {
            specialOfferIcon {
              mediaItemUrl
            }
            brokerCallBackButtonAlternativeText
            visitBrokerButtonAlternativeText
            compareBrokerSideBySideButtonAlternativeText
            readFullReviewButtonAlternativeText
            takeMeToBrokerButtonAlternativeText
          }
        }
      }
    }
  `)
    useEffect(() => {
        $(document).ready(function () {
            $(".broker-col").matchHeight()

            //   var first = $('form #first-usr option[value="<?php echo $user_one; ?>"]'),
            //     firstVal = first.val(),
            //     sec = $('form #sec-usr option[value="<?php echo $user_two; ?>"]'),
            //     secVal = sec.val()
            //   $("form #first-usr").val(firstVal).trigger("change")
            //   $("form #sec-usr").val(secVal).trigger("change")
            //$(".broker-col").matchHeight()
        })
        $('.compare-btn').click(function () {
            var brokValue = $(this).attr('value');
            $('#first-user').val(brokValue);
            $('#compare-form-wrap').fadeIn('fast');
        });

        $('#compare-form .close').click(function () {
            $('#compare-form-wrap').fadeOut('fast');
        });
        $("#popup-sec-usr").select2({
            placeholder: "Second Broker",
            minimumResultsForSearch: Infinity,
        })
    })

    const platfomsList = [
        "MT5",
        "MT4",
        "WebTrader",
        "Mobile",
        "apps",
        "Proprietary",
        "cTrader",
    ]
    const accountsList = ["Micro", "Retail", "VIP", "Professional"]
    const spreadsList = ["Fixed", "Variable"]
    const methodsList = ["Bank transfer", "Credit Cards", "PayPal"]
    const { brokerInfo } = props
    const platformThumb = brokerInfo.cptBrokers.platformRelation
        ? brokerInfo.cptBrokers.platformRelation.featuredImage.node.mediaItemUrl
        : null

    const BrokerButtons = () => {

        return (
            <>
                <span className="aff-wrap">
                    <Link className="btn " to={brokerInfo.cptBrokers.affiliateLink}>Visit Broker</Link>
                    {brokerInfo.cptBrokers.takeMeToBrokerButtonNoteText && (
                        <span className="floating-note">
                            {brokerInfo.cptBrokers.takeMeToBrokerButtonNoteText}
                        </span>
                    )}
                </span>
                {/* <span data-id={brokerInfo.id} value={JSON.stringify(brokerInfo)} className="btn small compare-btn">
                    {themeGeneralSettings.wpgraphql.themeGeneralSettings
                        .optGeneralSettings.compareBrokerSideBySideButtonAlternativeText
                        ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                            .optGeneralSettings
                            .compareBrokerSideBySideButtonAlternativeText
                        : "Compare Brokers Side by Side"}
                </span> */}
                <a className="btn" href={brokerInfo.cptBrokers.affiliateLink} target="_blank" rel="nofollow sponsored" >
                    {themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText ? themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.takeMeToBrokerButtonAlternativeText : 'Take Me To Broker'}
                </a>
                <a className="btn call-back-form" data-brokname={brokerInfo.title}>
                    {themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.brokerCallBackButtonAlternativeText ? themeGeneralSettings.wpgraphql.themeGeneralSettings.optGeneralSettings.brokerCallBackButtonAlternativeText : "Broker Callback"}
                </a>
            </>
        )
    }

    if (brokerInfo) {
        return (
            <div className="row collapse broker-wrap new">
                {brokerInfo.cptBrokers.specialOffer && (
                    <img
                        className="spec-offer-ico"
                        src={
                            themeGeneralSettings.wpgraphql.themeGeneralSettings
                                .optGeneralSettings.specialOfferIcon.mediaItemUrl
                        }
                        alt="Special Offer"
                    />
                )}
                <div className="broker-tab-col first-col broker-identity full broker-col one-column">
                    <div className="img-col img-center">
                        <div className="thumb-wrap">
                            {brokerInfo.featuredImage ? (
                                <a href={brokerInfo.cptBrokers.affiliateLink}><img onLoad={() => $(".broker-col").matchHeight()} src={brokerInfo.featuredImage.node.mediaItemUrl} alt="WCB Logo" /></a>
                            ) : (
                                    <a href={brokerInfo.cptBrokers.affiliateLink}><img onLoad={() => $(".broker-col").matchHeight()} className="img-list-default" src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/generic-logo.png" alt="WCB Logo" /></a>
                                )}
                        </div>
                    </div>

                    <div className="broker-name align-right">
                        <span class="rating">
                            <img src="https://meek-hint.flywheelsites.com/wp-content/themes/we-compare-brokers/images/stars-mask.svg" alt="Rating" />
                            <span class="rat-color" style={{ width: `${avarageRatingCounter(brokerInfo.cptBrokers) * 20}%` }}></span>
                        </span>
                        <span class="rat-val">
                            {isNaN(avarageRatingCounter(brokerInfo.cptBrokers)) ? '0' : avarageRatingCounter(brokerInfo.cptBrokers)}
                        </span>
                        {platformThumb && <img src={platformThumb} />}
                        {/* <h3>{brokerInfo.title}</h3> */}
                        {/* {scoreAnimation(
                            brokerInfo.cptBrokers.ourScore,
                            "small-chart",
                            true
                        )} */}
                    </div>
                    <div className="btn-wrap">
                        <Link to={brokerInfo.uri}>Read {brokerInfo.title} Review</Link>
                        <span data-id={brokerInfo.id} value={JSON.stringify(brokerInfo)} className="small compare-btn">Compare {brokerInfo.title}</span>
                        {/* <a className="btn call-back-form" data-brokname={brokerInfo.title}>
                            {themeGeneralSettings.wpgraphql.themeGeneralSettings
                                .optGeneralSettings.brokerCallBackButtonAlternativeText
                                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                                    .optGeneralSettings.brokerCallBackButtonAlternativeText
                                : "Broker Callback"}
                        </a>
                        <a
                            className="btn"
                            href={brokerInfo.cptBrokers.affiliateLink}
                            target="_blank"
                        >
                            {themeGeneralSettings.wpgraphql.themeGeneralSettings
                                .optGeneralSettings.visitBrokerButtonAlternativeText
                                ? themeGeneralSettings.wpgraphql.themeGeneralSettings
                                    .optGeneralSettings.visitBrokerButtonAlternativeText
                                : "Visit Broker"}
                        </a> */}
                    </div>
                </div>
                <div className="broker-tab-col broker-content broker-col three-columns">
                    <div className='broker-content--first-col'>
                        <svg className='table-icon' xmlns="http://www.w3.org/2000/svg" width='50' height='50' version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackGround: 'new 0 0 512 512' }}>
                            <g>
                                <g>
                                    <path d="M224,120c-39.696,0-72,32.304-72,72s32.304,72,72,72s72-32.304,72-72S263.696,120,224,120z M224,248    c-30.88,0-56-25.12-56-56s25.12-56,56-56s56,25.12,56,56S254.88,248,224,248z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M408,128h-8c-8.824,0-16-7.176-16-16c0-4.416-3.576-8-8-8h-80v16h73.016c3.552,13.784,16.104,24,30.984,24v96    c-14.88,0-27.432,10.216-30.984,24H296v16h80c4.424,0,8-3.584,8-8c0-8.824,7.176-16,16-16h8c4.424,0,8-3.584,8-8V136    C416,131.584,412.424,128,408,128z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M78.992,120H152v-16H72c-4.416,0-8,3.584-8,8c0,8.824-7.176,16-16,16h-8c-4.416,0-8,3.584-8,8v112c0,4.416,3.584,8,8,8h8    c8.824,0,16,7.176,16,16c0,4.416,3.584,8,8,8h80v-16H78.992C75.424,250.216,62.88,240,48,240v-96    C62.88,144,75.424,133.784,78.992,120z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect x="320" y="168" width="16" height="56" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect x="352" y="168" width="16" height="56" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect x="80" y="168" width="16" height="56" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect x="112" y="168" width="16" height="56" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M440,72H8c-4.416,0-8,3.584-8,8v224c0,4.416,3.584,8,8,8h208.504c-0.296,2.656-0.504,5.32-0.504,8    c0,39.696,32.304,72,72,72c39.704,0,72-32.304,72-72c0-2.68-0.208-5.344-0.504-8H440c4.424,0,8-3.584,8-8V80    C448,75.584,444.424,72,440,72z M288,376c-30.88,0-56-25.12-56-56c0-2.688,0.24-5.352,0.616-8h110.76    c0.384,2.648,0.624,5.312,0.624,8C344,350.88,318.872,376,288,376z M432,296H16V88h416V296z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M504,200h-40v16h32v208H80v-96H64v104c0,4.416,3.584,8,8,8h432c4.424,0,8-3.584,8-8V208C512,203.584,508.424,200,504,200z    " />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M472,256h-8v112c-14.88,0-27.432,10.216-30.984,24H360v16h80c4.424,0,8-3.584,8-8c0-8.824,7.176-16,16-16h8    c4.424,0,8-3.584,8-8V264C480,259.584,476.424,256,472,256z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M142.992,392c-3.56-13.784-16.104-24-30.992-24v-40H96v48c0,4.416,3.584,8,8,8h8c8.824,0,16,7.176,16,16    c0,4.416,3.584,8,8,8h80v-16H142.992z" />
                                </g>
                            </g>
                        </svg>
                        <span>{Parser(brokerInfo.cptBrokers.minDeposit ? brokerInfo.cptBrokers.minDeposit : "")} Min Deposit</span>
                        <span>Spread {Parser(brokerInfo.cptBrokers.allSpreadsPoints ? brokerInfo.cptBrokers.allSpreadsPoints : "")}</span>
                    </div>
                    <div className='broker-content--second-col'>
                        <svg className='table-icon' version="1.1" x="0px" y="0px" viewBox="0 0 493.845 493.845" width='50' height='50'>
                            <g>
                                <path d="M344.292,223.551l21.463-11.843c1.92-1.057,3-3.161,2.758-5.329c-0.225-2.179-1.756-3.992-3.853-4.604l-100.744-29.62   c-1.883-0.557-3.949-0.032-5.353,1.369c-1.401,1.395-1.921,3.451-1.371,5.355l29.624,100.75c0.61,2.096,2.435,3.62,4.594,3.862   c2.175,0.233,4.287-0.857,5.335-2.774l11.853-21.476l32.795,32.803c2.889,2.869,7.528,2.869,10.416,0l25.281-25.298   c1.387-1.378,2.162-3.248,2.162-5.201c0-1.951-0.775-3.822-2.162-5.2L344.292,223.551z" />
                                <path d="M70.813,348.737h352.211c9.132,0,16.516-7.392,16.516-16.512V90.069c0-9.117-7.384-16.511-16.516-16.511H70.813   c-9.123,0-16.508,7.395-16.508,16.511v242.157C54.306,341.345,61.69,348.737,70.813,348.737z M87.329,106.58h319.189v209.137   H87.329V106.58z" />
                                <path d="M469.077,370.755H24.766C11.095,370.755,0,381.84,0,395.521c0,13.681,11.095,24.766,24.766,24.766h444.311   c13.674,0,24.768-11.085,24.768-24.766C493.845,381.84,482.751,370.755,469.077,370.755z" />
                            </g>
                        </svg>
                        <ul>
                            {platfomsList.map(platf => {
                                if (brokerInfo.cptBrokers.platformsList) {
                                    return brokerInfo.cptBrokers.platformsList.includes(platf) ? (
                                        <li className="checked">{platf}</li>
                                    ) : (null)
                                } else {
                                    return <li>{platf}</li>
                                }
                            })}
                        </ul>
                    </div>
                    <div className='broker-content--third-col'>
                        <svg className='table-icon' xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 512.003 512.003" width="50">
                            <g>
                                <g>
                                    <path d="m336.18 272.22c-.649 0-1.31-.07-1.95-.2s-1.27-.32-1.87-.57-1.19-.56-1.729-.92c-.55-.36-1.061-.78-1.521-1.24s-.88-.97-1.239-1.52c-.36-.54-.67-1.12-.92-1.73-.25-.6-.44-1.23-.57-1.87s-.2-1.3-.2-1.95.07-1.31.2-1.96c.13-.63.32-1.26.57-1.87.25-.6.56-1.18.92-1.72.359-.55.779-1.06 1.239-1.52s.971-.88 1.521-1.25c.54-.36 1.13-.67 1.729-.92.601-.25 1.23-.44 1.87-.57 1.29-.26 2.62-.26 3.91 0 .63.13 1.26.32 1.87.57.6.25 1.18.56 1.72.92.551.37 1.061.79 1.521 1.25s.88.97 1.25 1.52c.359.54.67 1.12.92 1.72.25.61.44 1.24.57 1.87.13.65.189 1.31.189 1.96s-.06 1.31-.189 1.95c-.131.64-.32 1.27-.57 1.87-.25.61-.56 1.19-.92 1.73-.37.55-.79 1.06-1.25 1.52s-.97.88-1.521 1.24c-.54.36-1.12.67-1.72.92-.61.25-1.24.44-1.87.57-.65.13-1.3.2-1.96.2z" />
                                    <path d="m336 189.742c-23.675 0-42.936-19.261-42.936-42.937 0-23.675 19.262-42.936 42.936-42.936s42.936 19.261 42.936 42.936-19.261 42.937-42.936 42.937zm0-65.873c-12.647 0-22.936 10.289-22.936 22.936s10.289 22.937 22.936 22.937 22.936-10.289 22.936-22.937c0-12.647-10.289-22.936-22.936-22.936z" />
                                    <path d="m422.852 228.218h-173.703c-5.522 0-10-4.477-10-10 0-29.564-3.996-35.149-25.149-35.149-5.523 0-10-4.477-10-10v-52.527c0-5.523 4.477-10 10-10 21.153 0 25.149-5.585 25.149-35.149 0-5.523 4.478-10 10-10h173.702c5.522 0 10 4.477 10 10 0 29.565 3.995 35.149 25.148 35.149 5.522 0 10 4.477 10 10v52.527c0 5.523-4.478 10-10 10-21.153 0-25.148 5.584-25.148 35.149.001 5.523-4.477 10-9.999 10zm-163.914-20h154.126c1.064-21.694 6.946-40.963 34.936-44.552v-33.721c-27.99-3.589-33.873-22.857-34.936-44.552h-154.126c-1.064 21.695-6.946 40.963-34.938 44.552v33.721c27.991 3.589 33.874 22.857 34.938 44.552z" />
                                    <path d="m472.166 272.218h-90.96c-5.522 0-10-4.477-10-10s4.478-10 10-10h90.96c10.937 0 19.834-8.898 19.834-19.834v-171.157c0-10.937-8.897-19.834-19.834-19.834h-272.332c-10.936 0-19.834 8.897-19.834 19.834v171.158c0 10.936 8.898 19.834 19.834 19.834h90.96c5.522 0 10 4.477 10 10s-4.478 10-10 10h-90.96c-21.965 0-39.834-17.87-39.834-39.834v-171.158c0-21.964 17.869-39.834 39.834-39.834h272.332c21.965 0 39.834 17.87 39.834 39.834v171.158c0 21.964-17.869 39.833-39.834 39.833z" />
                                    <g>
                                        <path d="m119.43 490.61c-4.184 0-8.006-2.706-9.415-6.636-1.408-3.926-.161-8.448 3.065-11.093 3.28-2.689 8.016-3.002 11.622-.767 3.596 2.228 5.427 6.648 4.458 10.765-1.052 4.465-5.132 7.731-9.73 7.731z" />
                                    </g>
                                    <path d="m501.924 332.939c-7.742-7.742-18.035-12.005-28.983-12.005-4.759 0-9.394.806-13.75 2.353-.969-.871-1.929-1.726-2.304-2.032-16.348-13.372-39.95-12.186-54.896 2.763l-47.238 47.239c-3.951 3.948-20.074 13.219-24.764 13.806h-28.836c-5.057 0-7.045-3.852-7.534-5.033-.414-1-1.422-4.112.447-7.213l22.839-6.615c12.348-3.576 21.879-13.101 25.496-25.477 3.544-12.129.726-24.996-7.548-34.423-.386-.439-.782-.875-1.189-1.305-6.629-6.999-18.826-7.728-42.096-2.517-16.397 3.671-35.341 9.804-48.347 14.302-28.237 9.766-50.138 31.487-59.852 58.92h-10.154v-7.843c0-5.523-4.478-10-10-10h-153.215c-5.523 0-10 4.477-10 10v112.751c0 5.523 4.477 10 10 10h64.036c5.522 0 10-4.477 10-10s-4.478-10-10-10h-54.036v-92.751h133.213v102.751c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10v-7.843h29.889c29.406 10.027 59.782 15.079 90.573 15.078 6.758 0 13.538-.244 20.329-.731 38.15-2.738 74.661-13.032 108.519-30.596 8.11-4.207 11.027-6.222 12.723-7.861l61.949-57.5c.091-.084.18-.17.267-.257 7.587-7.583 12.74-17.638 14.14-27.586 1.644-11.701-1.792-22.488-9.678-30.375zm-85.791 5.22c6.952-6.952 17.557-8.092 25.715-3.109l-45.131 45.131c-3.147 3.148-7.333 4.881-11.784 4.881h-15.702zm5.176 96.153c.033-.033.068-.068.107-.104-.037.034-.072.069-.107.104zm70.487-73.784c-.8 5.685-3.841 11.545-8.353 16.104l-61.9 57.455c-.01.009-.019.018-.028.026-.381.283-2.178 1.525-8.202 4.651-62.788 32.573-137.362 37.961-204.605 14.781l-.676-.233c-1.049-.362-2.15-.546-3.26-.546h-31.56v-57.066h17.525c4.539 0 8.509-3.057 9.668-7.446 6.465-24.468 24.913-44.122 49.351-52.573 53.465-18.491 67.519-16.862 69.993-16.267.025.028.051.057.075.085 3.785 4.313 5.017 10.005 3.377 15.615-1.688 5.774-6.122 10.214-11.863 11.877l-25.806 7.474c-1.62.469-3.096 1.341-4.289 2.534-8.206 8.206-10.545 19.963-6.105 30.684 4.441 10.72 14.407 17.379 26.012 17.379h83.781c9.794 0 19.001-3.814 25.927-10.739l47.242-47.243c3.964-3.964 9.233-6.147 14.839-6.147 5.607 0 10.877 2.183 14.841 6.147 3.437 3.437 4.787 7.961 4.016 13.448z" />
                                </g>
                            </g>
                        </svg>
                        <ul>
                            {methodsList.map(method => {
                                if (brokerInfo.cptBrokers.methodsList) {
                                    return brokerInfo.cptBrokers.methodsList.includes(method) ? (<li className="checked">{method}</li>) : (null)
                                } else {
                                    return <li>{method}</li>
                                }
                            })}
                        </ul>
                    </div>

                    {/* <div className="points-col broker-content-col text-center">
                        <div className="wrap">
                            <p className="val">
                                {Parser(
                                    brokerInfo.cptBrokers.allSpreadsPoints
                                        ? brokerInfo.cptBrokers.allSpreadsPoints
                                        : ""
                                )}
                            </p>
                            <p>Spreads:</p>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                See All Spreads
                            </a>
                        )}
                    </div>
                    <div className="min-dep-col broker-content-col text-center">
                        <div className="wrap">
                            <p className="val">
                                {Parser(
                                    brokerInfo.cptBrokers.minDeposit
                                        ? brokerInfo.cptBrokers.minDeposit
                                        : ""
                                )}
                            </p>
                            <p>Min. deposit</p>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                Learn More
                            </a>
                        )}
                    </div>
                    <div className="platf-col broker-content-col text-center">
                        <div className="wrap" data-mh="cont-col">
                            <ul>
                                {platfomsList.map(platf => {
                                    if (brokerInfo.cptBrokers.platformsList) {
                                        return brokerInfo.cptBrokers.platformsList.includes(
                                            platf
                                        ) ? (
                                                <li className="checked">{platf}</li>
                                            ) : (
                                                <li>{platf}</li>
                                            )
                                    } else {
                                        return <li>{platf}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                See Platforms
                            </a>
                        )}
                    </div>
                    <div className="acc-col broker-content-col text-center">
                        <div className="wrap" data-mh="cont-col">
                            <ul>
                                {accountsList.map(account => {
                                    if (brokerInfo.cptBrokers.accountsList) {
                                        return brokerInfo.cptBrokers.accountsList.includes(
                                            account
                                        ) ? (
                                                <li className="checked">{account}</li>
                                            ) : (
                                                <li>{account}</li>
                                            )
                                    } else {
                                        return <li>{account}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                See Accounts
                            </a>
                        )}
                    </div>
                    <div className="spreads-col broker-content-col text-center">
                        <div className="wrap" data-mh="cont-col">
                            <ul>
                                {spreadsList.map(spread => {
                                    if (brokerInfo.cptBrokers.spreadsList) {
                                        return brokerInfo.cptBrokers.spreadsList.includes(
                                            spread
                                        ) ? (
                                                <li className="checked">{spread}</li>
                                            ) : (
                                                <li>{spread}</li>
                                            )
                                    } else {
                                        return <li>{spread}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                See Spreads
                            </a>
                        )}
                    </div>
                    <div className="methods-col broker-content-col text-center">
                        <div className="wrap" data-mh="cont-col">
                            <ul>
                                {methodsList.map(method => {
                                    if (brokerInfo.cptBrokers.methodsList) {
                                        return brokerInfo.cptBrokers.methodsList.includes(
                                            method
                                        ) ? (
                                                <li className="checked">{method}</li>
                                            ) : (
                                                <li>{method}</li>
                                            )
                                    } else {
                                        return <li>{method}</li>
                                    }
                                })}
                            </ul>
                        </div>
                        {brokerInfo.cptBrokers.affiliateLink && (
                            <a
                                href={brokerInfo.cptBrokers.affiliateLink}
                                target="_blank"
                                rel="nofollow sponsored"
                            >
                                See Methods
                            </a>
                        )}
                    </div>
                    {brokerInfo.cptBrokers.tableInfo && (
                        <div className="info-text-col text-center">
                            <p>{brokerInfo.cptBrokers.tableInfo}</p>
                        </div>
                    )} */}
                </div>
                <div className="broker-tab-col btn-col broker-col">
                    <BrokerButtons />
                </div>
            </div >
        )
    } else return null
}
