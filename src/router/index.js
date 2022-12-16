import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';

import Welcome from '@/views/onboarding/Welcome.vue';
import Login from '@/views/onboarding/Login.vue';
import OnboardingLanguage from '@/views/onboarding/Language.vue';

import Tabs from '@/views/Tabs.vue';
import Home from '@/views/home/Home.vue';
import TrainingHome from '@/views/training/TrainingHome.vue';
import TrainingCategoryList from '@/views/training/TrainingCategoryList.vue';
import TrainingCategory from '@/views/training/TrainingCategory.vue';
import TrainingArticle from '@/views/training/TrainingArticle.vue';
import TrainingSearch from '@/views/training/TrainingSearch.vue';

import MyGroups from '@/views/groups/MyGroups.vue';
import FindGroups from '@/views/groups/FindGroups.vue';
import FindGroupsMap from '@/views/groups/FindGroupsMap.vue';
import Group from '@/views/groups/Group.vue';
import Testimonies from '@/views/testimonies/Testimonies.vue';
import News from '@/views/news/News.vue';
import NewsItem from '@/views/news/NewsItem.vue';
import Menu from '@/views/more/Menu.vue';
import About from '@/views/more/About.vue';
import Profile from '@/views/more/Profile.vue';
import LanguageSetting from '@/views/more/Language.vue';

import StoreCategory from '@/views/store/StoreCategory.vue';
import StoreHome from '@/views/store/StoreHome.vue';
import StoreProduct from '@/views/store/StoreProduct.vue';
import StoreSearch from '@/views/store/StoreSearch.vue';

import $auth from '@/services/auth';

Vue.use(IonicVueRouter);

const routes = [
  {
    path: '/onboarding/welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/onboarding/language',
    name: 'OnboardingLanguage',
    component: OnboardingLanguage,
  },
  {
    path: '/onboarding/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: Tabs,
    children: [
      {
        path: 'home',
        name: 'Home',
        components: {
          home: Home,
        },
      },
      {
        path: 'training',
        name: 'TrainingHome',
        components: {
          training: TrainingHome,
        },
      },
      {
        path: 'training/categories',
        name: 'TrainingCategoryList',
        components: {
          training: TrainingCategoryList,
        },
      },
      {
        path: 'training/categories/:id',
        name: 'TrainingCategory',
        components: {
          training: TrainingCategory,
        },
      },
      {
        path: 'training/articles/:id',
        name: 'TrainingArticle',
        components: {
          training: TrainingArticle,
        },
      },
      {
        path: 'training/search',
        name: 'TrainingSearch',
        components: {
          training: TrainingSearch,
        },
      },
      {
        path: 'groups',
        name: 'MyGroups',
        components: {
          groups: MyGroups,
        },
      },
      {
        path: 'groups/finder',
        name: 'FindGroups',
        components: {
          groups: FindGroups,
        },
      },
      {
        path: 'groups/finder/map',
        name: 'FindGroupsMap',
        components: {
          groups: FindGroupsMap,
        },
      },
      {
        path: 'groups/:id',
        name: 'Group',
        components: {
          groups: Group,
        },
      },
      {
        path: 'more',
        name: 'Menu',
        components: {
          more: Menu,
        },
      },
      {
        path: 'more/profile',
        name: 'Profile',
        components: {
          more: Profile,
        },
      },
      {
        path: 'more/about',
        name: 'About',
        components: {
          more: About,
        },
      },
      {
        path: 'more/language',
        name: 'LanguageSetting',
        components: {
          more: LanguageSetting,
        },
      },
      {
        path: 'community',
        name: 'Testimonies',
        components: {
          community: Testimonies,
        },
      },
      {
        path: 'news',
        name: 'News',
        components: {
          news: News,
        },
      },
      {
        path: 'news/:id',
        name: 'NewsItem',
        components: {
          news: NewsItem,
        },
      },
      {
        path: 'store',
        name: 'StoreHome',
        components: {
          store: StoreHome,
        },
      },
      {
        path: 'store/search',
        name: 'StoreSearch',
        components: {
          store: StoreSearch,
        },
      },
      {
        path: 'store/products/:id',
        name: 'StoreProduct',
        components: {
          store: StoreProduct,
        },
      },
      {
        path: 'store/categories/:id',
        name: 'StoreCategory',
        components: {
          store: StoreCategory,
        },
      },
    ],
  },
  {
    path: '/',
    redirect() {
      return $auth.isLoggedIn() ? '/tabs/home' : '/onboarding/welcome';
    },
  },
];

const router = new IonicVueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if ($auth.isLoggedIn() && to.fullPath.includes('/onboarding')) {
    // Logged in but trying to access an onboarding screen
    next('/tabs/home');
  } else if (!$auth.isLoggedIn() && !to.fullPath.includes('/onboarding')) {
    // Logged out but trying to access an app screen
    next('/onboarding/welcome');
  } else {
    next();
  }
});
export default router;
