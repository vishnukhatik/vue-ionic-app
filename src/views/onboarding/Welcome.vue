<template>
<ion-page>
  <ion-content>
    <ion-slides pager="true" class="slides" ref="slides" @ionSlideWillChange="handleSlideChange">
      <ion-slide>
        <div class="welcome-slide">
          <img src="@/assets/learn.png">
          <div class="cs-textstyle-page-title">{{translate('OnboardingLearnTitle')}}</div>
          <div class="cs-textstyle-informative-paragraph">{{translate('OnboardingLearnDescription')}}</div>
        </div>
      </ion-slide>
      <ion-slide>
        <div class="welcome-slide">
          <img src="@/assets/joingroup.png">
          <div class="cs-textstyle-page-title">{{translate('OnboardingGroupTitle')}}</div>
          <div class="cs-textstyle-informative-paragraph">{{translate('OnboardingGroupDescription')}}</div>
        </div>
      </ion-slide>
      <ion-slide>
        <div class="welcome-slide">
          <img src="@/assets/stayconnected.png">
          <div class="cs-textstyle-page-title">{{translate('OnboardingConnectTitle')}}</div>
          <div class="cs-textstyle-informative-paragraph">{{translate('OnboardingConnectDescription')}}</div>
          <cs-button size="large" :block="true" to="Login" class="start-button">{{translate('OnboardingStartButtonLabel')}}</cs-button>
        </div>
      </ion-slide>
    </ion-slides>
    <cs-button @click="previousSlide()" v-if="selectedSlide != 0" fill="clear" class="previous-button">{{translate('SlideBackButtonLabel')}}</cs-button>
    <cs-button @click="nextSlide()" v-if="selectedSlide != 2" fill="clear" class="next-button">{{translate('SlideNextButtonLabel')}}</cs-button>
    <cs-button @click="goToLogin()" v-if="selectedSlide != 2" fill="clear" variant="default" class="skip-button">
      {{translate('SlideSkipButtonLabel')}}
      <i class="icons8-skip"></i>
    </cs-button>
  </ion-content>
</ion-page>
</template>
<script>
export default {
  data() {
    return {
      selectedSlide: 0,
    };
  },
  methods: {
    async handleSlideChange() {
      // console.log(await this.$refs.slides.getActiveIndex());
      this.selectedSlide = await this.$refs.slides.getActiveIndex();
    },
    previousSlide() {
      this.$refs.slides.slidePrev();
    },
    nextSlide() {
      this.$refs.slides.slideNext();
    },
    goToLogin() {
      this.$router.push({ name: 'OnboardingLanguage' });
    },
  },
};
</script>
<style scoped>
.slides
{
  height: 100%;
  --bullet-background-active: green;
}
.welcome-slide
{
  margin: 20px;
  padding: 16px;
}
.welcome-slide .cs-textstyle-page-title
{
  margin-bottom: 20px;
  color: var(--cs-primary-base);
}
.welcome-slide img
{
  padding-bottom: 60px;
}
.skip-button
{
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10000;
}
.previous-button, .next-button
{
  position: fixed;
  bottom: 0px;
  z-index: 10000;
}
.previous-button
{
  left: 0px;
}
.next-button
{
  right: 0px;
}
.login-button
{
  margin: 4px;
}
.divider
{
}
.start-button
{
  margin-top: 30px;
}
</style>
