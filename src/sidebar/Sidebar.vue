<template>
  <div>
    <h2 class="text-light">#SLACK#</h2>

    <hr style="border: 1px solid #333;" />

    <span>
      <img class="rounded-circle mt-2" height="30" :src="currentUser.photoURL" />
      <span class="text-light">{{currentUser.displayName}}</span>
    </span>

    <hr style="border: 1px solid #333;" />

    <button @click="logout" class="btn btn-outline-light">Logout</button>

    <hr style="border: 1px solid #333;" />

    <channels></channels>
  </div>
</template>

<script>
import auth from "firebase/auth";
import { mapGetters } from "vuex";
import Channels from "./Channels";
export default {
  name: "sidebar",
  components: {
    Channels
  },
  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {
    logout() {
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
</style>