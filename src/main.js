import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './components/index.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: [
        {path: '/', component: Index}
    ]
});
new Vue({router: router}).$mount('#app');