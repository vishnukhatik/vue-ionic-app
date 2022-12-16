<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{translate('RecentTestimoniesTitle')}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <app-public-posts></app-public-posts>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import AppPublicPosts from '@/components/testimonies/PublicPosts.vue';

export default {
  components: {
    AppPublicPosts,
  },
  mounted() {
    $analytics.trackEvent('testimony-list-view');
  },
};
</script>
