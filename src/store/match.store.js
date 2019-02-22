import axios from "axios";
import config from "../env/firebase.config.json";

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
      const url = config.functionURL + "startMatch";
      const { data } = await axios.get(url);
      commit("setCurrentmatch", data);
      return data;
    },
    vote: async ({ state }, payload) => {
      const url = config.functionURL + "matchResult";
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
