<?php
/*
 * Define Variables
 */
if (!defined('THEME_DIR'))
    define('THEME_DIR', get_template_directory());
if (!defined('THEME_URL'))
    define('THEME_URL', get_template_directory_uri());


/*
 * Include framework files
 */
foreach (glob(THEME_DIR.'-child' . "/includes/*.php") as $file_name) {
    require_once ( $file_name );
}

// Rename sorting option
function custom_rename_sorting_options( $sorting_options ) {
    if ( isset( $sorting_options['price'] ) ) {
        $sorting_options['price'] = 'Sort default';
    }
    
    return $sorting_options;
}
add_filter( 'woocommerce_catalog_orderby', 'custom_rename_sorting_options' );

function custom_set_default_sort_by_price( $sort_by ) {
    return 'price'; // Set 'price' as the default sorting option
}
add_filter( 'woocommerce_default_catalog_orderby', 'custom_set_default_sort_by_price' );













