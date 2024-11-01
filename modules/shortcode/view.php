<?php

add_shortcode('pi_ifg', 'pi_ifg');

function pi_ifg($atts)
{
	global $post;

	$aInstagram = get_option('_pi_instagram_settings');
	$aInstagram = $aInstagram ? $aInstagram : array('userid' => '', 'access_token' => '');

	$atts = shortcode_atts( array(
		'pi_tiled_gallery_limit'	  => 20,
		'pi_slideshow_limit'		  => 20,
        'pi_style'                    => 'tiled_gallery',
        'pi_slideshow_autoplay'       => false,
        'pi_slideshow_auto_height'	  => false,
        'pi_slideshow_single_item'    => false,
        'pi_slideshow_items'          => 5,
        'pi_slideshow_items_desktop'  => 5,
        'pi_slideshow_items_tablet'   => 2,
        'pi_slideshow_items_mobile'   => 2,
		'pi_user_id'				  => '',
		'pi_image_ids'				  => '',
		'pi_type' 					  => 'flickr',
		'pi_photo_set'				  => '',
		'flickr_photo_id'			  => 20,
		'pi_max_width'				  => '',
		'pi_instagram_client_id'	  => '',
		'pi_instagram_user_id'						=> '',
		'pi_instagram_access_token'				=> '',
		'pi_instagram_get'						 		=> 'popular',
		'pi_instagram_tagname'					 	=> '',
		'pi_thumbnail_label'					 		=> false,
		'pi_color_scheme'						 			=> 'none',
		'pi_item_selectable'					 		=> false,
		'pi_album_id'							 				=> '',
		'pi_sort_album'							 			=> 'standard',
		'pi_maximun_width'						 		=> '100%',
		 // Justified gallery
		'pi_rowheight' 							 			=> 120,
		'pi_maxrowheight' 						 		=> '200%',
		'pi_fixedheight' 						 			=> false,
		'pi_lastrow' 						 	 				=> 'nojustify',
		'pi_showcaption'					     		=> true,
		'pi_randomize'							 			=> false,
		'pi_margin'							 	 				=> 1
	), $atts);

	if ( empty($atts['pi_instagram_access_token']) )
	{
		 $atts['pi_instagram_access_token'] = $aInstagram['access_token'];
	}

	if ( empty($atts['pi_instagram_user_id']) )
	{
		 $atts['pi_instagram_user_id'] = $aInstagram['userid'];
	}

	if ( empty($atts['pi_instagram_client_id']) )
	{
		 $atts['pi_instagram_client_id'] = $aInstagram['userid'];
	}

	if ( $atts['pi_slideshow_auto_height'] == 'false' || $atts['pi_slideshow_auto_height'] ==  false)
	{
		$cssClass = 'wiloke-gallery-not-auto-height';
	}else{
		$cssClass = '';
	}

	if ( $atts['pi_type'] != 'custom' )
	{

		if ( $atts['pi_style'] == 'tiled_gallery' )
		{
			$atts['limit'] = $atts['pi_tiled_gallery_limit'];
		}else{
			$atts['limit'] = $atts['pi_slideshow_limit'];
		}

		$output = "<div class='pi_".esc_attr($atts['pi_style'])." ".esc_attr($atts['pi_type'])." pi_wiloke_gallery pi-pswp ".esc_attr($cssClass)."' data-settings='".(json_encode($atts))."'></div>";
	}else{
		$imgs = "";

		if (  !empty($atts['pi_image_ids']) )
		{
			$aIds = explode(",", $atts['pi_image_ids']);

			if ( $atts['pi_style'] == 'tiled_gallery' )
			{
				foreach ( $aIds as $id )
				{
					$attachment = get_post($id);
	                $caption = !empty($attachment->post_excerpt) ? $attachment->post_excerpt : get_the_title($post->ID);

	                $aImg    = wp_get_attachment_image_src($id, 'large');
	                $aOrigin = wp_get_attachment_image_src($id, 'full');
	                $size    = $aOrigin[1] . 'x' . $aOrigin[2];

				 	$imgs .= '<a class="item" href="'.esc_url($aOrigin[0]).'" data-caption="'.esc_attr($caption).'" data-size="'.esc_attr($size).'">';
	                $imgs .= '<img src="'.esc_url($aImg[0]).'" alt="'.esc_attr($caption).'" />';
	                $imgs .= '</a>';
				}
			}else{

				$size = $atts['pi_slideshow_single_item'] === '0' ? 'thumbnail' : 'large';

				foreach ( $aIds as $id )
				{
					$attachment = get_post($id);
	                $caption = !empty($attachment->post_excerpt) ? $attachment->post_excerpt : $post->post_title;

	                $aImg    = wp_get_attachment_image_src($id, $size);
	                $aOrigin = wp_get_attachment_image_src($id, 'full');
	                $size    = $aOrigin[1] . 'x' . $aOrigin[2];

				 	$imgs .= '<div class="item wiloke-gallery-image-cover"><a class="item" href="'.esc_url($aOrigin[0]).'" data-caption="'.esc_attr($caption).'" data-size="'.esc_attr($size).'">';
	                	$imgs .= '<img src="'.esc_url($aImg[0]).'" alt="'.esc_attr($caption).'" />';
	                $imgs .= '</a></div>';
				}
			}

			$output = "<div class='pi_".esc_attr($atts['pi_style'])." pi_wiloke_gallery pi-pswp custom ".esc_attr($cssClass)."' data-settings='".esc_attr(json_encode($atts))."'>".$imgs."</div>";
			return $output;
		}
	}

	return $output;
}

function pi_attachment_info($id)
{
	$aInfo = array('title'=>'', 'caption'=>'');

  	$attachment = get_post( $id );

 	if ( $attachment )
 	{
      	$aInfo['title'] 	= $attachment->post_title;
      	$aInfo['caption']	= $attachment->post_excerpt;
 	}

 	return $aInfo;
}
