<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss()">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{translate('LikesTitle')}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding grey-content">
      <div v-for="reaction in reactions" :key="reaction.id" class="reaction">
        <cs-avatar size="small" :picture="reaction.user.picture" :name="reaction.user.name"></cs-avatar>
        <div class="name cs-textstyle-paragraph-bold">{{reaction.user.name}}</div>
      </div>
      <cs-empty-state v-if="!reactions.length" :title="translate('ZeroLikesTitle')" :description="translate('ZeroLikesDescription')"></cs-empty-state>
    </ion-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reactions: null,
    };
  },
  methods: {
    dismiss() {
      this.$ionic.modalController.dismiss(false);
    },
  },
};
</script>
<style scoped>
.reaction
{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  border-bottom: solid 1px #ccc;
  padding-top: 8px;
  padding-bottom: 8px;
}
.reaction:last-child
{
  border-bottom: none;
}
.reaction .name
{
  flex: 1;
  margin-left: 8px;
}</style>
