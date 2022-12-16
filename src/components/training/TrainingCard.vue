<template>
  <cs-article-card class="component"
    v-router-link="{name: 'TrainingArticle', params:article}"
    :picture="article.picture"
    picture-position="left"
    picture-size="small"
    :tags="tags"
    :title="article.title"
    :summary="article.summary"
    :date="article.updated_at"
  >
    <i :class="icon" v-if="icon && !article.picture" slot="media-icon"></i>
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
    icon() {
      return this.article && (IconMap[this.article.attachment_type] || IconMap.unknown);
    },
    tags() {
      return [this.article.category.name];
    },
  },
};
</script>
<style scoped>
  .component
  {
    margin-bottom: 15px;
  }
</style>
