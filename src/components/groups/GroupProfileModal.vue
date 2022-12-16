<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="save()">Update</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <cs-form v-model="formValid">
        <cs-input required class="input" :label="translate('NameLabel')" v-model="name"></cs-input>
        <cs-textarea required class="input" :label="translate('DescriptionLabel')" v-model="description"></cs-textarea>
        <cs-file-input class="input" :label="translate('PictureLabel')" v-model="picture" accept-type="image/*" application-id="15600fe9-713d-4ba1-a1cd-4a2d2c916b5c"></cs-file-input>
        <cs-input required class="input" :label="translate('MeetingTimeLabel')" v-model="meeting_time"></cs-input>
        <cs-select required class="input" :options="dayOptions" :label="translate('MeetingDayLabel')" v-model="meeting_day"></cs-select>
        <cs-place-input required class="input" :label="translate('LocationLabel')" v-model="google_place_id"
          api-key="AIzaSyCMUTVTu0_welFWxPY0DN4-Mw0YfhGPBos"
          @resolved="handlePlace"
          :types="['address']"
        >
        </cs-place-input>
        <cs-checkbox :label="translate('HideLocationLabel')" v-model="hide_location"></cs-checkbox>
      </cs-form>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $apollo from '@/services/apollo';
import $utils from '@/services/utils';
import UpdateGroup from '@/gql/groups/UpdateGroup.gql';

export default {
  data() {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const daysOfWeek = days.map((day) => ({
      value: day,
      label: this.$moment().day(day).format('dddd'),
    }));
    return {
      formValid: false,
      id: null,
      name: null,
      description: null,
      picture: null,
      meeting_day: null,
      meeting_time: null,
      google_place_id: null,
      dayOptions: daysOfWeek,
      hide_location: null,
    };
  },
  methods: {
    async save() {
      await $apollo.mutate({
        mutation: UpdateGroup,
        variables: {
          id: this.id,
          name: this.name,
          description: this.description,
          picture: this.picture,
          meeting_day: this.meeting_day,
          meeting_time: this.meeting_time,
          google_place_id: this.google_place_id,
          hide_location: this.hide_location,
        },
      });
      this.dismiss();
    },
    dismiss() {
      this.$ionic.modalController.dismiss();
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
