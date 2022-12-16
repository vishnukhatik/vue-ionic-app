<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>Store</ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-search" v-router-link="{name:'StoreSearch'}" ></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="grey-content ion-padding">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <app-section-header>{{translate('CategoriesTitle')}}</app-section-header>
    <cs-spinner v-if="!categories"></cs-spinner>
    <cs-tag v-for="category in categories" :key="category.id" v-router-link="{name:'StoreCategory', params:category}" class="tag">
      {{category.name}}
    </cs-tag>
    <app-section-header>{{translate('RecentProductsTitle')}}</app-section-header>
    <cs-spinner v-if="!recentProducts"></cs-spinner>
    <div class="endless">
      <app-small-product-card v-for="product in recentProducts" :key="product.id" :product="product"></app-small-product-card>
    </div>
    <app-section-header>{{translate('FeaturedProductsTitle')}}</app-section-header>
    <cs-spinner v-if="!featuredProducts"></cs-spinner>
    <app-product-card v-for="product in featuredProducts" :key="product.id" :product="product"></app-product-card>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppProductCard from '@/components/store/ProductCard.vue';
import AppSmallProductCard from '@/components/store/SmallProductCard.vue';
import AppSectionHeader from '@/components/general/SectionHeader.vue';
import ProductCategories from '@/gql/store/ProductCategories.gql';
import RecentProducts from '@/gql/store/RecentProducts.gql';
import FeaturedProducts from '@/gql/store/FeaturedProducts.gql';

export default {
  components: {
    AppRefresher,
    AppProductCard,
    AppSmallProductCard,
    AppSectionHeader,
  },
  apollo: {
    categories: ProductCategories,
    recentProducts: RecentProducts,
    featuredProducts: FeaturedProducts,
  },
  mounted() {
    $analytics.trackEvent('store-home-view');
  },
};
</script>
<style scoped>
  .tag
  {
    margin-right: 4px;
  }
</style>
