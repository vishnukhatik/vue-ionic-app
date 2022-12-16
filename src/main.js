import Vue from 'vue';
import VueApollo from 'vue-apollo';
import Ionic from '@ionic/vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'cs-components';
import 'cs-components/dist/csuite.css';
import './style.css';
import './assets/icons/css/styles.css';

import apolloClient from '@/services/apollo';
import $labels from '@/services/labels';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(Ionic, { mode: 'ios' });
Vue.use(VueMoment, { moment });
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.directive('router-link', {
  inserted(el, binding, vnode) {
    el.addEventListener('click', () => {
      vnode.context.$router.push(binding.value);
    });
  },
});

Vue.mixin($labels);

new Vue({
  apolloProvider,
  router,
  render: (h) => h(App),
}).$mount('#app');
