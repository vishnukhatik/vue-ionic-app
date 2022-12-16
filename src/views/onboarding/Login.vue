<template>
<ion-page>
  <ion-content class="text-center">
    <div class="extended-padding">
      <img class="logo" src="@/assets/fridayoutreach.png">
      <cs-login-button
        v-for="provider in loginProviders" :key="provider.variant"
        :network="provider.network"
        @click="login(provider)"
        :block="true"
        size="large"
        class="login-button"
      ></cs-login-button>
      <or-divider class="divider"></or-divider>
      <cs-button fill="outline" variant="default" :block="true" size="large" @click="loginAsGuest()">{{translate('GuestLoginButtonLabel')}}</cs-button>
    </div>
  </ion-content>
</ion-page>
</template>
<script>
import OrDivider from '@/components/general/OrDivider.vue';
import LoginAsGuest from '@/gql/general/LoginAsGuest.gql';

export default {
  components: {
    OrDivider,
  },
  data() {
    return {
      loginProviders: [
        {
          network: 'facebook',
        },
        {
          network: 'twitter',
        },
        {
          network: 'google',
        },
      ],
    };
  },
  methods: {
    login(provider) {
      const gxAppId = '15600fe9-713d-4ba1-a1cd-4a2d2c916b5c';
      const providerId = provider.network.toUpperCase();
      const redirectUri = 'http://localhost:8888/auth.html';
      window.location.href = `https://services-graph.graphexpress.com/login?application=${gxAppId}&provider=${providerId}&callback=${redirectUri}`;
    },
    async loginAsGuest() {
      const { data: { token } } = await this.$apollo.mutate({
        mutation: LoginAsGuest,
      });
      localStorage.access_token = token;
      window.location.href = '/';
    },
  },
};
</script>
<style scoped>
ion-content
{
  --background: url('../../assets/login_background.png'), #333;
}
.extended-padding
{
  padding: 70px;
  padding-top: 80px;
}
.logo
{
  margin-bottom: 40px;
}
.login-button
{
  margin: 4px;
}
.divider
{
  color: var(--cs-gray-03);
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
