<?php
/*
Plugin Name: Wiloke Gallery
Plugin URI: https://wiloke.com
Author: wiloke
Author URI: http://wiloke.com
Version: 1.2.4
Description: This plugin which will allows you create awesome galleries.

License: Under GPL2

Copyright 2014 wiloke (email : piratesmorefun@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

if ( !defined('ABSPATH') )
{
	exit();
}


define( 'PI_IFG_MD_DIR', plugin_dir_path(__FILE__) . 'modules/' );
define( 'PI_IFG_MD_URL', plugin_dir_url(__FILE__) . 'modules/' );
define( 'PI_IFG_SO_URL', plugin_dir_url(__FILE__) . 'source/' );
define( 'PI_IFG_SO_AS',  plugin_dir_url(__FILE__) . 'assets/' );


/*admin scripts*/
add_action('admin_enqueue_scripts', 'pi_include_js');
function pi_include_js()
{
	wp_register_style('pi_wiloke_gallery_main', PI_IFG_SO_URL . 'css/main.css', array(), '1.0');
	wp_enqueue_style('pi_wiloke_gallery_main');

	wp_enqueue_media();

	wp_enqueue_script('jquery-sortable');
	wp_register_script('pi_wiloke_gallery_main', PI_IFG_MD_URL . 'shortcode/js/main.js', array(), '1.0');
	wp_enqueue_script('pi_wiloke_gallery_main');
	wp_localize_script('pi_wiloke_gallery_main', 'PIFIPIURL', plugin_dir_url(__FILE__) . 'modules/shortcode/img/');
}

add_action('wp_print_scripts', 'pi_wiloke_gallery_dequeue_scripts', 100);
function pi_wiloke_gallery_dequeue_scripts(){
	wp_dequeue_script('pi_owlcarousel');
	wp_dequeue_script('pi_owltheme2');
	wp_dequeue_script('pi_owltheme');
	wp_dequeue_script('pi_owlcarousel2');
	wp_dequeue_script('pi_justifiedgallery');
	wp_dequeue_script('pi_justifiedGallery');
	wp_dequeue_script('pi_magnificpopup');
	wp_dequeue_script('pi_flickrfeed');
}

/*front-end scripts*/
add_action('wp_enqueue_scripts', 'pi_fe_include_js');
function pi_fe_include_js()
{
	wp_enqueue_style('justifiedgallery', PI_IFG_SO_AS . 'justified-gallery/justifiedGallery.min.css');
	wp_enqueue_style('magnificpopup', PI_IFG_SO_AS . 'magnific/magnific-popup.css');
	wp_enqueue_style('owltheme2', PI_IFG_SO_AS . 'owl/owl.theme.default.css');
	wp_enqueue_style('owlcarousel2', PI_IFG_SO_AS . 'owl/owl.carousel.css');
	wp_enqueue_style('wiloke_gallery', PI_IFG_SO_URL . 'css/main.css');
	wp_enqueue_style('wiloke_gallery');

	wp_enqueue_script('justifiedgallery', PI_IFG_SO_AS . 'justified-gallery/jquery.justifiedGallery.min.js', array('jquery'), null, true);
	wp_enqueue_script('magnificpopup', PI_IFG_SO_AS . 'magnific/jquery.magnific-popup.min.js', array('jquery'), null, true);
	wp_enqueue_script('owlcarousel2', PI_IFG_SO_AS . 'owl/owl.carousel.min.js', array('jquery'), null, true);

 	wp_enqueue_style('photoswipe', PI_IFG_SO_AS . 'photoswipe/photoswipe.css');
    wp_enqueue_style('photoswipedefaultskin', PI_IFG_SO_AS . 'photoswipe/default-skin/default-skin.css');
 	wp_enqueue_script('photoswipeuidefault', PI_IFG_SO_AS . 'photoswipe/photoswipe-ui-default.min.js', array('jquery'), null, true);
    wp_enqueue_script('photoswipephotoswipe', PI_IFG_SO_AS . 'photoswipe/photoswipe.min.js', array('jquery'), null, true);

	wp_enqueue_script('flickrfeed', PI_IFG_SO_AS . 'flickr-feed/jflickrfeed.min.js', array('jquery'), null, true);
	wp_enqueue_script('wiloke_gallery', PI_IFG_SO_URL . 'js/main.js', array('jquery'), null, true);
}

/*=========================================*/
/* Create Shortcode Button
/*=========================================*/
require_once( PI_IFG_MD_DIR . 'shortcode/setting.php' );
require_once( PI_IFG_MD_DIR . 'shortcode/view.php' );

if ( !function_exists('pi_print_photoswipestyle') )
{
    add_action('wp_footer', 'pi_print_photoswipestyle');
    function pi_print_photoswipestyle()
    {
        include PI_IFG_MD_DIR . '/photoswipe/photoswipe-ui.php';
    }
}

/*=========================================*/
/* General Settings
/*=========================================*/
include ( plugin_dir_path(__FILE__) . 'about-wiloke-gallery/class.AboutWilokeGallery.php' );
