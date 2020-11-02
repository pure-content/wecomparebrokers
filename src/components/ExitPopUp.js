import React, { useEffect } from 'react'
import goldMedal from '../assets/images/exit-medal.png'
import xmSquare from '../assets/images/xm-square.png'
import octaFX from '../assets/images/octaoptin.png'
import markets from '../assets/images/markets.png'


export default function ExitPopUp({ setShowModal }) {
    return (
        <div className="exit_popup_wrap">

            <div className="exit_popup_body">
                <img src={goldMedal} alt="gold Medal" width='157' height='157' className="goldMedal" />
                <h3>Who Are The Top Brokers Right Now?</h3>
                <p className="exit_popup_descr">Only the brokers offering the best deals, most secure platforms and widest trading options are considered for the coveted WeCompareBrokers Gold Seal.</p>
                <div className="exit_popup_brokers_wrap">
                    <div className="exit_popup_broker">
                        <div className="exit_popup_broker_img">
                            <img width="200" height="200" src={xmSquare} />
                        </div>
                        <a className="demo_link" href="https://clicks.pipaffiliates.com/c?c=539942&l=en&p=1">OPEN FREE DEMO ACCOUNT</a>
                    </div>
                    <div className="exit_popup_broker">
                        <div className="exit_popup_broker_img">
                            <img width="200" height="200" src={octaFX} />
                        </div>
                        <a className="demo_link" href="https://my.octafx.com/open-account/?refid=ib1087740">OPEN FREE DEMO ACCOUNT</a>
                    </div>
                    <div className="exit_popup_broker">
                        <div className="exit_popup_broker_img">
                            <img width="200" height="200" src={markets} />
                        </div>
                        <a className="demo_link" href="https://go.markets.com/visit/?bta=36192&nci=5751">OPEN FREE DEMO ACCOUNT</a>
                    </div>
                </div>
                <div className="exit_popup_close" onClick={() => setShowModal(false)}>
                    <svg viewBox="0 0 1792 1792" style={{ display: 'block', height: 22, width: 22 }}>
                        <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}
