<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Edit Profile</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="save()" :disabled="!formValid">Save</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="grey-content ion-padding">
      <cs-form v-model="formValid">
        <cs-input class="input" :label="translate('NameLabel')" v-model="name" required></cs-input>
        <cs-file-input class="input" :label="translate('PictureLabel')" v-model="picture" accept-type="image/*"
          application-id="15600fe9-713d-4ba1-a1cd-4a2d2c916b5c"
        ></cs-file-input>
        <cs-textarea class="input" :label="translate('AboutMeTitle')" v-model="about"></cs-textarea>
        <cs-select class="input" :label="translate('AgeRangeLabel')" v-model="age_range" :options="ageRangeOptions"></cs-select>
        <cs-select class="input" :label="translate('GenderLabel')" v-model="gender" :options="genderOptions"></cs-select>
        <cs-input class="input" :label="translate('EmailLabel')" v-model="email" type="email" disabled></cs-input>
        <cs-input class="input" :label="translate('PhoneLabel')" v-model="phone" type="tel"></cs-input>
        <cs-input class="input" :label="translate('FacebookLabel')" v-model="facebook" type="url"></cs-input>
      </cs-form>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $apollo from '@/services/apollo';
import GetUser from '@/gql/more/GetUser.gql';
import UpdateUser from '@/gql/more/UpdateUser.gql';

export default {
  data() {
    return {
      formValid: false,
      id: null,
      name: null,
      picture: null,
      about: null,
      location: null,
      age_range: null,
      gender: null,
      email: null,
      phone: null,
      facebook: null,
      ageRangeOptions: [
        {
          label: 'Under 20',
          value: '-20',
        },
        {
          label: '20 - 29',
          value: '20-29',
        },
        {
          label: '30 - 39',
          value: '30-39',
        },
        {
          label: '40 - 49',
          value: '40-49',
        },
        {
          label: '50 - 59',
          value: '50-59',
        },
        {
          label: '60 - 69',
          value: '60-69',
        },
        {
          label: '70 - 79',
          value: '70-79',
        },
        {
          label: '80 or above',
          value: '80-',
        },
      ],
      genderOptions: [
        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        },
        {
          label: 'Other',
          value: 'Other',
        },
      ],
    };
  },
  methods: {
    async save() {
      await $apollo.mutate({
        mutation: UpdateUser,
        variables: {
          id: this.id,
          name: this.name,
          picture: this.picture,
          about: this.about,
          age_range: this.age_range,
          gender: this.gender,
          email: this.email,
          phone: this.phone,
          facebook: this.facebook,
        },
        update: (store, resp) => {
          store.writeQuery({
            query: GetUser,
            variables: {
              id: this.id,
            },
            data: resp.data.user,
          });
        },
      });
      this.$ionic.modalController.dismiss(true);
    },
    dismiss() {
      this.$ionic.modalController.dismiss(false);
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
