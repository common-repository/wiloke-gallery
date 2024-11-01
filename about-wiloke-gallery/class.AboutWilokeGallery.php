<?php

if ( !class_exists('Wiloke_AboutWilokeGallery') )
{
    class Wiloke_AboutWilokeGallery
    {
        public function __construct()
        {
            add_action('admin_menu', array( $this, 'wiloke_galllery_welcome_register_menu' ));
            add_action('admin_enqueue_scripts', array($this, 'wiloke_galllery_welcome_scripts'));


            // Display the content on Dashboard
            add_action('wiloke_galllery_welcome', array($this, 'wiloke_galllery_welcome_getting_started'), 10);
            add_action('wiloke_galllery_welcome', array($this, 'wiloke_galllery_contribute'), 10);
//            add_action('wiloke_galllery_welcome', array($this, 'wiloke_galllery_changelog'), 10);
            add_action('wiloke_galllery_welcome', array($this, 'wiloke_galllery_donation'), 10);
        }

        public function wiloke_galllery_donation()
        {
            include plugin_dir_path(__FILE__) . 'tpl/donate.php';
        }

        public function wiloke_galllery_welcome_getting_started()
        {
            include plugin_dir_path(__FILE__) . 'tpl/welcome.php';
        }

        public function wiloke_galllery_contribute()
        {
            include plugin_dir_path(__FILE__) . 'tpl/contribute.php';
        }

        public function wiloke_galllery_changelog()
        {
            include plugin_dir_path(__FILE__) . 'tpl/changelog.php';
        }

        public function wiloke_galllery_welcome_scripts($hook)
        {

            if ( $hook == 'toplevel_page_wiloke-gallery' )
            {
                wp_enqueue_style('galllery_welcome', plugin_dir_url(__FILE__) . 'source/css/style.css');
                wp_enqueue_script('jquery-tabs');
                wp_enqueue_script('galllery_welcome', plugin_dir_url(__FILE__) . 'source/js/script.js', array(), '1.0', true);
            }
        }

        public function wiloke_galllery_welcome_register_menu()
        {
            add_menu_page( 'Wiloke Gallery', 'Wiloke Gallery', 'edit_theme_options', 'wiloke-gallery', array( $this, 'wiloke_galllery_welcome_screen' ) );
        }

        public function wiloke_galllery_welcome_screen()
        {
            require_once( ABSPATH . 'wp-load.php' );
            require_once( ABSPATH . 'wp-admin/admin.php' );
            require_once( ABSPATH . 'wp-admin/admin-header.php' );

            /**
             * Tabs
             */
            require_once ( plugin_dir_path(__FILE__) . 'tpl/tabs.php' );
            ?>

            <div class="wiloke-tab-content">

                <?php
                /**
                 * @hooked wiloke_galllery_welcome_getting_started - 10
                 * @hooked wiloke_galllery_welcome_actions_required - 20
                 * @hooked wiloke_galllery_welcome_child_themes - 30
                 * @hooked wiloke_galllery_welcome_github - 40
                 * @hooked wiloke_galllery_welcome_changelog - 50
                 * @hooked wiloke_galllery_welcome_free_pro - 60
                 */
                do_action( 'wiloke_galllery_welcome' ); ?>

            </div>
            <?php
        }
    }

    new Wiloke_AboutWilokeGallery;
}
