<template>
  <cs-article-card class="component"
    v-router-link="{name: 'NewsItem', params:article}"
    :picture="picture"
    picture-position="left"
    picture-size="small"
    :title="article.title"
    :summary="article.summary"
    :date="article.updated_at"
  >
    <i :class="icon" v-if="icon && !picture" slot="media-icon"></i>
  </cs-article-card>
</template>
<script>
import IconMap from '@/assets/iconmap.json';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    picture() {
      return this.article && this.article.picture;
    },
    icon() {
      return this.article && (IconMap[this.article.attachment_type] || IconMap.unknown);
    },
  },
};
</script>
<style scoped>
  .component
  {
    margin-bottom: 12px;
  }
</style>
