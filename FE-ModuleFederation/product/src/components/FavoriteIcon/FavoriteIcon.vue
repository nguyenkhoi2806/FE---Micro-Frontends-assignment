<template>
  <a :onClick="navigateToWishList">
    <i className="fa fa-heart" /> <span>{{ totalWishlist }}</span>
  </a>
</template>

<script lang="ts">
//@ts-ignore
import globalStorage from "@/utils/loadStorage";
import { defineComponent, ref } from "vue";

const totalWishlist = ref(0);

export default defineComponent({
  name: "FavoriteIcon",
  props: ["navigate", "eventBus"],
  setup() {
    const wishlist = globalStorage.getFavoriteList();
    if (wishlist && wishlist.items) {
      totalWishlist.value = wishlist.items.length;
    }
    return {
      totalWishlist,
    };
  },
  mounted() {
    if (this.eventBus) {
      this.eventBus.on("addFovariteItem", () => {
        const wishlist = globalStorage.getFavoriteList();
        if (wishlist && wishlist.items) {
          totalWishlist.value = wishlist.items.length;
        }
        return {
          totalWishlist,
        };
      });
    }
  },
  methods: {
    navigateToWishList() {
      this.navigate("/wish-list");
    },
  },
});
</script>
