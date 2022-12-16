<template>
  <div>
    <div v-for="language in languages" @click="select(language)" :key="language.id">
      {{language.name_english}}
    </div>
  </div>
</template>
<script>
import $auth from '@/services/auth';
import ListLanguages from '@/gql/general/ListLanguages.gql';

export default {
  apollo: {
    languages: ListLanguages,
  },
  computed: {
    currentLanguage() {
      return $auth.getLanguage();
    },
  },
  methods: {
    select(language) {
      this.setTranslation(language.id);
      this.$emit('selected');
    },
  },
};
</script>
