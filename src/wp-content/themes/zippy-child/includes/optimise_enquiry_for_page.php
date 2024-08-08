<?php
//Create button add enquiry has href link id variation table
function add_to_enquiry_btn(){
	if ( function_exists('is_product') && is_product() ) {
        global $product;
        if ( $product && $product->is_type('variable') ) {
    		echo '<a style="margin-left: 10px" class="add_to_enquiry_custom" href="#ProductVariationTable">Add to Enquiry</a>';        
        } else {
          return;
        }
    }
}
add_action( 'woocommerce_after_add_to_cart_button', 'add_to_enquiry_btn', 30 );

//display enquiry for simple product
function display_button_enquiry_for_simple_no_price(){
    if ( function_exists('is_product') && is_product() ) {
        global $product;
        if ( $product && $product->is_type('simple') ) {
          echo do_shortcode('[product_enquiry_button]');
        } else {
          return;
        }
    }
}

add_action( 'woocommerce_after_add_to_cart_form', 'display_button_enquiry_for_simple_no_price', 10 );