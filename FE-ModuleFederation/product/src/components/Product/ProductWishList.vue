<template>
  <div>
    <div class="section-title product__discount__title"><h2>Wish list</h2></div>
    <div class="row">
      <div v-if="dataWishList?.length === 0" class="m-auto">
        <div class="thumbnail text-center mb-5">
          <!-- Wishlist Item Image (You can add an image here if needed) -->
          <!-- <img src="item-image.jpg" alt="Wishlist Item"> -->
          <div class="caption">
            <h3>Empty Wishlist Item</h3>
            <p>Your wishlist is currently empty.</p>
            <p>
              <a @click="navigate('/shop')" class="btn primary-btn text-white">Continue Shopping</a>
            </p>
          </div>
        </div>
      </div>
      <div
        v-for="item in dataWishList"
        :key="item.id"
        :class="[column === 4 ? 'col-lg-3 col-md-4 col-sm-6' : 'col-lg-4 col-md-6 col-sm-6']"
      >
        <ProductCard
          :item="item"
          :event-bus="eventBus"
          :is-favorite="true"
          :remove-item-wish-list="removeItemWishList"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "./ProductCard.vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";
//@ts-ignore
import globalStorage from "@/utils/loadStorage";

//@ts-ignore
import * as ProductUtil from "@/utils/product";

export default defineComponent({
  name: "ProductList",
  components: { ProductCard },
  provide() {
    return {
      navigate: this.navigate,
    };
  },
  props: {
    column: Number,
    eventBus: {} as any,
    navigate: {
      type: Function,
    },
  },
  data() {
    return {
      dataWishList: null as IProduct[] | null,
    };
  },
  async created() {
    const wishlist = globalStorage.getFavoriteList();
    if (wishlist && wishlist.items) {
      this.dataWishList = wishlist.items;
    }
  },
  mounted() {
    if (this.eventBus) {
      this.eventBus.on("updateFovariteItem", () => {
        const wishlist = globalStorage.getFavoriteList();
        if (wishlist && wishlist.items) {
          this.dataWishList = wishlist.items;
        }
      });
    }
  },
  methods: {
    removeItemWishList(item: IProduct) {
      if (confirm("Are you sure ?")) {
        ProductUtil.handleRemoveItemFromFavoriteList(item, this.eventBus);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";
.product__item {
  margin-bottom: 50px;
}
.product__pagination {
  padding-top: 10px;

  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #b2b2b2;
    font-size: 14px;
    color: #b2b2b2;
    font-weight: 700;
    line-height: 28px;
    text-align: center;
    margin-right: 16px;
    @include transition(all, 0.3s);
    &.active {
      background: $primary-color;
      border-color: $primary-color;
      color: $white-color;
    }
    &:hover {
      background: $primary-color;
      border-color: $primary-color;
      color: $white-color;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
