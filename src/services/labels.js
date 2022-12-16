import ListLabels from '@/gql/general/ListLabels.gql';
import $apollo from './apollo';

export default {
  data() {
    return {
      translations: {},
    };
  },
  methods: {
    async loadTranslation(language) {
      const l = await $apollo.query({
        query: ListLabels,
        variables: {
          language,
        },
      });
      this.translations = {};
      l.data.label_translation_view.forEach((translation) => {
        this.translations[translation.id] = translation.display_value;
      });
    },
    translate(key) {
      return this.translations[key];
    },
    setTranslation(language) {
      this.loadTranslation(language);
      localStorage.language = language;
    },
  },
  created() {
    this.loadTranslation(localStorage.language || 'en');
  },
};
