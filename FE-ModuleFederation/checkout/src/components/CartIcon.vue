<template>
  <a class="icon-container" @click="navigateToCart">
    <i class="fa fa-shopping-bag" />
    <span>{{ totalItems }}</span>
  </a>
</template>
<script lang="ts">
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartIcon",
  props: ["navigate", "eventBus"],
  setup() {
    const cartStore = useCartStore();
    const { totalItems } = storeToRefs(cartStore);
    return { cartStore, totalItems };
  },
  methods: {
    navigateToCart() {
      this.navigate("/shopping-cart");
    },
  },
  mounted() {
    if (this.eventBus) {
      this.eventBus.on("addCartItem", () => {
        this.cartStore.load();
      });
    }
  },
});
</script>
