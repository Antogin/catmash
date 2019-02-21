import axios from "axios";

export const matchStore = {
  state: {
    currentMatch: {
      cat1: null,
      cat2: null,
      id: null
    }
  },
  mutations: {
    setCurrentmatch: (state, payload) => {
      state.currentMatch = payload;
    }
  },
  actions: {
    getMatch: async ({ commit }) => {
      const url =
        "https://us-central1-catmash-9d03c.cloudfunctions.net/startMatch";
      const { data } = await axios.get(url);
      commit("setCurrentmatch", data);
      return data;
    },
    vote: async ({ state }, payload) => {
      const url =
        "https://us-central1-catmash-9d03c.cloudfunctions.net/matchResult";
      const { data } = await axios.post(url, {
        matchId: state.currentMatch.id,
        winner: payload.id
      });
      return data;
    }
  },
  getters: {
    currentMatch: state => {
      return state.currentMatch;
    }
  }
};
