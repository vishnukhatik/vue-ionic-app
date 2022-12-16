<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{translate('ProfileTitle')}}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="showProfileModal()">{{translate('EditButtonLabel')}}</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <div v-if="user">
      <app-profile-header :user="user"></app-profile-header>
      <div class="section">
        <app-section-header>{{translate('AboutMeTitle')}}</app-section-header>
        <div class="cs-textstyle-paragraph">{{user.about}}</div>
      </div>
      <div class="section">
        <app-section-header>{{translate('InformationTitle')}}</app-section-header>
        <table>
          <tr class="tr">
            <td class="bio-field cs-textstyle-paragraph-bold">{{translate('DateOfBirthLabel')}}</td>
            <td class="cs-textstyle-paragraph">{{user.age_range}}</td>
          </tr>
          <tr class="tr">
            <td class="bio-field cs-textstyle-paragraph-bold">{{translate('GenderLabel')}}</td>
            <td class="cs-textstyle-paragraph">{{user.gender}}</td>
          </tr>
        </table>
      </div>
      <div class="section">
        <!-- <app-section-header>Contact Info</app-section-header> -->
        <div class="social-link">
          <cs-social-icon-button variant="email"></cs-social-icon-button>
          <div class="cs-textstyle-paragraph-bold name">
            {{user.email}}
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppProfileModal from '@/components/more/ProfileModal.vue';
import AppProfileHeader from '@/components/more/ProfileHeader.vue';
import AppSectionHeader from '@/components/general/SectionHeader.vue';
import GetUser from '@/gql/more/GetUser.gql';

export default {
  components: {
    AppRefresher,
    AppProfileHeader,
    AppSectionHeader,
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
  methods: {
    async showProfileModal() {
      const modal = await this.$ionic.modalController.create({
        component: AppProfileModal,
        componentProps: {
          data: { ...this.user },
        },
      });
      await modal.present();
    },
  },
  mounted() {
    $analytics.trackEvent('profile-view');
  },
};
</script>
<style scoped>
  .section
  {
    margin-bottom: 20px;
  }
  .bio-field
  {
    min-width: 150px;
  }
  .social-link
  {
    display: flex;
    align-items: center;
  }
  .social-link .name
  {
    margin-left: 10px;
  }
  .tr td
  {
    padding-bottom: 10px;
  }
</style>
