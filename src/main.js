// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import store from './store'

Vue.config.productionTip = false



var firebaseConfig = {
  apiKey: "AIzaSyADwsnV6dae6QcKy8vLfo_cRp1Yhk-Y8Uw",
  authDomain: "vuexslack-fcdbb.firebaseapp.com",
  databaseURL: "https://vuexslack-fcdbb.firebaseio.com",
  projectId: "vuexslack-fcdbb",
  storageBucket: "vuexslack-fcdbb.appspot.com",
  messagingSenderId: "209602853775",
  appId: "1:209602853775:web:024a4a6735ec36f29469fa",
  measurementId: "G-7ECG2B1MLT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.auth().onAuthStateChanged(user => {

  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})

window.firebase = firebase;

/* eslint-disable no-new */



