export class Enquiry {
  constructor() {
    $(document).ready(() => {
      this.initEnquirySingleButton();
      this.initQuantityButton();
      this.initRemoveButton();
      this.initAddMutipleButton();
    });
  }

  initEnquirySingleButton() {
    $(document).on("click", ".enquiry-single-button", function(event) {
      const button = $(this);
      const productId = button.attr("product-id");
      const quantity = 1; // Default quantity is 1
      const productsToAdd = {
        enquiry: [
          {
            productId,
            quantity,
          },
        ],
      };

      if (productsToAdd.enquiry.length > 0) {
        $.ajax({
          url: wc_add_to_cart_params.ajax_url,
          type: "POST",
          data: {
            action: "add_to_enquiry_cart",
            products: productsToAdd,
          },
          success: function(response) {
            $("#success-message").show();
            setTimeout(() => {
              location.reload();
            }, 1500);
          },
          error: function(error) {
            alert("Failed to add product to enquiry cart.");
          },
        });
      } else {
        alert("No product to add.");
      }
    });
  }

  initQuantityButton() {
    $(document).on("click", ".quantity-button", function() {
      const button = $(this);
      const itemKey = button.attr("data-item-key");
      const $inputField = $(`input[name="quantity[${itemKey}]"]`);
      const currentValue = parseInt($inputField.val(), 10);

      if (button.hasClass("minus")) {
        if (currentValue > 1) {
          $inputField.val(currentValue - 1);
        }
      } else if (button.hasClass("plus")) {
        $inputField.val(currentValue + 1);
      }
    });
  }

  initRemoveButton() {
    $(document).on("click", ".remove-enquiry-item", function(e) {
      e.preventDefault();
      const button = $(this);
      const itemKey = button.attr("data-item-key");

      $.ajax({
        url: wc_add_to_cart_params.ajax_url,
        type: "POST",
        data: {
          action: "remove_enquiry_item",
          item_key: itemKey,
        },
        success: function(response) {
          if (response.success) {
            $(`tr[data-item-key="${itemKey}"]`).remove();
            if ($(".enquiry-cart-table tbody tr").length === 0) {
              $(".enquiry-cart-table").html(
                '<tbody><tr><td colspan="3">Your enquiry cart is empty.</td></tr></tbody>'
              );
            }
            location.reload();
          } else {
            console.error("Error removing item:", response.data.message);
          }
          $("#loading-indicator").hide();
        },
        error: function(error) {
          console.error("Error removing item:", error);
          $("#loading-indicator").hide();
        },
      });
    });
  }

  initAddMutipleButton() {
    const enquiryButton = $('#enquiry-button');
    
    if (enquiryButton.length) { 
      enquiryButton.on('click', () => {
        const quantities = $('.quantity input.qty');
        const productsToAdd = {
          enquiry: []
        };

        quantities.each(function() {
          const quantity = parseInt($(this).val(), 10);
          const variationId = $(this).attr('data-variation-id');
          if (quantity > 0) {
            productsToAdd.enquiry.push({
              variationId,
              quantity
            });
          }
        });

        if (productsToAdd.enquiry.length > 0) {
          $.ajax({
            url: wc_add_to_cart_params.ajax_url,
            type: 'POST',
            data: {
              action: 'add_multiple_to_cart_or_enquiry',
              products: productsToAdd
            },
            success: function(response) {
              $('#success-message').show();
              setTimeout(() => {
                location.reload();
              }, 1500);
            },
            error: function(error) {
              alert('Failed to process items.');
            }
          });
        } else {
          alert('No products to add.');
        }
      });
    } else {
      console.warn('Enquiry button not found.');
    }
  }
}
