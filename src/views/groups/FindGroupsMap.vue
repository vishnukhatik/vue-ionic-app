<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{translate('NearbyGroupsTitle')}}</ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-list" v-router-link="{name: 'FindGroup'}"></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="grey-content">
    <div v-if="groups">
      <cs-map
        api-key="AIzaSyCMUTVTu0_welFWxPY0DN4-Mw0YfhGPBos"
        :markers="mapMarkers"
        :zoom="10"
        :center="myLocation"
        @tap="handleMapTap"
      ></cs-map>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';
import ListGroups from '@/gql/groups/ListGroups.gql';

export default {
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
    mapMarkers() {
      const markers = this.groups.map((g) => ({
        lat: g.google_place.latitude,
        lng: g.google_place.longitude,
        title: g.name,
        id: g.id,
      }));
      return markers;
    },
    myLocation() {
      return {
        lat: 1.339550,
        lng: 103.869490,
      };
    },
  },
  methods: {
    handleMapTap(g) {
      this.$router.push({
        name: 'Group',
        params: g,
      });
    },
    goToListView() {
      this.$router.push({ name: 'FindGroups' });
    },
  },
  mounted() {
    $analytics.trackEvent('find-groups-map-view');
  },
};
</script>
