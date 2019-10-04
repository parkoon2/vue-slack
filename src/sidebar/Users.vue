<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <ul class="nav flex-column">
        <li v-for="user in users" :key="user.uid">
          <span>
            <img class="img rounded-circle" :src="user.avatar" alt="avatar" height="20" />
            <span class="text-primary">{{user.name}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import database from "firebase/database";
import { mapGetters } from "vuex";
export default {
  name: "users",

  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("users")
    };
  },

  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {
    addListeners() {
      this.usersRef.on("child_added", snapshot => {
        console.log(this.currentUser.uid);
        console.log(snapshot.key);
        if (this.currentUser.uid !== snapshot.key) {
          // build user object

          let user = snapshot.val();
          user["uid"] = snapshot.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });
    },

    detachListeners() {}
  },

  mounted() {
    this.addListeners();
  },

  beforeDestroy() {
    this.detachListeners();
  }
};
</script>