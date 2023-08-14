<template>
  <div class="row">
    <div :key="item.id" v-for="item in items" class="col-lg-4 col-md-4 col-sm-6">
      <PostCard :item="item" />
    </div>
    <vue-notification-list />
  </div>
</template>

<script>
import { BlogService } from "@/api";
import PostCard from "./PostCard.vue";
import { VueNotificationList } from "@dafcoe/vue-notification";

export default {
  name: "PostList",
  components: {
    PostCard,
    VueNotificationList,
  },
  provide() {
    return {
      navigate: this.navigate,
    };
  },
  props: {
    navigate: Function,
  },
  data() {
    return {
      items: [],
    };
  },
  async created() {
    const res = await BlogService.getPosts({ limit: 3, offset: 0 });
    if (res?.post) {
      this.items = res.post;
    }
  },
};
</script>
