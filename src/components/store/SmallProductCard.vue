<template>
  <div v-router-link="{name:'StoreProduct', params:product}" class="small-product-card">
    <div class="image-wrapper">
      <img :src="product.images[0].src">
    </div>
    <div class="cs-textstyle-item-heading product-name">{{product.name}}</div>
    <div class="cs-textstyle-paragraph category">{{product.categories[0].name}}</div>
    <cs-floating-label class="price">${{product.price}}</cs-floating-label>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    extractText(html) {
      const el = document.createElement('div');
      el.innerHTML = html;
      return el.innerText;
    },
  },
};
</script>
<style scoped>
  .small-product-card
  {
    width: 100px;
    height: 160px;
    position: relative;
  }
  .product-name
  {
    width: 100px;
    overflow: hidden;
  }
  .image-wrapper
  {
    width: 100px;
    height: 120px;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .small-product-card img
  {
    width: 100px;
    min-height: 120px;
  }
  .price
  {
    position: absolute;
    top: 80px;
    right: -10px;
    font-size: 14px;
    font-weight: bold;
  }
  .category
  {
    color: #87939B;
    margin-top: 2px;
  }
</style>
