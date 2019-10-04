import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Create state that holds data
const state = {
  currentUser: null,
  currentChannel: null,
  isPrivate: false
};

// Update state data through mutations
const mutations = {
  SET_USER(state, payload) {
    state.currentUser = payload;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    console.log("바꾼다....", channel.id);
    state.currentChannel = channel;
  },
  SET_PRIVATE(state, isPrivate) {
    state.isPrivate = isPrivate;
  }
};

// Create actions for mutations with necessary data
const actions = {
  setUser({ commit }, payload) {
    commit("SET_USER", payload);
  },

  setCurrentChannel({ commit }, channel) {
    commit("SET_CURRENT_CHANNEL", channel);
  },

  setPrivate({ commit }, isPrivate) {
    commit("SET_PRIVATE", isPrivate);
  }
};

// Get data from state
const getters = {
  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel,
  isPrivate: state => state.isPrivate
};

// Create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
