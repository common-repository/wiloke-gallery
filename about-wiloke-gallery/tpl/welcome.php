<?php
/**
 * Getting started template
 */

$customizer_url = admin_url() . 'customize.php' ;
?>

<div id="getting_started" class="wiloke-tab-pane active">

    <div class="wiloke-tab-pane-center">

        <h1 class="wiloke-welcome-title">Welcome to Wiloke Gallery! </h1>
        <p>
            <?php esc_html_e( 'First of all, thank for your using Wiloke Gallery! We hope you will enjoy using Wiloke Gallery. If you have any question that is beyond of the scope of the documentation, feel free leave your question at ', 'wiloke' ); ?> <a href="http://support.wiloke.com" target="_blank">http://support.wiloke.com</a>
        </p>
    </div>

    <hr />

    <div class="wiloke-tab-pane-center">

        <h1><?php esc_html_e( 'View full documentation', 'wiloke' ); ?></h1>
        <p><?php esc_html_e( 'Please check our full documentation for detailed information on how to use Winters.', 'wiloke' ); ?></p>
        <p><a href="<?php echo esc_url( 'http://blog.wiloke.com/wiloke-gallery/' ); ?>" target="_blank" class="button button-primary"><?php esc_html_e( 'Read full documentation', 'wiloke' ); ?></a></p>

    </div>

    <div class="wiloke-clear"></div>

</div>
