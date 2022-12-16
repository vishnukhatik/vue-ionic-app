<template>
  <cs-post-card class="component"
    :author-name="post.author.name"
    :author-picture="post.author.picture"
    :date="post.created_at"
    :like-count="post.reactions_aggregate.aggregate.count"
    :liked="isLiked"
    :comment-count="post.comments_aggregate.aggregate.count"
    show-menu
    @like-count="showLikes()"
    @open-menu="showPostMenu()"
    @like="toggleLike()"
  >
    <div slot="message">{{post.message}}</div>
    <div slot="media" v-if="post.picture">
      <img :src="post.picture">
    </div>
  </cs-post-card>
</template>
<script>
import $auth from '@/services/auth';
import LikesModal from '@/components/general/LikesModal.vue';
import EditPostModal from '@/components/general/EditPostModal.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLiked() {
      return !!(this.post && this.post.reactions.length);
    },
  },
  methods: {
    toggleLike() {
      if (this.isLiked) {
        this.unlikePost();
      } else {
        this.likePost();
      }
    },
    async likePost() {
      await this.$apollo.mutate({
        mutation: this.config.insertPostReactionMutation,
        variables: {
          user_id: $auth.getUserId(),
          post_id: this.post.id,
        },
      });
    },
    async unlikePost() {
      await this.$apollo.mutate({
        mutation: this.config.deletePostReactionMutation,
        variables: {
          user_id: $auth.getUserId(),
          post_id: this.post.id,
        },
      });
    },
    async deletePost() {
      await this.$apollo.mutate({
        mutation: this.config.deletePostMutation,
        variables: {
          id: this.post.id,
        },
        update: (store) => {
          const data = store.readQuery({
            query: this.config.listQuery,
            variables: this.config.listQueryParams,
          });
          data.posts = data.posts.filter((p) => (p.id !== this.post.id));
          store.writeQuery({
            query: this.config.listQuery,
            variables: this.config.listQueryParams,
            data,
          });
        },
      });
    },
    async showPostMenu() {
      this.actionSheet = await this.$ionic.actionSheetController.create({
        buttons: [
          {
            text: 'Edit Post',
            handler: this.showEditModal,
          },
          {
            text: 'Delete Post',
            role: 'destructive',
            handler: this.deletePost,
          },
        ],
      });
      await this.actionSheet.present();
    },
    async showEditModal() {
      const modal = await this.$ionic.modalController.create({
        component: EditPostModal,
        componentProps: {
          data: {
            post_id: this.post.id,
            message: this.post.message,
            picture: this.post.picture,
            config: this.config,
          },
        },
      });
      await modal.present();
    },
    async showLikes() {
      const modal = await this.$ionic.modalController.create({
        component: LikesModal,
        componentProps: {
          data: {
            reactions: this.post.reactions,
          },
        },
      });
      await modal.present();
    },
  },
};
</script>
<style scoped>
.component {
  margin-bottom: 12px;
}
</style>
