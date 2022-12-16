<template>
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{translate('HomeViewTitle')}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding grey-content">
    <app-section-header :title="translate('NewTrainingContentTitle')" more="TrainingHome"></app-section-header>
    <training-card v-for="article in articles" :key="article.id" :article="article"></training-card>
    <app-section-header :title="translate('RecentNewsTitle')" more="NewsList"></app-section-header>
    <news-card v-for="article in news" :key="article.id" :article="article"></news-card>
    <app-section-header :title="translate('RecentProductsTitle')" more="StoreHome"></app-section-header>
    <cs-spinner v-if="!recentProducts"></cs-spinner>
    <div class="endless">
      <app-small-product-card v-for="product in recentProducts" :key="product.id" :product="product"></app-small-product-card>
    </div>
    <!-- Public Posts -->
    <app-section-header :title="translate('RecentTestimoniesTitle')" more="Testimonies"></app-section-header>
    <app-public-posts :show-composer="false"></app-public-posts>
    <!-- My Groups -->
    <app-section-header icon="icons8-info" :title="translate('MyGroupsTitle')" more="MyGroups"></app-section-header>
    <group-card v-for="member in memberships" :key="member.id" :group="member.group"></group-card>
  </ion-content>
</ion-page>
</template>
<script>
import $auth from '@/services/auth';
import $analytics from '@/services/analytics';
import AppSectionHeader from '@/components/general/SectionHeader.vue';
import AppSmallProductCard from '@/components/store/SmallProductCard.vue';
import AppPublicPosts from '@/components/testimonies/PublicPosts.vue';
import TrainingCard from '@/components/training/TrainingCard.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import GroupCard from '@/components/groups/GroupCard.vue';
import ListRecentTrainingArticles from '@/gql/training/ListRecentTrainingArticles.gql';
import ListNews from '@/gql/news/ListNews.gql';
import ListMyGroups from '@/gql/groups/ListMyGroups.gql';
import GetUser from '@/gql/more/GetUser.gql';
import UpdateUserLocation from '@/gql/more/UpdateUserLocation.gql';
import RecentProducts from '@/gql/store/RecentProducts.gql';

export default {
  components: {
    AppSectionHeader,
    AppSmallProductCard,
    AppPublicPosts,
    TrainingCard,
    NewsCard,
    GroupCard,
  },
  apollo: {
    recentProducts: RecentProducts,
    articles: ListRecentTrainingArticles,
    news: {
      query: ListNews,
      variables() {
        return {
          language: $auth.getLanguage(),
        };
      },
    },
    memberships: {
      query: ListMyGroups,
      variables() {
        return {
          user_id: $auth.getUserId(),
        };
      },
    },
  },
  methods: {
    showMoreTrainingContent() {
      this.$router.push({ name: 'TrainingHome' });
    },
  },
  async mounted() {
    // Set user location if not defined
    const { data: { user } } = await this.$apollo.query({
      query: GetUser,
      variables: {
        id: $auth.getUserId(),
      },
    });
    if (user && (!user.city || !user.country)) {
      const location = await $auth.getLocation();
      await this.$apollo.mutate({
        mutation: UpdateUserLocation,
        variables: {
          id: $auth.getUserId(),
          city: location.city,
          country: location.country_name,
        },
      });
    }
    $analytics.trackEvent('home-view');
  },
};
</script>
