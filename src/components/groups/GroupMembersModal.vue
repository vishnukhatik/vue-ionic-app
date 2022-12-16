<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('MembersTitle')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="grey-content ion-padding">
      <cs-search-bar v-model="query" placeholder="Search members"></cs-search-bar>
      <div v-for="member in approvedMembers" :key="member.id" class="member">
        <cs-avatar slot="start" :picture="member.user.picture" :name="member.user.name" size="small"></cs-avatar>
        <div class="name cs-textstyle-item-heading">{{member.user.name}}</div>
        <cs-button variant="default" slot="end" fill="outline" @click="removeMember(member)" size="small">{{translate('RemoveButtonLabel')}}</cs-button>
      </div>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $apollo from '@/services/apollo';
import RemoveMember from '@/gql/groups/RemoveMember.gql';

export default {
  data() {
    return {
      group: null,
      query: '',
    };
  },
  computed: {
    approvedMembers() {
      return this.group.members.filter((m) => (!!m.is_approved)).filter((m) => (m.user.name.toLowerCase().includes(this.query.toLowerCase())));
    },
  },
  methods: {
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
    async removeMember(member) {
      await $apollo.mutate({
        mutation: RemoveMember,
        variables: {
          id: member.id,
        },
      });
    },
  },
};
</script>
<style scoped>
.tabs
{
  --cs-page-tabs-content-padding: 12px 0px 0px 0px;
}
.member
{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  border-bottom: solid 1px #ccc;
  padding-top: 8px;
  padding-bottom: 8px;
}
.member:last-child
{
  border-bottom: none;
}
.member .name
{
  flex: 1;
  margin-left: 8px;
}
</style>
