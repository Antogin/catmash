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
    setCurrentMatch: (state, payload) => {
      state.currentMatch = payload;
    }
  },
  actions: {
    getMatch: async ({ commit }) => {
      const url = config.functionURL + "startMatch";
      commit("setCurrentMatch", {
        cat1: null,
        cat2: null,
        id: null
      });

      const { data } = await axios.get(url);
      commit("setCurrentMatch", data);
      return data;
    },
    vote: async ({ state: { currentMatch } }, payload) => {
      const url = config.functionURL + "matchResult";

      const { data } = await axios.post(url, {
        matchId: currentMatch.id,
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
