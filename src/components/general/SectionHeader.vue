<template>
  <div class="component">
    <div class="icon" v-if="icon">
      <i :class="icon"></i>
    </div>
    <div class="cs-textstyle-section-heading title">
      <slot>{{title}}</slot>
    </div>
    <div class="cs-textstyle-link-text action" v-if="more" v-router-link="{ name: more }">
      {{translate('MoreButtonLabel')}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Section Title',
    },
    icon: {
      type: String,
      required: false,
    },
    more: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
  .component
  {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 10px;
  }
  .component:not(:first-of-type)
  {
    margin-top: 30px;
  }
  .icon
  {
    margin-right: 12px;
  }
  .icon i
  {
    font-size: 24px;
  }
  .title
  {
    flex: 1;
  }
  .action
  {
    color:var(--cs-primary-base);
  }
</style>
