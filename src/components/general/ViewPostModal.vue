<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <cs-spinner v-if="!post"></cs-spinner>
      <div v-if="post" class="comments">
        <post-card :post="post" class="post" :config="config"></post-card>
        <div class="cs-text-paragraph-bold comments-title">{{translate('CommentsTitle')}}</div>
        <cs-comment-card v-for="comment in post.comments" :key="comment.id"
          :author="comment.author"
          :date="comment.created_at"
          :message="comment.message"
        >
          <!-- <p @click="deleteComment(comment)">Delete</p> -->
        </cs-comment-card>
      </div>
      <div class="comment-composer">
        <cs-message-box class="comment-input" v-model="draftComment" @send="postComment()"></cs-message-box>
      </div>
    </ion-content>
  </div>
</template>
<script>
import $apollo from '@/services/apollo';
import PostCard from '@/components/general/PostCard.vue';
import $auth from '@/services/auth';

export default {
  data() {
    return {
      post: null,
      post_id: null,
      draftComment: '',
      listQuery: null,
      listQueryParams: null,
    };
  },
  components: {
    PostCard,
  },
  methods: {
    async postComment() {
      await $apollo.mutate({
        mutation: this.config.insertPostCommentMutation,
        variables: {
          post_id: this.post.id,
          user_id: $auth.getUserId(),
          message: this.draftComment,
        },
      });
      this.draftComment = '';
    },
    async deleteComment(comment) {
      await $apollo.mutate({
        mutation: this.config.deletePostCommentMutation,
        variables: {
          id: comment.id,
          user_id: $auth.getUserId(),
        },
      });
    },
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
  },
  async mounted() {
    const resp = await $apollo.query({
      query: this.config.getPostQuery,
      variables: {
        id: this.post_id,
        user_id: $auth.getUserId(),
      },
    });
    this.post = resp.data.post;
  },
};
</script>
<style scoped>
  .post
  {
    margin-bottom: 10px;
  }
  .comment-composer
  {
    display: flex;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    background-color: var(--cs-gray-01);
  }
  .comment-input
  {
    flex: 1;
  }
  .comments
  {
    margin-bottom: 50px;
  }
  .comments-title
  {
    margin-top: 20px;
    margin-bottom: 15px;
  }
</style>
