import Vue from "vue";
import Vuex from "vuex";
import { matchStore } from "./store/match.store";
import { catsStore } from "./store/cats.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    match: matchStore,
    cats: catsStore
  }
});
