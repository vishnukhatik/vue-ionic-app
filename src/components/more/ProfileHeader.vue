<template>
  <div class="component" v-router-link="{ name:'Profile' }">
    <div v-if="user" class="component-bar">
      <cs-avatar class="avatar" :name="user.name" :picture="user.picture"></cs-avatar>
      <div>
        <div class="cs-textstyle-page-title">{{user.name}}</div>
        <div class="cs-textstyle-paragraph">{{user.city}}, {{user.country}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      required: true,
    },
  },
};
</script>
<style scoped>
  .component
  {
    padding-top: 20px;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: solid 1px var(--cs-gray-02);
  }
  .component-bar
  {
    display: flex;
    align-items: center;
  }
  .cs-textstyle-paragraph
  {
    color: var(--cs-gray-04);
  }
  .component-bar .avatar
  {
    margin-right: 15px;
  }
</style>
