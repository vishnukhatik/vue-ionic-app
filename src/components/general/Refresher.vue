<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
</template>
<script>
export default {
  props: {
    queries: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleRefresh(event) {
      await Promise.all(Object.keys(this.queries).map((key) => {
        return this.queries[key].refetch();
      }));
      event.target.complete();
    },
  },
};
</script>
