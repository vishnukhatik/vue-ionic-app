<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text=""></ion-back-button>
      </ion-buttons>
      <div class="search-container">
        <cs-search-bar v-model="query"></cs-search-bar>
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <cs-spinner v-if="$apollo.queries.products.loading"></cs-spinner>
    <div v-if="products">
      <app-product-card v-for="product in products" :key="product.id" :product="product"></app-product-card>
      <cs-empty-state v-if="!products.length" title="No results">
        <cs-button @click="query = ''">{{translate('ClearSearchButtonLabel')}}</cs-button>
      </cs-empty-state>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import SearchProducts from '@/gql/store/SearchProducts.gql';
import AppProductCard from '@/components/store/ProductCard.vue';

export default {
  components: {
    AppProductCard,
  },
  data() {
    return {
      query: '',
    };
  },
  apollo: {
    products: {
      query: SearchProducts,
      variables() {
        return {
          query: this.query,
        };
      },
    },
  },
};
</script>
