<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('LeadersTitle')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="grey-content ion-padding special-padding">
      <div v-for="leader in leaders" :key="leader.id" lines="none" class="leader">
        <cs-avatar slot="start" :picture="leader.picture" :name="leader.name" size="small"></cs-avatar>
        <div class="name cs-textstyle-item-heading">{{leader.name}}</div>
        <cs-social-icon-button class="social-icon" network="email" :href="'mailto:' + leader.email"></cs-social-icon-button>
      </div>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';

export default {
  data() {
    return {
      group: null,
    };
  },
  computed: {
    leaders() {
      return this.group && this.group.members.filter((m) => (!!m.is_leader)).map((l) => (l.user));
    },
  },
  methods: {
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
  },
};
</script>
<style scoped>
  .leader
  {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    padding-top: 8px;
  }
  .leader:not(:last-child) {
    border-bottom: solid 1px var(--cs-gray-03);
  }
  .leader .name
  {
    flex: 1;
    margin-left: 15px;
  }
  .special-padding
  {
    padding: 20px !important;
    padding-top: 30px !important;
  }
</style>
