import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Create state that holds data
const state = {
  currentUser: null,
  currentChannel: null
};

// Update state data through mutations
const mutations = {
  SET_USER(state, payload) {
    state.currentUser = payload;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel;
  }
};

// Create actions for mutations with necessary data
const actions = {
  setUser({ commit }, payload) {
    commit("SET_USER", payload);
  },

  setCurrentChannel({ commit }, channel) {
    commit("SET_CURRENT_CHANNEL", channel);
  }
};

// Get data from state
const getters = {
  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel
};

// Create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
