<template>
  <div>
    <!-- <div class="post-prompt" @click="showPostModal()" v-if="showComposer">
      <i class="icon icons8-image image-icon"></i>
      <div>Write something...</div>
      <i class="icon icons8-sent send-icon"></i>
    </div> -->
    <cs-message-box class="post-prompt" v-if="showComposer" @click.native="showPostModal()"></cs-message-box>
    <cs-spinner v-if="!posts"></cs-spinner>
    <div v-if="posts">
      <cs-empty-state v-if="!posts.length" title="No posts"></cs-empty-state>
      <app-post-card @click.native="viewDetail(post)" v-for="post in posts" :key="post.id"
        :post="post"
        :config="config"
      >
      </app-post-card>
    </div>
  </div>
</template>
<script>
import AppPostCard from '@/components/general/PostCard.vue';
import AppViewPostModal from '@/components/general/ViewPostModal.vue';
import AppEditPostModal from '@/components/general/EditPostModal.vue';

export default {
  components: {
    AppPostCard,
  },
  props: {
    showComposer: {
      type: Boolean,
      default: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      message: null,
    };
  },
  apollo: {
    posts() {
      return {
        query: this.config.listQuery,
        variables: this.config.listQueryParams,
      };
    },
  },
  methods: {
    async showPostModal() {
      const modal = await this.$ionic.modalController.create({
        component: AppEditPostModal,
        componentProps: {
          data: {
            config: this.config,
          },
        },
      });
      await modal.present();
    },
    async viewDetail(post) {
      const modal = await this.$ionic.modalController.create({
        component: AppViewPostModal,
        componentProps: {
          data: {
            post_id: post.id,
            config: this.config,
          },
        },
      });
      await modal.present();
    },
  },
};
</script>
<style scoped>
.post-prompt
{
  margin-bottom: 12px;
}
</style>
