<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{translate('TrainingLibraryTitle')}}</ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-search" v-router-link="{name:'TrainingSearch'}"></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="grey-content">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <div class="ion-padding">
      <app-section-header :title="translate('CategoriesTitle')" more="TrainingCategoryList"></app-section-header>
      <div class="category-cards">
        <app-training-category-card v-for="category in categories" :key="category.id" :category="category"
          v-router-link="{name:'TrainingCategory', params:category}"
        ></app-training-category-card>
      </div>
      <cs-spinner v-if="!categories"></cs-spinner>
      <app-section-header :title="translate('FeaturedResourcesTitle')"></app-section-header>
      <app-training-card v-for="article in featuredArticles" :key="article.id" :article="article"></app-training-card>
      <cs-spinner v-if="!featuredArticles"></cs-spinner>
      <app-section-header :title="translate('RecentlyAddedTitle')"></app-section-header>
      <app-training-card v-for="article in articles" :key="article.id" :article="article"></app-training-card>
      <cs-spinner v-if="!articles"></cs-spinner>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppSectionHeader from '@/components/general/SectionHeader.vue';
import AppTrainingCard from '@/components/training/TrainingCard.vue';
import AppTrainingCategoryCard from '@/components/training/TrainingCategoryCard.vue';
import ListTrainingCategories from '@/gql/training/ListTrainingCategories.gql';
import ListRecentTrainingArticles from '@/gql/training/ListRecentTrainingArticles.gql';
import ListFeaturedArticles from '@/gql/training/ListFeaturedArticles.gql';

export default {
  components: {
    AppRefresher,
    AppSectionHeader,
    AppTrainingCard,
    AppTrainingCategoryCard,
  },
  apollo: {
    categories: ListTrainingCategories,
    articles: ListRecentTrainingArticles,
    featuredArticles: ListFeaturedArticles,
  },
  mounted() {
    $analytics.trackEvent('training-home-view');
  },
};
</script>
<style scoped>
  .category-cards
  {
    white-space: nowrap;
  }
</style>
