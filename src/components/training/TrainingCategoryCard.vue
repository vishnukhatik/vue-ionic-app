<template>
  <div class="component">
    <img :src="icon"/>
    <div class="cs-textstyle-paragraph-bold">{{category.name}}</div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      return `https://img.icons8.com/ios/200/ffffff/${this.category.icon}.png`;
    },
  },
};
</script>
<style scoped>
.component {
  margin-right: 12px;
  display: inline-flex;
  background-color: #AA0B00;
  color:white;
  text-align: center;
  border-radius: 5px;
  width: 112px;
  height: 96px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.component img
{
  width: 40px;
  height: 40px;
  margin: 4px;
}
</style>
