<template>
  <cs-card v-router-link="{name:'StoreProduct', params:product}"
    position="left"
  >
    <img v-if="picture" :src="picture" slot="media">
    <div slot="body">
      <cs-tag v-if="category">{{category}}</cs-tag>
      <div class="cs-textstyle-item-heading">{{product.name}}</div>
      <div class="cs-textstyle-paragraph description">{{description}}</div>
      <div class="cs-textstyle-item-heading">${{product.price}}</div>
    </div>
  </cs-card>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    picture() {
      return this.product.images.length && this.product.images[0].src;
    },
    category() {
      return this.product.categories.length && this.product.categories[0].name;
    },
    description() {
      const el = document.createElement('div');
      el.innerHTML = this.product.short_description;
      return el.innerText;
    },
  },
};
</script>
<style scoped>
  .description
  {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  .cs-textstyle-item-heading
  {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
  }
</style>
