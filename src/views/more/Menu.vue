<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <app-profile-header v-if="user" :user="user"></app-profile-header>
    <div class="menu-item cs-textstyle-paragraph-bold" v-router-link="{ name:'Profile' }">
      <i class="icons8-user"></i>
      {{translate('ProfileTitle')}}
    </div>
    <div class="menu-item cs-textstyle-paragraph-bold" lines="none" v-router-link="{ name:'About' }">
      <i class="icons8-info"></i>
      {{translate('AboutUsTitle')}}
    </div>
    <div class="menu-item cs-textstyle-paragraph-bold" lines="none" v-router-link="{ name:'LanguageSetting' }">
      <i class="icons8-info"></i>
      {{translate('LanguageTitle')}}
    </div>
    <div class="menu-item cs-textstyle-paragraph-bold" lines="none" @click="logout()">
      <i class="icons8-exit"></i>
      {{translate('LogoutButtonLabel')}}
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import GetUser from '@/gql/more/GetUser.gql';
import AppProfileHeader from '@/components/more/ProfileHeader.vue';

export default {
  components: {
    AppProfileHeader,
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.href = '/';
    },
  },
  apollo: {
    user: {
      query: GetUser,
      variables() {
        return {
          id: $auth.getUserId(),
        };
      },
    },
  },
  mounted() {
    $analytics.trackEvent('menu-view');
  },
};
</script>
<style scoped>
  .menu-item
  {
    padding-top:10px;
    padding-bottom: 20px;
  }
</style>
