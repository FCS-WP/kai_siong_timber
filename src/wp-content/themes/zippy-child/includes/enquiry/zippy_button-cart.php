<?php
// Enquiry button shortcode [enquiry_button_cart]
function enquiry_button_shortcode()
{
    if (isset(WC()->session)) {
        if (!is_admin() && !WC()->session->has_session()) {
            WC()->session->set_customer_session_cookie(true);
        }
    }
    $enquiry_cart = WC()->session->get('enquiry_cart', array());

    $enquiry_count = 0;
    foreach ($enquiry_cart as $item) {
        $enquiry_count += intval($item['quantity']);
    }

    ob_start();
?>
    <div class="enquiry-button-nav"><a href="/enquiry/" class="wp-block-button__link wp-element-button">Enquiry | <span><?php echo $enquiry_count; ?></span> </a></div>
<?php
    return ob_get_clean();
}

add_shortcode('enquiry_button_cart', 'enquiry_button_shortcode');



?>