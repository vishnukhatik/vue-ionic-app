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
      <app-product-card v-for="product in category.products" :key="product.id" :product="product"></app-product-card>
      <cs-empty-state v-if="!category.products.length" :title="translate('ZeroProductsTitle')" :description="translate('ZeroProductsDescription')"></cs-empty-state>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppProductCard from '@/components/store/ProductCard.vue';
import GetCategory from '@/gql/store/GetCategory.gql';

export default {
  components: {
    AppRefresher,
    AppProductCard,
  },
  apollo: {
    category: {
      query: GetCategory,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('store-category-view', this.$route.params.id);
  },
};
</script>
