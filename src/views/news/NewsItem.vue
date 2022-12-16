<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title v-if="article">{{article.title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <ion-spinner v-if="!article"></ion-spinner>
    <div v-if="article">
      <ui-attachment v-for="attachment in article.attachments" :key="attachment.id" :attachment="attachment"></ui-attachment>
      <div class="ion-padding">
        <div class="cs-textstyle-page-title">{{article.title}}</div>
        <div class="metadata">
          <div class="timestamp">{{article.created_at | moment('from')}}</div>
        </div>
        <cs-quill-viewer :value="article.body"></cs-quill-viewer>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import AppRefresher from '@/components/general/Refresher.vue';
import UiAttachment from '@/components/ui/UiAttachment.vue';
import GetNewsItem from '@/gql/news/GetNewsItem.gql';
import $analytics from '@/services/analytics';

export default {
  components: {
    AppRefresher,
    UiAttachment,
  },
  apollo: {
    article: {
      query: GetNewsItem,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('news-item-view', this.$route.params.id);
  },
};
</script>
<style>
  .metadata {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 12px;
  }
</style>
