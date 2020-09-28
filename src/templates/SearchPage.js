import React, { useState, useEffect } from "react"
import $ from "jquery"
import "jquery-match-height"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Parser from "html-react-parser"
import Helmet from "react-helmet"
import CompareFrom from "../components/CompareFrom"
import withLocation from "../hoc/withLocation"

function SearchPage({ search }) {
    const info = useStaticQuery(graphql`
        query {
            wpgraphql {
                brokers123( first: 10000 where: { health: "good", orderby: { field: MENU_ORDER, order: DESC } } ){
                    nodes {
                        uri
                        title
                        id
                        databaseId
                        featuredImage {
                          node {
                            mediaItemUrl
                          }
                        }
                        cptBrokers {
                          brokerType
                          ratingCommFees
                          ratingCustResearch
                          ratingCustServ
                          ratingEase
                          ratingMobTrad
                          ratingPlatfTools
                          likesList
                          tabButtonAlternativeText
                          brokerRegion
                          specialOffer
                          affiliateLink
                          minDeposit
                          platformsList
                          accountsList
                          spreadsList
                          methodsList
                          takeMeToBrokerButtonNoteText
                          ourScore
                          allSpreadsPoints
                          tableInfo
                          platformRelation {
                            ... on WPGraphQL_Platform123 {
                              id
                              title
                              featuredImage {
                                node {
                                  mediaItemUrl
                                  srcSet(size: BROKERS_LIST_THUMB)
                                  sizes(size: BROKERS_LIST_THUMB)
                                }
                              }
                            }
                          }
                        }
                    }
                }

                brokerComparisons123(first: 1000) {
                    nodes {
                        title
                        uri
                    }
                }

                posts(first: 1000) {
                    nodes {
                        title
                        uri
                        featuredImage {
                            node {
                                mediaItemUrl
                                srcSet(size: BROKERS_LIST_THUMB)
                                sizes(size: BROKERS_LIST_THUMB)
                            }
                        }
                    }
                }

                comparisons123(first: 1000) {
                    nodes {
                        title
                        uri
                    }
                }

                forexMarketNews123(first: 1000) {
                    nodes {
                      uri
                      title
                      featuredImage {
                        node {
                            mediaItemUrl
                            srcSet(size: BROKERS_LIST_THUMB)
                            sizes(size: BROKERS_LIST_THUMB)
                        }
                      }
                    }
                }

                pages(first: 1000) {
                    nodes {
                      title
                      uri
                      featuredImage{
                        node {
                            mediaItemUrl
                            srcSet(size: BROKERS_LIST_THUMB)
                            sizes(size: BROKERS_LIST_THUMB)
                        }
                      }
                    }
                }

                topBrokers123(first: 1000) {
                    nodes {
                      uri
                      title
                      featuredImage {
                        node {
                          mediaItemUrl
                          srcSet(size: BROKERS_LIST_THUMB)
                          sizes(size: BROKERS_LIST_THUMB)
                        }
                      }
                    }
                }
            }
        }
    `)

    const searchString = search.s
    const allData = [].concat(info.wpgraphql.brokers123.nodes,
        info.wpgraphql.brokerComparisons123.nodes,
        info.wpgraphql.posts.nodes,
        info.wpgraphql.comparisons123.nodes,
        info.wpgraphql.forexMarketNews123.nodes,
        info.wpgraphql.pages.nodes,
        info.wpgraphql.topBrokers123.nodes
    )
    // [...info.wpgraphql.brokers123.nodes,
    // ...info.wpgraphql.brokerComparisons123.nodes,
    // ...info.wpgraphql.posts.nodes,
    // ...info.wpgraphql.comparisons123.nodes,
    // ...info.wpgraphql.forexMarketNews123.nodes,
    // ...info.wpgraphql.pages.nodes,
    // ...info.wpgraphql.topBrokers123.nodes
    // ]
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(24)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    const brokerSorter = () => {
        if (Object.keys(search).length > 0) {
            const sortedData = allData.filter(eachData => {
                if (eachData.title.includes(searchString)) {
                    return eachData
                }
            })
            return sortedData
        }
        const sortedData = allData
        return sortedData
    }

    const currentResult = brokerSorter().slice(indexOfFirstPost, indexOfLastPost)

    // const ResultTableItem = (props) => {
    //     const {res} = props
    //     const class_for_arrow = res
    //     return (
    //         <div class="row collapse broker-wrap">
    //             <div class="broker-tab-col img-col">
    //                 <?php //$broker_img = get_the_post_thumbnail_url(get_the_ID(),'brokers-list-thumb'); ?>
    //                 <div class="thumb-wrap" >
    //                     <?php if (get_the_post_thumbnail()): ?>
    //                         <?php the_post_thumbnail('brokers-list-thumb'); ?>
    //                     <?php else: ?>
    //                         <img class="img-list-default" src="<?php echo get_stylesheet_directory_uri(); ?>/images/generic-logo.png" alt="WCB Logo">
    //                     <?php endif; ?>
    //                 </div>
    //             </div>
    //             <?php
    //             $class_for_arrow = '';

    //             if($post_type !== 'brokers') {
    //                 $class_for_arrow = 'not-broker';
    //             } else { 
    //                 $class_for_arrow = '';
    //             } ?>
    //             <div class="broker-tab-col broker-name <?php echo $class_for_arrow;?>">
    //                 <?php if ($platf) {
    //                     echo $platf_thumb;
    //                 } ?>
    //                 <h3><?php the_title(); ?></h3>
    //                 <!-- <?php if (get_field('affiliate_link')): ?>
    //                     <a href="<?php the_field('affiliate_link'); ?>" target="_blank">
    //                         <span><?php the_field('broker_link'); ?></span>
    //                     </a>
    //                 <?php endif ?> -->
    //             </div>

    //             <div class="broker-tab-col broker-content <?php echo $class_for_arrow;?>">
    //                 <?php if($post_type == 'brokers'):?>
    //                 <div class="points-col broker-content-col text-center">
    //                     <div class="wrap">
    //                         <p class="val"><?php the_field('all_spreads_points'); ?></p>
    //                         <p><?php _e('Spreads:', 'foundation'); ?></p>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('See All Spreads', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <div class="min-dep-col broker-content-col text-center">
    //                     <div class="wrap">
    //                         <p class="val"><?php the_field('min_deposit'); ?></p>
    //                         <p><?php _e('Min. deposit', 'foundation'); ?></p>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('Learn More', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <div class="platf-col broker-content-col text-center">
    //                     <div class="wrap" data-mh="cont-col">
    //                         <?php
    //                         $values = get_field('platforms_list');
    //                         $field = get_field_object('platforms_list');
    //                         $choices = $field['choices'];
    //                         echo '<ul>';
    //                         foreach ($choices as $value => $label) {
    //                             if ($values && in_array($value, $values)) {
    //                                 echo '<li class="checked">';
    //                             } else {
    //                                 echo '<li>';
    //                             }
    //                             echo $label . '</li>';
    //                         }
    //                         echo '</ul>';
    //                         ?>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('See Platforms', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <div class="acc-col broker-content-col text-center">
    //                     <div class="wrap" data-mh="cont-col">
    //                         <?php
    //                         $values = get_field('accounts_list');
    //                         $field = get_field_object('accounts_list');
    //                         $choices = $field['choices'];
    //                         echo '<ul>';
    //                         foreach ($choices as $value => $label) {
    //                             if ($values && in_array($value, $values)) {
    //                                 echo '<li class="checked">';
    //                             } else {
    //                                 echo '<li>';
    //                             }
    //                             echo $label . '</li>';
    //                         }
    //                         echo '</ul>';
    //                         ?>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('See Accounts', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <div class="spreads-col broker-content-col text-center">
    //                     <div class="wrap" data-mh="cont-col">
    //                         <?php
    //                         $values = get_field('spreads_list');
    //                         $field = get_field_object('spreads_list');
    //                         $choices = $field['choices'];
    //                         echo '<ul>';
    //                         foreach ($choices as $value => $label) {
    //                             if ($values && in_array($value, $values)) {
    //                                 echo '<li class="checked">';
    //                             } else {
    //                                 echo '<li>';
    //                             }
    //                             echo $label . '</li>';
    //                         }
    //                         echo '</ul>';
    //                         ?>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('See Spreads', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <div class="methods-col broker-content-col text-center">
    //                     <div class="wrap" data-mh="cont-col">
    //                         <?php
    //                         $values = get_field('methods_list');
    //                         $field = get_field_object('methods_list');
    //                         $choices = $field['choices'];
    //                         echo '<ul>';
    //                         foreach ($choices as $value => $label) {
    //                             if ($values && in_array($value, $values)) {
    //                                 echo '<li class="checked">';
    //                             } else {
    //                                 echo '<li>';
    //                             }
    //                             echo $label . '</li>';
    //                         }
    //                         echo '</ul>';
    //                         ?>
    //                     </div>
    //                     <?php if (get_field('affiliate_link')): ?>
    //                         <a href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('See Methods', 'foundation'); ?></a>
    //                     <?php endif; ?>
    //                 </div>
    //                 <?php endif; ?>
    //             </div>

    //             <div class="broker-tab-col btn-col">
    //                 <?php if (get_field('affiliate_link')): ?>
    //                     <!-- <a class="btn small" href="<?php the_field('affiliate_link'); ?>" target="_blank"><?php _e('Take Me To Broker', 'foundation'); ?></a> -->
    //                     <?php if (get_field('affiliate_link') && !get_field('tab_button_alternative_text')): ?>
    //                         <span class="aff-wrap">
    //                             <a class="btn small" href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php _e('Take Me To Broker', 'foundation'); ?></a>
    //                             <?php if (get_field('take_me_to_broker_button_note_text')): ?>
    //                                 <span class="floating-note"><?php the_field('take_me_to_broker_button_note_text'); ?></span>
    //                             <?php endif; ?>
    //                         </span>
    //                     <?php elseif (get_field('affiliate_link') && get_field('tab_button_alternative_text')): ?>
    //                         <span class="aff-wrap">
    //                             <a class="btn small" href="<?php the_field('affiliate_link'); ?>" target="_blank" rel="nofollow sponsored"><?php the_field('tab_button_alternative_text'); ?></a>
    //                             <?php if (get_field('take_me_to_broker_button_note_text')): ?>
    //                                 <span class="floating-note"><?php the_field('take_me_to_broker_button_note_text'); ?></span>
    //                             <?php endif; ?>
    //                         </span>
    //                     <?php endif; ?>
    //                 <?php endif; ?>
    //                 <!-- <span data-id="<?php //echo $post->ID; ?>" data-fancybox data-src="#compare-form" class="btn small compare-btn"><?php //_e('Compare Broker', 'foundation'); ?></span> -->
    //                 <?php if($post_type == 'brokers'):?>
    //                     <span data-id="<?php echo $post->ID; ?>" class="btn small compare-btn"><?php _e('Compare Brokers Side by Side', 'foundation'); ?></span>
    //                 <?php endif; ?>
    //                 <?php $more_text = $post_type !== 'brokers' ? __('Read article', 'foundation') : __('Read Full Review', 'foundation'); ?>
    //                 <a class="btn small" href="<?php the_permalink(); ?>"><?php echo $more_text; ?></a>

    //             </div>
    //         </div>
    //     )
    // }

    return (
        <Layout>
            <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title='You searched for'
            />
            <CompareFrom />
            <div class="row search-row">
                <div class="large-12 columns">
                    <h3 class="archive-title">Search results for: <strong>{search.s}</strong></h3>
                    <div class="row brokers-list">
                        <div class="small-12 columns">
                            {/* {currentResult.map(res => (
                                <ResultTableItem res={res} />
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
export default withLocation(SearchPage)