import axios from "axios";
import config from "../env/firebase.config.json";

export const catsStore = {
  state: {
    cats: []
  },
  mutations: {
    setCats: (state, payload) => {
      state.cats = payload;
    }
  },
  actions: {
    getCats: async ({ commit }) => {
      const url = config.restURL + "cats?pageSize=1000";
      const {
        data: { documents }
      } = await axios.get(url);
      commit("setCats", documents);
      return documents;
    }
  },
  getters: {
    cats: state => {
      return state.cats
        .map(document => document.fields)
        .sort((a, b) => {
          console.log(a);
          return b.elo.integerValue - a.elo.integerValue;
        });
    }
  }
};
