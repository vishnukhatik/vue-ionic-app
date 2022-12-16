<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{translate('AboutUsTitle')}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <cs-card style="margin-bottom:10px;">
      <div slot="body">
        <div class="cs-textstyle-section-heading">{{translate('ContactUsTitle')}}</div>
        <div class="cs-textstyle-paragraph">www.fridayoutreach.com</div>
        <div class="cs-textstyle-paragraph">info@fridayoutreach.com</div>
        <div class="cs-textstyle-paragraph">+1 234 56789</div>
        <div class="cs-textstyle-paragraph">1 Supreme Court Road, The Hague, Netherlands</div>
      </div>
    </cs-card>

    <cs-card>
      <div slot="body">
        <div class="cs-textstyle-section-heading">{{translate('AboutUsTitle')}}</div>
        <div class="cs-textstyle-paragraph">{{translate('AboutUsDescription')}}</div>
      </div>
    </cs-card>
  </ion-content>
</ion-page>
</template>
<script>
import $analytics from '@/services/analytics';

export default {
  mounted() {
    $analytics.trackEvent('about-view');
  },
};
</script>
