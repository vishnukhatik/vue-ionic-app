<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text=""></ion-back-button>
      </ion-buttons>
      <div class="search-container">
        <cs-search-bar v-model="query" :placeholder="translate('SearchPlaceholder')"></cs-search-bar>
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <cs-spinner v-if="$apollo.queries.articles.loading"></cs-spinner>
    <div v-if="articles && !$apollo.queries.articles.loading">
      <training-card v-for="article in articles" :key="article.id" :article="article"></training-card>
      <cs-empty-state v-if="!articles.length" title="No matching content">
        <cs-button @click="query = ''">{{translate('ClearSearchButtonLabel')}}</cs-button>
      </cs-empty-state>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import SearchArticles from '@/gql/training/SearchArticles.gql';
import TrainingCard from '@/components/training/TrainingCard.vue';

export default {
  components: {
    TrainingCard,
  },
  data() {
    return {
      query: '',
    };
  },
  apollo: {
    articles: {
      query: SearchArticles,
      variables() {
        return {
          query: `%${this.query}%`,
        };
      },
    },
  },
  methods: {
    handleSearch(evt) {
      this.query = evt.target.value;
    },
  },
};

</script>
<style scoped>
</style>
