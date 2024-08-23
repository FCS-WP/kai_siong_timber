import { Enquiry } from "./enquiry/Enquiry";
import { SortVariationList } from "./SortVariationList";

let Main = {
  init: function () {
    const enquiry = new Enquiry();
    const sorter = new SortVariationList();
  },
};

Main.init();
