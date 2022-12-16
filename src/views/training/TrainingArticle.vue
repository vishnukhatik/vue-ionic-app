<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title v-if="article">{{article.category.name}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <ion-spinner v-if="!article"></ion-spinner>
    <div v-if="article">
      <div class="ion-padding">
        <div class="cs-textstyle-page-title">{{article.title}}</div>
        <div class="metadata">
          <cs-tag variant="default">{{article.category.name}}</cs-tag>
          <div class="timestamp">{{article.created_at | moment('from')}}</div>
        </div>
        <cs-quill-viewer :value="article.body"></cs-quill-viewer>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import GetTrainingArticle from '@/gql/training/GetTrainingArticle.gql';

export default {
  components: {
    AppRefresher,
  },
  apollo: {
    article: {
      query: GetTrainingArticle,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('training-item-view', this.$route.params.id);
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
