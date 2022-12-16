<template>
<div>
  <ion-tabs>
    <ion-tab tab="/tabs/home">
      <ion-vue-router name="home"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/training">
      <ion-vue-router name="training"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/groups">
      <ion-vue-router name="groups"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/news">
      <ion-vue-router name="news"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/community">
      <ion-vue-router name="community"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/store">
      <ion-vue-router name="store"></ion-vue-router>
    </ion-tab>
    <ion-tab tab="/tabs/more">
      <ion-vue-router name="more"></ion-vue-router>
    </ion-tab>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="/tabs/home">
        <i class="tab-icon icons8-home"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/training">
        <i class="tab-icon icons8-book-shelf"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/groups">
        <i class="tab-icon icons8-group"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/store">
        <i class="tab-icon icons8-shopping-bag-full"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/news">
        <i class="tab-icon icons8-news"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/community">
        <i class="tab-icon icons8-chat-bubble"></i>
      </ion-tab-button>
      <ion-tab-button tab="/tabs/more">
        <i class="tab-icon icons8-menu-vertical"></i>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</div>
</template>
<script>
import {
  home, school, people, newspaper, globe, grid, cart,
} from 'ionicons/icons';

export default {
  data() {
    return {
      home,
      school,
      people,
      newspaper,
      globe,
      grid,
      cart,
    };
  },
};
</script>
<style scoped>
  .tab-icon
  {
    font-size: 30px;
  }
</style>
