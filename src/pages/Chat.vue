<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <h2 class="text-light">#SLACK#</h2>
          <hr style="border: 1px solid #333;" />
          <button @click="logout" class="btn btn-outline-light">Logout</button>
        </div>
        <div class="col-md-8 content">contents</div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "firebase/auth";
export default {
  name: "chat",

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
.sidebar {
  width: 33.5%;
  display: block;
  float: left;
  position: fixed;
  height: 100%;
  background: #000;
  padding-top: 2em;
  overflow: scroll;
}

.content {
  width: 66%;
  display: block;
  float: left;
  margin-left: 34%;
}
</style>