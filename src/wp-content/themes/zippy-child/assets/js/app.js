import { Enquiry } from "./enquiry/Enquiry";

let Main = {
  init: function () {
    const enquiry = new Enquiry();
    enquiry.sortLengthList();
  },
};

Main.init();

// code JS to process sort variation product by length
function sortLengthList() {
  const ul = document.querySelector('ul[role="radiogroup"]');

  // Check if the ul element is found
  if (!ul) {
    return;
  }

  const items = Array.from(ul.querySelectorAll("li"));

  // Check if the items list is empty
  if (items.length === 0) {
    return;
  }

  const sortedItems = items.sort((a, b) => {
    const getLength = (item) => {
      const value = item.getAttribute("data-value").toLowerCase();
      if (value.includes("mm")) {
        return parseFloat(value);
      }
      return 0;
    };

    return getLength(a) - getLength(b);
  });

  // Clear existing items
  ul.innerHTML = "";

  // Append the sorted items
  sortedItems.forEach((item) => {
    ul.appendChild(item);
  });
}
// sortLengthList()
