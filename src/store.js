import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state that holds data
const state = {
    currentUser: null
}

// Update state data through mutations
const mutations = {
    SET_USER(state, payload) {
        state.currentUser = payload
    }
}

// Create actions for mutations with necessary data
const actions = {
    setUser({ commit }, payload) {
        commit('SET_USER', payload)
    }
}

// Get data from state
const getter = {
    currentUser: state => state.currentUser
}

// Create vuex store
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getter
})

export default store