<template>
  <div>
    <div v-if="attachment.type == 'link/video'">
      <iframe :src="attachment.url"></iframe>
    </div>
    <div v-else-if="attachment.type == 'audio/mpeg'" class="ion-padding">
      <cs-audio-player
        :src="attachment.url"
        :song-name="attachment.title"
      >
      </cs-audio-player>
    </div>
    <div v-else-if="attachment.type == 'application/pdf'" class="ion-padding">
      <cs-file-preview
        :src="attachment.url"
        :title="attachment.title"
        file-type="pdf"
      >
      </cs-file-preview>
      <!-- <cs-button @click="window.open(attachment.url)">View PDF</cs-button> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attachment: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
iframe
{
  width: 100%;
  min-height: 200px;
  border-style: none;
}
</style>
