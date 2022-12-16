<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{translate('CategoriesTitle')}}</ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-search" v-router-link="{name:'TrainingSearch'}" ></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <cs-spinner v-if="!categories"></cs-spinner>
    <div class="category" v-for="category in categories" :key="category.id" v-router-link="{name:'TrainingCategory', params:category}">
      <span class="cs-textstyle-informative-paragraph-bold">{{category.name}}</span>
      <cs-badge variant="default">{{category.articles_aggregate.aggregate.count}}</cs-badge>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import AppRefresher from '@/components/general/Refresher.vue';
import ListTrainingCategories from '@/gql/training/ListTrainingCategories.gql';

export default {
  components: {
    AppRefresher,
  },
  apollo: {
    categories: ListTrainingCategories,
  },
};
</script>
<style scoped>
.category
{
  display: flex;
  align-items: center;
  padding: 12px;
  justify-content: space-between;
}
.category:nth-child(odd){
  background-color:#F9F9F9;
}
</style>
