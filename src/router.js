import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/vote",
      name: "Vote",
      component: () => import("./views/Vote.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/ranks",
      name: "ranks",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Ranks.vue")
    }
  ]
});
