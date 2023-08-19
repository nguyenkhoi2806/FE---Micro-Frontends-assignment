import { createApp } from "vue";

import FavoriteIcon from "./FavoriteIcon.vue";

export default (el: any, props: any) => {
  createApp(FavoriteIcon, props).mount(el);
};
