<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('PendingMembersTitle')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="grey-content ion-padding">
      <div v-for="member in pendingMembers" :key="member.id" class="member">
        <cs-avatar slot="start" :picture="member.user.picture" :name="member.user.name"></cs-avatar>
        <div class="name cs-textstyle-item-heading">{{member.user.name}}</div>
        <cs-button variant="success" class="action-button" size="small" slot="end" fill="outline" @click="approveMember(member)">{{translate('ApproveButtonLabel')}}</cs-button>
        <cs-button variant="danger" class="action-button" size="small" slot="end" fill="outline" @click="removeMember(member)">{{translate('RemoveButtonLabel')}}</cs-button>
      </div>
      <cs-empty-state v-if="pendingMembers.length == 0" :title="translate('ZeroPendingMembersTitle')"></cs-empty-state>
    </ion-content>
  </div>
</template>
<script>
import 'cs-components';
import $apollo from '@/services/apollo';
import ApproveMember from '@/gql/groups/ApproveMember.gql';
import RemoveMember from '@/gql/groups/RemoveMember.gql';

export default {
  data() {
    return {
      group: null,
      query: '',
    };
  },
  computed: {
    pendingMembers() {
      return this.group.members.filter((m) => (!m.is_approved));
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
    async approveMember(member) {
      await $apollo.mutate({
        mutation: ApproveMember,
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
.action-button
{
  margin-left: 4px;
}
</style>
