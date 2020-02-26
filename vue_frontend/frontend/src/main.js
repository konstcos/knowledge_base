import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify' // path to vuetify export
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router';
import routes from './routes'

Vue.use(VueRouter);

/**
 * Инициация и настройка роута
 */
const router = new VueRouter({
    routes
});

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
  vuetify,
  router: router,
  el: '#app',
  render: h => h(App)
});
