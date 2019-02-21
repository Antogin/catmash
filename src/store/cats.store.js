import axios from "axios";

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
      const url =
        "https://firestore.googleapis.com/v1/projects/catmash-9d03c/databases/(default)/documents/cats?pageSize=1000";
      const {
        data: { documents }
      } = await axios.get(url);
      console.log(documents);
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
