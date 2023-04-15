import { getuuid } from "../shared/uuid";
import waitToElement from "../shared/wailtToElement";

(function () {
  waitToElement(".rivo-star-wrapper").then(() => {
    const element: HTMLElement = document.querySelector(".rivo-star-wrapper")!;
    if (!element) {
      return;
    }
    element.setAttribute("id", getuuid());
  });
})();
