import { createApp } from "vue";

import ProductWishList from "./ProductWishList.vue";

export default (el: any, props: any) => {
  createApp(ProductWishList, props).mount(el);
};
