<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#SLACK#</h2>
      <p>Realtime communication at it's best</p>
    </div>

    <!-- show loading state -->
    <div class="alert alert-info" v-if="loading">Processing...</div>

    <!-- show errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors">{{error}}</div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col text-center">
          <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login with Google</button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button class="btn btn-outline-info btn-lg">Login with Twitter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "firebase/auth";
export default {
  name: "login",

  data() {
    return {
      errors: [],
      loading: false
    };
  },

  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },

  methods: {
    loginWithGoogle() {
      this.loading = true;

      // clear old errors
      this.errors = [];

      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(response => {
          // dispatching user
          this.$store.dispatch("setUser", response.user);

          // then redirect to '/' page
          this.$router.push("/");
        })
        .catch(err => {
          this.errors.push(err.message);
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.btn,
.jumbotron {
  border-radius: 0px;
}
</style>