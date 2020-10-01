import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import $ from "jquery"
import "jquery-match-height"
let base64 = require('base-64');
require('dotenv').config();

export default function CallBackFormPopUp(props) {
    const country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    const [brokerName, setBrokerName] = useState('')

    useEffect(() => {

        // $("select.gfield_select").select2({
        //     placeholder: "Country"
        // })

        $('.call-back-form').on('click', function () {
            var brokName = $(this).data('brokname')
            setBrokerName(brokName)
            $('#callback-form-wrap').fadeIn('fast');
        })
        $('#callback-form .close').on('click', function () {
            $('#callback-form-wrap').fadeOut('fast');
            setMessage(null)
            $('#gform_2').slideDown('slow')
        });
        if (message) {
            $('#gform_2').slideUp('fast')
        }

        // $('#gform_2').on('submit', function (e) {
        //     e.preventDefault()
        //     console.log(e)
        //     console.log($(this).serialize())

        //     $.ajax({
        //         url: "https://meek-hint.flywheelsites.com/#gf_2",
        //         headers: { 'Access-Control-Allow-Origin': '*' },
        //         contentType: 'application/json',
        //         dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        //         data: $('#gform_2').serialize(),
        //         crossDomain: true,
        //         xhrFields: { withCredentials: false },
        //         success: function (json) {
        //             // do stuff with json (in this case an array)
        //             alert("Success");
        //         },
        //         error: function () {
        //             alert("Error");
        //         }
        //     });
        // })
    })
    const termsLink = <Link to={'/terms'}>terms and conditions</Link>
    const [formName, setFormName] = useState('')
    const [formCountry, setFormCountry] = useState('')
    const [formEmail, setFormEmail] = useState('')
    const [formPhone, setFormPhone] = useState('')
    const [termsCheck, setTermsCheck] = useState(false)
    const inputTermsCheck = useRef(null);
    const [message, setMessage] = useState(null)
    const [showReqMessage, setShowReqMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!termsCheck) {
            setShowReqMessage(true)
            return
        }
        setShowReqMessage(false)
        setLoading(true)
        const url = 'https://meek-hint.flywheelsites.com/wp-json/gf/v2/entries'
        const data = {
            'form_id': 2,
            '8': brokerName,
            '1': formName,
            '3': formCountry,
            '11': formEmail,
            '12': formPhone,
            '6.1': `I hereby accept that my data is sent to ${brokerName} and agree to the terms and conditions of wecomparebrokers and ${brokerName}`
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + base64.encode('ck_5ca5ca00f9399ba135f371f70b4f5c8d687b8005' + ":" + 'cs_cc05ffea5f0f673c02a868c8a34021578775c359'));

        const getMessage = () => {
            fetch('https://meek-hint.flywheelsites.com/wp-json/gf/v2/forms/2', { method: 'GET', headers: headers })
                .then(response => response.json())
                .then(data => {
                    setLoading(false)
                    setFormName('')
                    setFormCountry('')
                    setFormEmail('')
                    setFormPhone('')
                    setTermsCheck(false)
                    return setMessage(data.confirmations[Object.entries(data.confirmations)[0][0]]['message'])
                })
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            credentials: 'include',
            headers: headers
        })
            .then(response => response.json())
            .then(() => getMessage())
    }

    return (
        <div id="callback-form-wrap">
            {loading && (
                <div className='callback-form--loading'>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'rgb(255 255 255 / 19%)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g transform="rotate(0 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(30 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(60 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(90 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(120 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(150 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(180 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(210 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(240 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(270 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(300 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                            </rect>
                        </g><g transform="rotate(330 50 50)">
                            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#2a79ff">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                    </svg>
                </div>
            )}
            <div id="callback-form">
                <span className="close"><i className="fa fa-times" aria-hidden="true"></i></span>
                <h4 className="callback-form--heading">{`Get Further Details About ${brokerName} To Your Inbox`}</h4>
                {message && <h1 className='callback-form--message'>{message}</h1>}
                <form method="post" enctype="multipart/form-data" onSubmit={(e) => handleSubmit(e)} target="gform_ajax_frame_2" id="gform_2">
                    <div class="gform_body">
                        <ul id="gform_fields_2" class="gform_fields top_label form_sublabel_below description_below">
                            <li id="field_2_8" class="gfield gform_hidden field_sublabel_below field_description_below gfield_visibility_visible">
                                <input name="input_8" id="input_2_8" type="hidden" class="gform_hidden" aria-invalid="false" value={brokerName} />
                            </li>
                            <li id="field_2_1" class="gfield field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                                <label class="gfield_label" for="input_2_1">Name</label>
                                <div class="ginput_container ginput_container_text">
                                    <input name="input_1" id="input_2_1" type="text" class="large" value={formName} onChange={e => setFormName(e.target.value)} placeholder="Name" aria-invalid="false" />
                                </div>
                            </li>
                            <li id="field_2_3" class="gfield field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                                <label class="gfield_label" for="input_2_3">Country</label>
                                <div class="ginput_container ginput_container_select">
                                    <select value={formCountry} onChange={e => setFormCountry(e.target.value)} name="input_3" id="input_2_3" class="large gfield_select" aria-invalid="false" tabindex="-1" aria-hidden="true">
                                        <option value="" selected="selected" class="gf_placeholder">Country</option>
                                        {country_list.map(country => <option value={country}>{country}</option>)}
                                    </select>
                                </div>
                            </li>
                            <li id="field_2_11" class="gfield field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                                <label class="gfield_label" for="input_2_11">Email</label>
                                <div class="ginput_container ginput_container_email">
                                    <input value={formEmail} onChange={e => setFormEmail(e.target.value)} name="input_11" id="input_2_11" type="text" class="large" placeholder="Email Address" aria-invalid="false" />
                                </div>
                            </li>
                            <li id="field_2_12" class="gfield field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                                <label class="gfield_label" for="input_2_12">Phone</label>
                                <div class="ginput_container ginput_container_phone">
                                    <input value={formPhone} onChange={e => setFormPhone(e.target.value)} name="input_12" id="input_2_12" type="text" class="large" placeholder="Phone" aria-invalid="false" />
                                </div>
                            </li>
                            <li id="field_2_6" class="gfield gfield_contains_required field_sublabel_below field_description_below hidden_label gfield_visibility_visible">
                                <label class="gfield_label" style={showReqMessage ? { color: 'red' } : {}}>Accept Terms<span class="gfield_required">*</span></label>
                                <div class="ginput_container ginput_container_checkbox">
                                    <ul class="gfield_checkbox" id="input_2_6">
                                        <li class="gchoice_2_6_1 callback-form--terms">
                                            <input name="input_6.1" id='' type="checkbox" ref={inputTermsCheck} checked={termsCheck} onClick={() => setTermsCheck(!termsCheck)} value={`I hereby accept that my data is sent to ${brokerName} and agree to the terms and conditions of wecomparebrokers and ${brokerName}`} id="choice_2_6_1" />
                                            <label for="choice_2_6_1" id="label_2_6_1" style={showReqMessage ? { color: 'red' } : {}}>I hereby accept that my data is sent to {brokerName} and agree to the {termsLink} of wecomparebrokers and {brokerName}</label>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="gform_footer top_label">
                        <input type="submit" id="gform_submit_button_2" class="gform_button button btn callback-form--submit" value="Send Info" />
                        <input type="hidden" name="gform_ajax" value="form_id=2&amp;title=&amp;description=&amp;tabindex=0" />
                        <input type="hidden" class="gform_hidden" name="is_submit_2" value="1" />
                        <input type="hidden" class="gform_hidden" name="gform_submit" value="2" />

                        <input type="hidden" class="gform_hidden" name="gform_unique_id" value="" />
                        <input type="hidden" class="gform_hidden" name="state_2" value="WyJbXSIsImQ2ZDg2YWUyMTUzYzk5ODM3ZDBmNzE5Njc3NDAzMGI0Il0=" />
                        <input type="hidden" class="gform_hidden" name="gform_target_page_number_2" id="gform_target_page_number_2" value="0" />
                        <input type="hidden" class="gform_hidden" name="gform_source_page_number_2" id="gform_source_page_number_2" value="1" />
                        <input type="hidden" name="gform_field_values" value="" />
                    </div>
                </form>
            </div>
        </div>
    )
}
