<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>My Groups</ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-search" v-router-link="{name:'FindGroups'}" ></i>
        <i class="header-icon icons8-add" @click="showGroupRequestModal()"></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <cs-spinner v-if="!memberships"></cs-spinner>
    <div v-if="memberships">
      <cs-empty-state v-if="memberships.length == 0" :title="translate('ZeroGroupsTitle')" :description="translate('ZeroGroupsDescription')">
        <cs-button v-router-link="{name:'FindGroups'}" icon="icons8-map">
          {{translate('FindGroupButtonLabel')}}
        </cs-button>
      </cs-empty-state>
      <app-group-card v-for="membership in memberships" :key="membership.id" :group="membership.group"></app-group-card>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import AppRefresher from '@/components/general/Refresher.vue';
import AppGroupCard from '@/components/groups/GroupCard.vue';
import AppGroupRequestModal from '@/components/groups/GroupRequestModal.vue';
import ListMyGroups from '@/gql/groups/ListMyGroups.gql';

export default {
  components: {
    AppRefresher,
    AppGroupCard,
  },
  apollo: {
    memberships: {
      query: ListMyGroups,
      variables() {
        return {
          user_id: $auth.getUserId(),
        };
      },
    },
  },
  methods: {
    async showGroupRequestModal() {
      const modal = await this.$ionic.modalController.create({
        component: AppGroupRequestModal,
      });
      await modal.present();
    },
  },
  mounted() {
    $analytics.trackEvent('my-groups-view');
  },
};
</script>
