// import { DisplayLabel } from './components/DisplayLabel';

let Main = {
  init: async function () {

    // initialize demo javascript component - async/await invokes some 
    //  level of babel transformation 
    const displayLabel = new DisplayLabel();
    await displayLabel.init();

  }
};


// console.log($('.more-link'));
// Main.init();


// code JS to process sort variation product by length
function sortLengthList() {
  const ul = document.querySelector('ul[role="radiogroup"]');
  
  // Check if the ul element is found
  if (!ul) {
      return;
  }

  const items = Array.from(ul.querySelectorAll('li'));
  
  // Check if the items list is empty
  if (items.length === 0) {
      return;
  }

  const sortedItems = items.sort((a, b) => {
      const getLength = (item) => {
          const value = item.getAttribute('data-value').toLowerCase();
          if (value.includes('mm')) {
              return parseFloat(value);
          }
          return 0;
      };

      return getLength(a) - getLength(b);
  });

  // Clear existing items
  ul.innerHTML = '';

  // Append the sorted items
  sortedItems.forEach(item => {
      ul.appendChild(item);
  });
};
sortLengthList()