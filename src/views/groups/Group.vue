<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title></ion-title>
      <ion-buttons slot="end">
        <i class="header-icon icons8-menu-vertical" @click="showGroupMenu()" v-if="userIsPendingMember || userIsApprovedMember"></i>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="grey-content">
    <app-refresher :queries="$apollo.queries"></app-refresher>
    <cs-spinner v-if="!group"></cs-spinner>
    <div v-if="group">
      <app-cover :picture="group.picture">
        <div v-if="userIsApprovedMember"></div>
        <div v-else-if="userIsPendingMember">{{translate('MembershipPendingLabel')}}</div>
        <div v-else>
          <cs-button @click="joinGroup()">{{translate('RequestToJoinButtonLabel')}}</cs-button>
        </div>
      </app-cover>
      <!-- PENDING MEMBERS -->
      <div class="ion-padding" v-if="pendingMembers.length && userIsLeader">
        <cs-button block @click="showPendingMemberModal()">{{pendingMembers.length}} Pending Members</cs-button>
      </div>
      <!-- PROFILE -->
      <div class="ion-padding">
        <div class="cs-textstyle-page-title group-title">{{group.name}}</div>
        <div class="group-meta cs-textstyle-paragraph">
          <i class="icons8-clock"></i>
          Meets every {{localizeDay(group.meeting_day)}} at {{group.meeting_time}}
        </div>
        <div class="group-meta cs-textstyle-paragraph" v-if="showLocation">
          <i class="icons8-marker"></i>
          {{group.google_place.name}}
        </div>
      </div>
      <!-- MAP -->
      <cs-static-map v-if="showLocation"
        :center="{lat:group.google_place.latitude, lng:group.google_place.longitude}"
        :address="group.location"
        api-key="AIzaSyCMUTVTu0_welFWxPY0DN4-Mw0YfhGPBos"
        :zoom="16"
      >
      </cs-static-map>
      <!-- DESCRIPTION -->
      <div class="section">
        <div class="cs-textstyle-item-heading">{{translate('DescriptionTitle')}}</div>
        <div class="cs-text-style-paragraph">{{group.description}}</div>
      </div>
      <!-- MEMBERS -->
      <div class="section" v-if="userIsLeader">
        <div class="cs-textstyle-item-heading">{{translate('MembersTitle')}}</div>
        <div class="cs-text-style-paragraph">{{members.length}} members</div>
        <div class="people-bar" v-if="members.length">
          <cs-avatar-list
            :userList="members"
            size="small"
            :max="5"
          >
          </cs-avatar-list>
          <cs-button variant="default" fill="outline" @click="showMemberModal()">{{translate('AllMembersButtonLabel')}}</cs-button>
        </div>
      </div>
      <div class="section">
        <div class="cs-textstyle-item-heading">{{translate('LeadersTitle')}}</div>
        <div class="cs-text-style-paragraph">{{leaders.length}} leaders</div>
        <div class="people-bar" v-if="leaders.length">
          <cs-avatar-list
            :userList="leaders"
            size="small"
            :max="5"
          >
          </cs-avatar-list>
          <cs-button variant="default" fill="outline" @click="showLeaderModal()">{{translate('AllLeadersButtonLabel')}}</cs-button>
        </div>
      </div>
      <div class="section" v-if="userIsApprovedMember">
        <div class="cs-textstyle-item-heading">{{translate('ActivitiesTitle')}}</div>
        <app-group-posts :group_id="group.id"></app-group-posts>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import AppCover from '@/components/general/Cover.vue';
import AppGroupPosts from '@/components/groups/GroupPosts.vue';
import AppRefresher from '@/components/general/Refresher.vue';
import GetGroup from '@/gql/groups/GetGroup.gql';
import JoinGroup from '@/gql/groups/JoinGroup.gql';
import LeaveGroup from '@/gql/groups/LeaveGroup.gql';
import GroupProfileModal from '@/components/groups/GroupProfileModal.vue';
import GroupLeadersModal from '@/components/groups/GroupLeadersModal.vue';
import GroupMembersModal from '@/components/groups/GroupMembersModal.vue';
import GroupPendingMembersModal from '@/components/groups/GroupPendingMembersModal.vue';
import GroupReportModal from '@/components/groups/GroupReportModal.vue';
import ListMyGroups from '@/gql/groups/ListMyGroups.gql';

export default {
  components: {
    AppCover,
    AppGroupPosts,
    AppRefresher,
  },
  apollo: {
    group: {
      query: GetGroup,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  computed: {
    leaders() {
      // Returns the list of all leaders as user objects
      return this.group && this.group.members.filter((m) => (!!m.is_leader)).map((l) => (l.user));
    },
    members() {
      // Returns the list of all members as user objects
      return this.group && this.group.members.map((l) => (l.user));
    },
    pendingMembers() {
      return this.group && this.group.members.filter((m) => (!m.is_approved)).map((l) => (l.user));
    },
    userMembership() {
      // Returns the current user's relationship with the group
      return this.group && this.group.members.filter((m) => (m.user.id === $auth.getUserId()))[0];
    },
    userIsLeader() {
      return this.userMembership && this.userMembership.is_leader;
    },
    userIsApprovedMember() {
      return this.userMembership && this.userMembership.is_approved;
    },
    userIsPendingMember() {
      return this.userMembership && !this.userMembership.is_approved;
    },
    showLocation() {
      return !this.group.hide_location || this.userIsApprovedMember();
    },
  },
  methods: {
    localizeDay(day) {
      return this.$moment().day(day).format('dddd');
    },
    async showProfileModal() {
      const modal = await this.$ionic.modalController.create({
        component: GroupProfileModal,
        componentProps: {
          data: { ...this.group },
        },
      });
      await modal.present();
    },
    async showMemberModal() {
      const modal = await this.$ionic.modalController.create({
        component: GroupMembersModal,
        componentProps: {
          data: {
            group: this.group,
          },
        },
      });
      await modal.present();
    },
    async showPendingMemberModal() {
      const modal = await this.$ionic.modalController.create({
        component: GroupPendingMembersModal,
        componentProps: {
          data: {
            group: this.group,
          },
        },
      });
      await modal.present();
    },
    async showLeaderModal() {
      const modal = await this.$ionic.modalController.create({
        component: GroupLeadersModal,
        componentProps: {
          data: {
            group: this.group,
          },
        },
      });
      await modal.present();
    },
    async showEventModal() {
      const modal = await this.$ionic.modalController.create({
        component: GroupReportModal,
        componentProps: {
          data: {
            group_id: this.group.id,
            google_place_id: this.group.google_place_id,
          },
        },
      });
      await modal.present();
    },
    async joinGroup() {
      await this.$apollo.mutate({
        mutation: JoinGroup,
        variables: {
          user_id: $auth.getUserId(),
          group_id: this.$route.params.id,
        },
        update: (store, resp) => {
          const variables = {
            user_id: $auth.getUserId(),
          };
          const data = store.readQuery({
            query: ListMyGroups,
            variables,
          });
          data.memberships.push(resp.data.membership);
          store.writeQuery({
            query: ListMyGroups,
            variables,
            data,
          });
        },
      });
    },
    async leaveGroup() {
      await this.$apollo.mutate({
        mutation: LeaveGroup,
        variables: {
          user_id: $auth.getUserId(),
          group_id: this.$route.params.id,
        },
        update: (store) => {
          const variables = {
            user_id: $auth.getUserId(),
          };
          const data = store.readQuery({
            query: ListMyGroups,
            variables,
          });
          data.memberships = data.membership.filter((m) => !(m.group.id === this.$route.params.id));
          store.writeQuery({
            query: ListMyGroups,
            variables,
            data,
          });
        },
      });
    },
    async showGroupMenu() {
      let buttons = [
        {
          text: 'Leave Group',
          role: 'destructive',
          handler: this.leaveGroup,
        },
      ];
      if (this.userIsLeader) {
        buttons = [
          {
            text: 'Edit Group',
            handler: this.showProfileModal,
          },
          {
            text: 'Manage Members',
            handler: this.showMemberModal,
          },
          {
            text: 'Send Report',
            handler: this.showEventModal,
          },
        ];
      }
      this.actionSheet = await this.$ionic.actionSheetController.create({
        buttons,
      });
      await this.actionSheet.present();
    },
  },
  mounted() {
    $analytics.trackEvent('group-view', this.$route.params.id);
  },
};
</script>
<style scoped>
  .group-title
  {
    margin-top: 10px;
  }
  .people-bar
  {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    align-items: center;
  }
  .group-meta
  {
    margin-top: 10px;
  }
  .group-meta i
  {
    font-size: 16px;
  }
  .section
  {
    padding-top: 30px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .section .cs-textstyle-item-heading
  {
    margin-bottom: 10px;
  }
</style>
