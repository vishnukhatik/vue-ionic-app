<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Send Report</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="save()">Send</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <cs-date-input class="input" :label="translate('EventReportDateLabel')" v-model="date"></cs-date-input>
      <cs-place-input class="input" :label="translate('EventReportPlaceLabel')" v-model="google_place_id"
        api-key="AIzaSyCMUTVTu0_welFWxPY0DN4-Mw0YfhGPBos"
        @resolved="handlePlace"
        :types="['address']"
      >
      </cs-place-input>
      <cs-input class="input" type="number" :label="translate('EventReportParticipantLabel')" v-model="participant_count"></cs-input>
      <cs-input class="input" type="number" :label="translate('EventReportReachLabel')" v-model="engaged_count"></cs-input>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $utils from '@/services/utils';
import $apollo from '@/services/apollo';
import InsertGroupEvent from '@/gql/groups/InsertGroupEvent.gql';

export default {
  data() {
    return {
      group_id: null,
      google_place_id: null,
      date: new Date(),
      participant_count: null,
      engaged_count: null,
    };
  },
  methods: {
    async save() {
      await $apollo.mutate({
        mutation: InsertGroupEvent,
        variables: {
          group_id: this.group_id,
          google_place_id: this.google_place_id,
          date: this.date,
          participant_count: this.participant_count,
          engaged_count: this.engaged_count,
        },
      });
      this.$ionic.modalController.dismiss(true);
    },
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
    handlePlace(place) {
      $utils.savePlace(place, this.google_place_id);
    },
  },
};
</script>
<style scoped>
  .input
  {
    margin-bottom: 25px;
  }
</style>
