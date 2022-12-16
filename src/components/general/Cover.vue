<template>
  <div class="cover" :style="coverStyle">
    <div class="cover-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    picture: {
      type: String,
      required: true,
    },
  },
  computed: {
    coverStyle() {
      return {
        backgroundImage: `   linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('${this.picture}')`,
      };
    },
  },
};
</script>
<style scoped>
.cover
{
  min-height: 200px;
  width: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column-reverse;
  padding: 16px;
}
.cover-content
{
  text-align: center;
}
</style>
