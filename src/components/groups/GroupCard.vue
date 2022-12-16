<template>
  <cs-card v-router-link="{name:'Group', params:group}" position="left" class="group-card" size="small">
    <img :src="group.picture" slot="media">
    <div slot="body">
      <div class="cs-textstyle-item-heading">{{group.name}}</div>
      <div class="cs-textstyle-paragraph-small">
        <i class="icons8-conference"></i>
        {{group.members_aggregate.aggregate.count}} Members
      </div>
      <div class="cs-textstyle-paragraph-small">
        <i class="icons8-clock"></i>
        Every {{localizeDay(group.meeting_day)}} at {{group.meeting_time}}
      </div>
      <div class="cs-textstyle-paragraph-small location">
        <i class="icons8-marker"></i>
        {{group.google_place.name}}
      </div>
    </div>
  </cs-card>
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  methods: {
    localizeDay(day) {
      return this.$moment().day(day).format('dddd');
    },
  },
};
</script>
<style scoped>
  .group-card
  {
    margin-bottom: 12px;
  }
  .group-card .cs-textstyle-item-heading
  {
    margin-bottom: 16px;
  }
  .group-card .cs-textstyle-paragraph-small
  {
    color: var(--cs-secondary-base);
  }
  .group-card .cs-textstyle-paragraph-small:not(:last-child)
  {
    margin-bottom: 5px;
  }
  .location
  {
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
