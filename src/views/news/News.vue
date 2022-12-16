<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{translate('RecentNewsTitle')}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <cs-spinner v-if="!news"></cs-spinner>
    <div v-if="news">
      <app-news-card v-for="article in news" :key="article.id" :article="article"></app-news-card>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppNewsCard from '@/components/news/NewsCard.vue';
import ListNews from '@/gql/news/ListNews.gql';

export default {
  components: {
    AppRefresher,
    AppNewsCard,
  },
  apollo: {
    news: {
      query: ListNews,
      variables() {
        return {
          language: $auth.getLanguage(),
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('news-view');
  },
};
</script>
