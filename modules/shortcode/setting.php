<?php

add_filter( 'mce_buttons', 'pi_add_button' );
function pi_add_button($button)
{
	array_push($button, 'pi_ifg');
	return $button;
}

add_filter('mce_external_plugins', 'pi_register_js');
function pi_register_js($js)
{
	$js['pi_ifg'] = plugin_dir_url(__FILE__) . 'js/core.js';
	return $js;
}

add_action('admin_footer', 'pi_include_shortcode_setting_into_footer');
function pi_include_shortcode_setting_into_footer()
{
	include ( PI_IFG_MD_DIR . 'shortcode/popup.php' );
}

