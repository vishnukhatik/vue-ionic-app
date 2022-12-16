<template>
  <div id="app">
    <ion-app>
      <ion-vue-router name="default"></ion-vue-router>
    </ion-app>
  </div>
</template>
<script>
import $analytics from '@/services/analytics';

export default {
  mounted() {
    $analytics.trackEvent('app-started');
  },
};
</script>
