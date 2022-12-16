<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{translate('SelectLanguageTitle')}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-language-selector @select="next()"></app-language-selector>
  </ion-content>
</ion-page>
</template>
<script>
import AppLanguageSelector from '@/components/general/LanguageSelector.vue';

export default {
  components: {
    AppLanguageSelector,
  },
  methods: {
    next() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
<style scoped>
</style>
