<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title v-if="category">{{category.name}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <cs-spinner v-if="!category"></cs-spinner>
    <div v-if="category">
      <app-training-card v-for="article in category.articles" :key="article.id" :article="article"></app-training-card>
      <cs-empty-state v-if="!category.articles.length" title="No content yet" description="Try another category">
        <cs-button :to="{name: 'TrainingCategoryList'}">{{translate('ExploreButtonLabel')}}</cs-button>
      </cs-empty-state>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppTrainingCard from '@/components/training/TrainingCard.vue';
import GetTrainingCategory from '@/gql/training/GetTrainingCategory.gql';

export default {
  components: {
    AppRefresher,
    AppTrainingCard,
  },
  apollo: {
    category: {
      query: GetTrainingCategory,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('training-category-view', this.$route.params.id);
  },
};
</script>
