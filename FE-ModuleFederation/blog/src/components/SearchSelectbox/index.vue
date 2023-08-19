<template>
  <div>
    <h4>Search By</h4>
    <div class="blog__sidebar__item__tags">
      <a :key="item.id" v-for="item in items" :href="item.src" onclick="" class="text-capitalize">{{
        item.name
      }}</a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { postCategories as tags } from "../../mockData";

export default defineComponent({
  name: "SearchSelectbox",
  props: {
    items: {
      type: Array,
      default: () => tags,
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.blog__sidebar__item__tags {
  a {
    font-size: 16px;
    color: $para-color;
    background: $background;
    display: inline-block;
    padding: 7px 26px 5px;
    margin-right: 6px;
    margin-bottom: 10px;
  }
}
</style>
