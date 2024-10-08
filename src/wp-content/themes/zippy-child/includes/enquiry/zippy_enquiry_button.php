<?php
// Display single product do_shortcode('[product_enquiry_button]')
function product_enquiry_button_shortcode($atts)
{
    global $product;

    if (!$product) {
        return 'No product found.';
    }

    $product_id = $product->get_id();
    $product_title = $product->get_name();

    ob_start();
    
    if ('simple' === $product->get_type()) {
        ?>
        <div class="enquiry-button-single">
            <button class="enquiry-single-button" product-id="<?php echo esc_attr($product_id); ?>" data-product-title="<?php echo esc_attr($product_title); ?>">Add To Enquiry</button>
        </div>
        <?php
    } elseif ('variable' === $product->get_type()) {
        ?>
        <div class="enquiry-button-custom">
            <button id="enquiry-button" data-product-id="<?php echo esc_attr($product_id); ?>" data-product-title="<?php echo esc_attr($product_title); ?>">Add To Enquiry</button>
        </div>
       
        <?php
    } else {
        return 'Unsupported product type.';
    }

    return ob_get_clean();
}

add_shortcode('product_enquiry_button', 'product_enquiry_button_shortcode');



add_action('wp_ajax_add_to_enquiry_cart', 'add_to_enquiry_cart');
add_action('wp_ajax_nopriv_add_to_enquiry_cart', 'add_to_enquiry_cart');

function add_to_enquiry_cart()
{
  if (isset($_POST['products']) && is_array($_POST['products'])) {
    $products = $_POST['products'];

    if (!empty($products['enquiry'])) {
      $product = reset($products['enquiry']);
      $product_id = intval($product['productId']);
      $quantity = intval($product['quantity']);

      if ($product_id > 0 && $quantity > 0) {
        $enquiry_cart = WC()->session->get('enquiry_cart', array());
        if (isset($enquiry_cart[$product_id])) {
          $enquiry_cart[$product_id]['quantity'] += $quantity;
        } else {
          $enquiry_cart[$product_id] = array(
            'product_id' => $product_id,
            'quantity' => $quantity,
          );
        }
        WC()->session->set('enquiry_cart', $enquiry_cart);
      } else {
        wp_send_json_error('Invalid product ID or quantity.');
      }
    } else {
      wp_send_json_error('No products to process.');
    }
  } else {
    wp_send_json_error('Invalid request.');
  }
}
?>