import { Enquiry } from "./enquiry/Enquiry";

let Main = {
  init: function () {
    const enquiry = new Enquiry();
    enquiry.constructor();
  },
};

Main.init();
