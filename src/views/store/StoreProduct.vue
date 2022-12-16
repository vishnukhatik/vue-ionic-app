<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <app-cover v-if="product && product.images[0]" :picture="product.images[0].src" alt=""></app-cover>
    <cs-spinner v-if="!product"></cs-spinner>
    <div class="ion-padding" v-if="product">
      <div class="cs-textstyle-page-title">{{product.name}}</div>
      <div class="price-bar">
        <div class="cs-textstyle-page-subtitle price">${{product.price}}</div>
        <cs-button>{{translate('BuyNowButtonLabel')}}</cs-button>
      </div>
      <div class="cs-textstyle-item-heading">{{translate('DescriptionTitle')}}</div>
      <div class="cs-textstyle-paragraph" v-html="product.description"></div>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import GetProduct from '@/gql/store/GetProduct.gql';
import AppCover from '@/components/general/Cover.vue';

export default {
  components: {
    AppRefresher,
    AppCover,
  },
  apollo: {
    product: {
      query: GetProduct,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('store-product-view', this.$route.params.id);
  },
};
</script>
<style scoped>
  .cs-textstyle-page-title
  {
    margin-top: 4px;
  }
  .price
  {
    color: var(--cs-primary-base);
  }
  .price-bar
  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .cs-textstyle-item-heading
  {
    margin-bottom: 15px;
  }
</style>
