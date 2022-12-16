<template>
<ion-page>
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
