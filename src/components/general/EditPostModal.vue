<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('NewPostTitle')}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="publish()" :disabled="!formValid">{{translate('PostButtonLabel')}}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <cs-form v-model="formValid">
        <cs-textarea label="Message" v-model="message" required></cs-textarea>
        <cs-file-input accept-type="image/*" label="Picture" application-id="15600fe9-713d-4ba1-a1cd-4a2d2c916b5c"
          v-model="picture"
        ></cs-file-input>
      </cs-form>
    </ion-content>
  </div>
</template>
<script>
import $apollo from '@/services/apollo';
import $auth from '@/services/auth';

export default {
  data() {
    return {
      formValid: false,
      config: null,
      post_id: null,
      message: null,
      picture: null,
    };
  },
  methods: {
    async publish() {
      if (this.post_id) {
        this.updateExisting();
      } else {
        this.postNew();
      }
    },
    async updateExisting() {
      await $apollo.mutate({
        mutation: this.config.updatePostMutation,
        variables: {
          id: this.post_id,
          user_id: $auth.getUserId(),
          message: this.message,
          picture: this.picture,
        },
      });
      this.$ionic.modalController.dismiss(true);
    },
    async postNew() {
      const newPost = { ...this.config.listQueryParams };
      newPost.message = this.message;
      newPost.picture = this.picture;
      await $apollo.mutate({
        mutation: this.config.insertPostMutation,
        variables: newPost,
        update: (store, resp) => {
          const query = this.config.listQuery;
          const variables = this.config.listQueryParams;
          const cache = store.readQuery({ query, variables });
          cache.posts.unshift(resp.data.post);
          store.writeQuery({ query, variables, data: cache });
        },
      });
      this.$ionic.modalController.dismiss(true);
    },
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
  },
};
</script>
