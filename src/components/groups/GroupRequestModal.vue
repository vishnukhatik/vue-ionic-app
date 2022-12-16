<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('StartGroupTitle')}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="save()" :disabled="!formValid">Send</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <div class="text-center extra-padding">
        <div class="cs-textstyle-page-title modal-title">{{translate('StartGroupPrompt')}}</div>
        <div class="cs-textstyle-paragraph">{{translate('StartGroupMessage')}}</div>
      </div>
      <cs-form v-model="formValid">
        <cs-input class="input-control" :label="translate('NameLabel')" required v-model="user_name"></cs-input>
        <cs-input class="input-control" :label="translate('EmailLabel')" required v-model="user_email"></cs-input>
        <cs-input class="input-control" :label="translate('PhoneLabel')" required v-model="user_phone"></cs-input>
        <cs-place-input class="input-control" :label="translate('LocationLabel')"
          v-model="google_place_id" api-key="AIzaSyCMUTVTu0_welFWxPY0DN4-Mw0YfhGPBos"
          @resolved="handlePlace"
          :types="['address']"
        >
        </cs-place-input>
      </cs-form>
      <cs-textarea class="input-control" :label="translate('DescriptionLabel')" v-model="description"></cs-textarea>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $auth from '@/services/auth';
import $utils from '@/services/utils';
import $apollo from '@/services/apollo';
import GetUser from '@/gql/more/GetUser.gql';
import InsertGroupRequest from '@/gql/groups/InsertGroupRequest.gql';

export default {
  data() {
    return {
      formValid: false,
      user_name: null,
      user_email: null,
      user_phone: null,
      google_place_id: null,
      description: null,
    };
  },
  methods: {
    async save() {
      // Add mutation
      await $apollo.mutate({
        mutation: InsertGroupRequest,
        variables: {
          user_id: $auth.getUserId(),
          user_name: this.user_name,
          user_email: this.user_email,
          user_phone: this.user_phone,
          google_place_id: this.google_place_id,
          description: this.description,
        },
      });
      this.$ionic.modalController.dismiss(true);
      console.log('Done');
    },
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
    handlePlace(place) {
      $utils.savePlace(place, this.google_place_id);
    },
  },
  async mounted() {
    const { data: { user } } = await $apollo.query({
      query: GetUser,
      variables: {
        id: $auth.getUserId(),
      },
    });
    this.user_name = user.name;
    this.user_email = user.email;
    this.user_phone = user.phone;
  },
};
</script>
<style scoped>
  .modal-title
  {
    margin-bottom: 8px;
  }
  .input-control
  {
    margin-bottom: 25px;
    display: block;
  }
</style>
