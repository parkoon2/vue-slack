import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create state that holds data
const state = {
    currentUser: 'parkoon'
}

// Update state data through mutations
const mutations = {}

// Create actions for mutations with necessary data
const actions = {}

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