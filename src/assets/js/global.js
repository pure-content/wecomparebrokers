import "../assets/js/jquery-3.5.1.min.js";
(function($) {

    $(document).ready(function() {

        //Remove placeholder on click
        $("input, textarea").each(function() {
            $(this).data('holder', $(this).attr('placeholder'));

            $(this).focusin(function() {
                $(this).attr('placeholder', '');
            });

            $(this).focusout(function() {
                $(this).attr('placeholder', $(this).data('holder'));
            });
        });

        //Disable search button
        $('#searchsubmit').attr('disabled', true);
        $('#s').keyup(function() {
            if ($(this).val().length != 0)
                $('#searchsubmit').attr('disabled', false);
            else
                $('#searchsubmit').attr('disabled', true);
        });

        // soc slider init
        if ($('.soc-slider') != '') {
            $('.soc-slider').slick({
                arrows: true,
                dots: false,
                autoplay: true,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1281,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 451,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ],
            });
        }

        $('#main-form #country').select2({
            placeholder: 'Preferred Trading Region',
            allowClear: true
        });
        $('#main-form #instrument').select2({
            placeholder: 'Broker Type',
            minimumResultsForSearch: Infinity,
            allowClear: true
        });
        // $('#main-form #type').select2({
        // 	placeholder: 'Trading Type',
        // 	minimumResultsForSearch : Infinity,
        // 	allowClear : true
        // });
        // $('#main-form #platform').select2({
        // 	placeholder: 'Platform',
        // 	minimumResultsForSearch : Infinity,
        // 	allowClear : true
        // });

        $('#first-usr').select2({
            placeholder: 'First Broker',
            allowClear: true
        });
        $('#sec-usr').select2({
            placeholder: 'Second Broker',
            allowClear: true
        });
        $('#popup-sec-usr').select2({
            placeholder: 'Second Broker',
            allowClear: true
        });
        $('#sec-usr-add').select2({
            placeholder: 'Second Broker',
            allowClear: true
        });
        $('#comp-dropdown').select2({
            placeholder: 'Select a category',
            minimumResultsForSearch: Infinity
        });
        $('#thread_broker').select2({
            placeholder: 'Select a broker',
        });
        $('#bbpress-forums fieldset.bbp-form select').select2({
            minimumResultsForSearch: Infinity
        });
        $('.form-row-wrap .gform_wrapper ul.gform_fields li.gfield select').select2();

        jQuery(document).on('gform_post_render', function(event, form_id, current_page) {

            $('.form-row-wrap .gform_wrapper ul.gform_fields li.gfield select').select2();

        });

        $('.compare-btn').click(function() {
            var brokId = $(this).attr('data-id');
            $('#first-user').val(brokId);
            $('#compare-form-wrap').fadeIn('fast');
        });
        $('#compare-form .close').click(function() {
            $('#compare-form-wrap').fadeOut('fast');
        });

        $('.compare-btn-add').click(function() {
            var brokId = $(this).attr('data-id');
            $('#first-user-add').val(brokId);
        });


        //hp tabs
        $('.tab-nav ul li').click(function() {
            var currentHash = $(this).attr('data-attr');
            $(this).siblings().removeClass('active');
            $('.tab-body .tab-body-itm').fadeOut('fast');
            $(this).addClass('active');
            $('#' + currentHash).fadeIn('fast');
        });
        // single broker tab
        $('.type-wrap .type-itm').click(function() {
            var currentHash = $(this).attr('data-id');
            $(this).siblings().removeClass('active');
            $('.tab-body .tab-body-itm').hide('fast');
            $(this).addClass('active');
            $('#tab-' + currentHash).show('fast');
        });

        //smoth scroling
        var $root = $('html, body');

        $('a[href^="#"]').click(function() {
            $root.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);

            return false;
        });

        if ($('.small-chart') != '') {
            $('.small-chart').easyPieChart({
                size: 84,
                barColor: '#2A79FF',
                trackColor: '#F6F7F8',
                scaleColor: false,
                lineWidth: 5,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
            });
        }

        if ($('.big-chart') != '') {
            $('.big-chart').easyPieChart({
                barColor: '#2A79FF',
                trackColor: '#F6F7F8',
                scaleColor: false,
                lineWidth: 8,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
            });
        }

        //get first 4 elements from list
        $('.brok-info-wrap').each(function() {
            var list = $(this).find('.list-cont'),
                listItems = list.find('li').slice(0, 4);
            $(this).find('.advant-list').append(listItems);
        });

        //broker floating button descktop
        if ($(window).innerWidth() > 1024) {
            var wH = $(window).height() + 32,
                bH = $('.broker-floating-btn .btn').height() + 2,
                offset = (wH - bH) / 2 - 40;
            // console.log(wH, bH, offset);
            $('.rev-nav-col .broker-floating-btn').stick_in_parent({
                parent: '.review-cols',
                inner_scrolling: false,
                offset_top: offset,
            });
        }
        //broker floating button mobile
        if ($(window).innerWidth() < 641) {
            $('.broker-floating-btn').stick_in_parent({
                parent: '.single-broker-wrap',
                inner_scrolling: false,
                offset_top: 20,
            });
        }

        $('.comp-rev-tab .tab-heading p').click(function() {
            $(this).parent().parent().parent().toggleClass('tab-collapsed');
        });

        $('input[name="comp_cat"]').click(function() {
            var opt = $(this).val(),
                optText = $(this).next().html();
            // console.log(opt);
            $('.option-descr').slideUp();
            $('.options-text-wrap #' + opt).slideDown();
            $('.helpful-radio').show(500);
            $('#comp-cat').val(optText);
        });

        $('.complaint-radio .complaint-radio__item input').click(function() {
            var radioChecked = $(this).attr('id');
            if (radioChecked == 'helpful_yes') {
                $('.cma-form-container').hide(500);
                $('.thank-you-wrapper').show(500);
            } else {
                $('.thank-you-wrapper').hide(500);
                $('.cma-form-container').show(500);
            }
        });

        if ($('form#cma-thread-add') != '') {
            var form = $('form#cma-thread-add');
            form.validate({
                // Specify validation rules
                rules: {
                    thread_title: 'required',
                    thread_broker: 'required',
                    thread_comment: 'required',
                    thread_user_nick: 'required',
                    thread_user_email: 'required',
                },
                // Specify validation error messages
                messages: {
                    thread_title: '',
                    thread_broker: '',
                    thread_comment: '',
                    thread_user_nick: '',
                    thread_user_email: '',
                },

                //When there is an error normally you just add the class to the element.
                // But in the case of select2s you must add it to a UL to make it visible.
                // The select element, which would otherwise get the class, is hidden from
                // view.
                highlight: function(element, errorClass, validClass) {
                    var elem = $(element);
                    // console.log(errorClass);
                    if (elem.hasClass('select2-hidden-accessible')) {
                        $('.select2').find('[aria-labelledby="select2-' + elem.attr('id') + '-container"]').addClass('select2-error');
                    } else {
                        elem.addClass(errorClass);
                    }
                },

                //When removing make the same adjustments as when adding
                unhighlight: function(element, errorClass, validClass) {
                    var elem = $(element);
                    if (elem.hasClass('select2-hidden-accessible')) {
                        $('.select2').find('[aria-labelledby="select2-' + elem.attr('id') + '-container"]').removeClass('select2-error');
                    } else {
                        elem.removeClass(errorClass);
                    }
                },

                //Make sure the form is submitted to the destination defined
                //in the "action" attribute of the form when valid
                submitHandler: function(form) {
                    if (grecaptcha.getResponse()) {
                        form.submit();
                    }
                }
            });

            $('#comp-submit').click(function() {
                if (grecaptcha.getResponse().length === 0 && form.valid() == true) {
                    $('#summary').addClass('summary-err');
                    $('.summary-err').html('Please confirm captcha to proceed');
                } else if (grecaptcha.getResponse().length !== 0 && form.valid() == false) {
                    $('#summary').addClass('summary-err');
                    $('.summary-err').html('There was a problem with your submission. Errors have been highlighted below.');
                } else if (grecaptcha.getResponse().length === 0 && form.valid() == false) {
                    $('#summary').addClass('summary-err');
                    $('.summary-err').html('There was a problem with your submission. Errors have been highlighted below.<br>Please confirm captcha to proceed.');
                }
            });
        }

        //A select2 visually resembles a textbox and a dropdown.  A textbox when
        //unselected (or searching) and a dropdown when selecting. This code makes
        //the dropdown portion reflect an error if the textbox portion has the
        //error class. If no error then it cleans itself up.
        $(document).on('#cma-thread-add select2:select', function(arg) {
            var elem = $(arg.target);
            if ($('.select2').find('[aria-labelledby="select2-' + elem.attr('id') + '-container"]').hasClass('select2-error')) {
                //jquery checks if the class exists before adding.
                $('.select2').find('[aria-labelledby="select2-' + elem.attr('id') + '-container"]').removeClass('select2-error');
            }
        });

        // auto-remove info messages
        var msgBlock = $('.success-msg');
        setTimeout(function() {
            msgBlock.fadeOut('fast');
        }, 3000);

    });

    $(window).load(function() {

        //jQuery code goes here
        $('#broker-name').keyup(debounce(function() {
            var count = $(this).val().length;

            if (count > 3) {
                $('.inp-popup').fadeIn();
                brokCall();
                // console.log(brokName, good, banned);
            } else {
                $('.inp-popup').fadeOut();
            }
        }, 500));

        $('.check-wrap input').click(function() {
            $('.inp-popup').fadeIn();
            brokCall();
            // console.log(brokName, good, banned);
        });

        $('.inp-wrap').click(function(e) {
            e.stopPropagation();
        });

        $('.check-wrap').click(function(e) {
            e.stopPropagation();
        });

        $(document).click(function() {
            $('.inp-popup').fadeOut();
        });

        async function fetchCountryCodes() {
            var promise = await fetch('https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json');
            var myCountryCodes = await promise.json()
            return myCountryCodes;
        }

        var countryCodes = {
            'Afghanistan': '93',
            'Åland Islands': '358',
            'Albania': '355',
            'Algeria': '213',
            'American Samoa': '684',
            'Andorra': '376',
            'Angola': '244',
            'Antigua and Barbuda': '1-268',
            'Argentina': '54',
            'Armenia': '374',
            'Australia': '61',
            'Austria': '43',
            'Azerbaijan': '994',
            'Bahamas': '1-242',
            'Bahrain': '973',
            'Bangladesh': '880',
            'Barbados': '1-246',
            'Belarus': '375',
            'Belgium': '32',
            'Belize': '501',
            'Benin': '229',
            'Bermuda': '10441',
            'Bhutan': '975',
            'Bolivia': '591',
            'Bosnia and Herzegovina': '387',
            'Botswana': '267',
            'Brazil': '55',
            'Brunei': '673',
            'Bulgaria': '359',
            'Burkina Faso': '226',
            'Burundi': '257',
            'Cambodia': '855',
            'Cameroon': '237',
            'Canada': '1',
            'Cape Verde': '238',
            'Cayman Islands': '1-345',
            'Central African Republic': '236',
            'Chad': '235',
            'Chile': '56',
            'China': '86',
            'Colombia': '57',
            'Comoros': '269',
            'Congo, Democratic Republic of the': '243',
            'Congo, Republic of the': '242',
            'Costa Rica': '506',
            'Côte d\'Ivoire': '225',
            'Croatia': '385',
            'Cuba': '53',
            'Cyprus': '357',
            'Czech Republic': '420',
            'Denmark': '45',
            'Djibouti': '253',
            'Dominica': '1-767',
            'Dominican Republic': '1-809',
            'East Timor': '670',
            'Ecuador': '593',
            'Egypt': '20',
            'El Salvador': '503',
            'Equatorial Guinea': '240',
            'Eritrea': '291',
            'Estonia': '372',
            'Ethiopia': '251',
            'Fiji': '679',
            'Finland': '358',
            'France': '33',
            'French Polynesia': '689',
            'Gabon': '241',
            'Gambia': '220',
            'Georgia': '995',
            'Germany': '49',
            'Ghana': '233',
            'Greece': '30',
            'Greenland': '299',
            'Grenada': '1-473',
            'Guam': '1-671',
            'Guatemala': '502',
            'Guinea': '224',
            'Guinea-Bissau': '245',
            'Guyana': '592',
            'Haiti': '509',
            'Honduras': '504',
            'Hong Kong': '852',
            'Hungary': '36',
            'Iceland': '354',
            'India': '91',
            'Indonesia': '62',
            'Iran': '98',
            'Iraq': '964',
            'Ireland': '353',
            'Israel': '972',
            'Italy': '39',
            'Jamaica': '1-876',
            'Japan': '81',
            'Jordan': '962',
            'Kazakhstan': '7',
            'Kenya': '254',
            'Kiribati': '686',
            'North Korea': '850',
            'South Korea': '82',
            'Kosovo': '381',
            'Kuwait': '965',
            'Kyrgyzstan': '996',
            'Laos': '856',
            'Latvia': '371',
            'Lebanon': '961',
            'Lesotho': '266',
            'Liberia': '231',
            'Libya': '218',
            'Liechtenstein': '423',
            'Lithuania': '370',
            'Luxembourg': '352',
            'Macedonia': '389',
            'Madagascar': '261',
            'Malawi': '265',
            'Malaysia': '60',
            'Maldives': '960',
            'Mali': '223',
            'Malta': '356',
            'Marshall Islands': '692',
            'Mauritania': '222',
            'Mauritius': '230',
            'Mexico': '52',
            'Micronesia': '691',
            'Moldova': '373',
            'Monaco': '377',
            'Mongolia': '976',
            'Montenegro': '382',
            'Morocco': '212',
            'Mozambique': '258',
            'Myanmar': '95',
            'Namibia': '264',
            'Nauru': '674',
            'Nepal': '977',
            'Netherlands': '31',
            'New Zealand': '64',
            'Nicaragua': '505',
            'Niger': '227',
            'Nigeria': '234',
            'Norway': '47',
            'Northern Mariana Islands': '1-670',
            'Oman': '968',
            'Pakistan': '92',
            'Palau': '680',
            'Palestine': '970',
            'Panama': '507',
            'Papua New Guinea': '675',
            'Paraguay': '595',
            'Peru': '51',
            'Philippines': '63',
            'Poland': '48',
            'Portugal': '351',
            'Puerto Rico': '1-939',
            'Qatar': '974',
            'Romania': '40',
            'Russia': '7',
            'Rwanda': '250',
            'Saint Kitts and Nevis': '1-869',
            'Saint Lucia': '1-758',
            'Saint Vincent and the Grenadines': '1-784',
            'Samoa': '685',
            'San Marino': '378',
            'Sao Tome and Principe': '239',
            'Saudi Arabia': '966',
            'Senegal': '221',
            'Serbia and Montenegro': '381',
            'Seychelles': '248',
            'Sierra Leone': '232',
            'Singapore': '65',
            'Slovakia': '421',
            'Slovenia': '386',
            'Solomon Islands': '677',
            'Somalia': '252',
            'South Africa': '27',
            'Spain': '34',
            'Sri Lanka': '94',
            'Sudan': '249',
            'Sudan, South': '211',
            'Suriname': '597',
            'Swaziland': '268',
            'Sweden': '46',
            'Switzerland': '41',
            'Syria': '963',
            'Taiwan': '886',
            'Tajikistan': '992',
            'Tanzania': '255',
            'Thailand': '66',
            'Togo': '228',
            'Tonga': '676',
            'Trinidad and Tobago': '1-868',
            'Tunisia': '216',
            'Turkey': '90',
            'Turkmenistan': '993',
            'Tuvalu': '688',
            'Uganda': '256',
            'Ukraine': '380',
            'United Arab Emirates': '971',
            'United Kingdom': '44',
            'United States': '1',
            'Uruguay': '598',
            'Uzbekistan': '998',
            'Vanuatu': '678',
            'Vatican City': '379',
            'Venezuela': '58',
            'Vietnam': '84',
            'Virgin Islands, British': '1-284',
            'Virgin Islands, U.S.': '1-340',
            'Yemen': '967',
            'Zambia': '260',
            'Zimbabwe': '263'
        };
        var telephoneForm = document.querySelector('.telephone-form input');
        var countrysForm = $('#select2-input_2_3-container');

        if (telephoneForm) {

            $("#select2-input_2_3-container").on('DOMSubtreeModified', async function() {
                var country = $(this).html();
                var countryArray = await fetchCountryCodes();

                var res = countryArray.find(function(element, index) {
                    if (element.name == country) {
                        return element
                    }
                })
                res !== undefined ? telephoneForm.value = res['dial_code'] : telephoneForm.value = '';

            });
        }

    });

    $(window).resize(function() {

        if ($(window).innerWidth() > 1024) {
            var wH = $(window).height() + 32,
                bH = $('.broker-floating-btn .btn').height() + 2,
                offset = (wH - bH) / 2 - 40;
            // console.log(wH, bH, offset);
            $('.rev-nav-col .broker-floating-btn').stick_in_parent({
                parent: '.review-cols',
                inner_scrolling: false,
                offset_top: offset,
            });
        } else {
            $('.rev-nav-col .broker-floating-btn').trigger('sticky_kit:detach');
        }
        $('.form-row-wrap .gform_wrapper ul.gform_fields li.gfield select').select2();
    });

    function brokCall() {
        brokName = $('#broker-name').val(),
            good = $('#good').is(':checked') ? 'good' : '',
            banned = $('#banned').is(':checked') ? 'banned' : '';

        var data = {
            action: "my_ajax_filter_search",
            brokName: brokName,
            good: good,
            banned: banned
        }

        $.ajax({
            url: site_domain.site_domain_url,
            method: 'POST',
            data: data,

            success: function(response) {
                var res = JSON.parse(response);
                $('.inp-popup').html(res.result);
                // console.log( res.result );
                // console.log( res.args );
                // console.log( res.banned );
            }
        });
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };



    window.almComplete = function(alm) {
        if ($('.small-chart') != '') {
            $('.small-chart').easyPieChart({
                size: 84,
                barColor: '#2A79FF',
                trackColor: '#F6F7F8',
                scaleColor: false,
                lineWidth: 5,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
            });
        }

        $('.alm-reveal .broker-tab-col').matchHeight();
    };

    $('.left_banner_dropdown, .right_banner_dropdown').on('click', function() {
        console.log('click')
        $(this).find('.banner_body').slideToggle('fast');
        $(this).toggleClass('open');
    })

}(jQuery));