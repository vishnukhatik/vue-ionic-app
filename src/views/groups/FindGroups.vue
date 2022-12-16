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
      <ion-buttons slot="end">
        <i class="header-icon icons8-map" v-router-link="{name: 'FindGroupsMap'}"></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <div v-if="groups">
      <div class="group-result" v-for="group in results" :key="group.id" v-router-link="{name: 'Group', params: group}">
        <div class="group-result-header">
          <div class="cs-textstyle-item-heading">{{group.name}}</div>
          <div class="cs-textstyle-paragraph distance">{{Math.round(group.distance)}}km</div>
        </div>
        <div class="group-result-location cs-textstyle-paragraph-small">
          <i class="icons8-marker"></i>
          <span>{{group.google_place.name}}</span>
        </div>
      </div>
      <!-- <app-group-card v-for="group in results" :key="group.id" :group="group"></app-group-card> -->
    </div>
    <cs-empty-state v-if="groups && !results.length" :title="translate('NoMatchingGroupsTitle')">
      <cs-button @click="query = ''">{{translate('ClearSearchButtonLabel')}}</cs-button>
    </cs-empty-state>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $utils from '@/services/utils';
import $analytics from '@/services/analytics';

// import AppGroupCard from '@/components/groups/GroupCard.vue';
import AppRefresher from '@/components/general/Refresher.vue';
import ListGroups from '@/gql/groups/ListGroups.gql';

export default {
  components: {
    // AppGroupCard,
    AppRefresher,
  },
  apollo: {
    groups: ListGroups,
  },
  data() {
    return {
      query: '',
      userLocation: {},
    };
  },
  computed: {
    results() {
      const userPosition = {
        latitude: this.userLocation.latitude || 0,
        longitude: this.userLocation.longitude || 0,
      };
      const fields = ['name', 'location'];
      return this.groups && this.groups.filter((g) => {
        return fields.some((field) => {
          return g[field] && g[field].toLowerCase().includes(this.query.toLowerCase());
        });
      }).map((g) => {
        g.distance = $utils.calculateDistance(g.google_place.latitude, g.google_place.longitude, userPosition.latitude, userPosition.longitude);
        return g;
      }).sort((a, b) => {
        return a.distance - b.distance;
      });
    },
  },
  async mounted() {
    this.userLocation = await $auth.getLocation();
    $analytics.trackEvent('find-groups-list-view');
  },
};
</script>
<style scoped>
.group-result-header
{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.group-result
{
  border-bottom: solid 1px #efefef;
  padding-top: 15px;
  padding-bottom: 15px;
}
.distance
{
  color: #8E989F;
}
</style>
