<?php

//Display label stock on loop product
add_action('woocommerce_before_shop_loop_item', 'show_stock_status');

function show_stock_status() {
    global $product;

    if (!$product instanceof WC_Product) {
        return;
    }

    if ($product->is_in_stock()) {
        echo '<p class="stock-status in-stock">In Stock</p>';
    } else {
        echo '<p class="stock-status out-of-stock">Out of Stock</p>';
    }
}

//change text button "select option" to "add to cart"
add_filter( 'woocommerce_product_add_to_cart_text', 'replace_loop_add_to_cart_button_text', 20, 2 );
function replace_loop_add_to_cart_button_text( $text, $product ) {
    if ( $product->is_type( 'variable' ) && $product->is_purchasable() ) {
        $text = __( 'Add To Cart', 'woocommerce' );
    }
    return $text;
}


//Remove tab additional information
add_filter('woocommerce_product_tabs', 'remove_product_tabs', 9999);
function remove_product_tabs($tabs)
{
  unset($tabs['additional_information']);
  return $tabs;
}

//Remove tab review
add_filter('woocommerce_product_tabs', 'remove_review_tab', 9999);
function remove_review_tab($tabs)
{
  unset($tabs['reviews']);
  return $tabs;
}

add_action('woocommerce_after_single_product_summary', 'add_product_variation_table_shortcode', 15);

