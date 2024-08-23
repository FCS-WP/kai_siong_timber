export class SortVariationList {
    constructor() {
      this.sortLengthList();
    }
  
    sortLengthList() {
      const ul = document.querySelector('ul[role="radiogroup"]');
  
      if (!ul) {
        return;
      }

      const items = Array.from(ul.querySelectorAll("li"));
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

      ul.innerHTML = "";

      sortedItems.forEach((item) => {
        ul.appendChild(item);
      });
    }
  }
  
  