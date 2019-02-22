import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: '/vote'
		},
		{
			path: '/vote',
			name: 'Vote',
			component: () => import('./views/Vote.vue')
		},
		{
			path: '/ranks',
			name: 'ranks',
			component: () => import('./views/Ranks.vue')
		}
	]
});
