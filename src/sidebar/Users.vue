<template>
  <div>
    <div class="text-light">
      <h4>Users</h4>
      <ul class="nav flex-column">
        <div class="mt-4">
          <button
            v-for="user in users"
            :key="user.id"
            class="list-group-item list-group-item-action"
            type="button"
            @click.prevent="changeChannel(user)"
            :class="{'active': isActive(user)}"
          >
            <span
              :class="{'fa fa-circle online': isOnline(user), 'fa fa-circle offline': !isOnline(user)}"
            ></span>

            <span>
              <img class="img rounded-circle" :src="user.avatar" alt="avatar" height="20" />
              <span>
                <a
                  href="#"
                  :class="{'text-light': isActive(user), 'text-danger': !isOnline(user)}"
                >{{user.name}}</a>
              </span>
            </span>
          </button>
        </div>
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
      usersRef: firebase.database().ref("users"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence")
    };
  },

  computed: {
    ...mapGetters(["currentUser", "currentChannel"])
  },

  methods: {
    addListeners() {
      this.usersRef.on("child_added", snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          // build user object

          let user = snapshot.val();
          user["uid"] = snapshot.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });

      // PresenceREf child_added
      this.presenceRef.on("child_added", snapshot => {
        if (this.currentUser !== snapshot.key) {
          // pass to user status method
          this.addStatusToUser(snapshot.key);
        }
      });

      // PresenceRef child_removed
      this.presenceRef.on("child_removed", snapshot => {
        if (this.currentUser !== snapshot.key) {
          // pass to user status method
          this.addStatusToUser(snapshot.key, false);
        }
      });

      // returns 'connected' to every user connected to our application
      this.connectedRef.on("value", snapshot => {
        if (snapshot.val()) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
    },

    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    },

    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex(user => user.id === userId);

      if (index !== -1) {
        connected
          ? (this.users[index].status = "online")
          : (this.users[index].status = "offline");
      }
    },

    isOnline(user) {
      return user.status === "online";
    },

    changeChannel(user) {
      // to change channel, you need channe id
      // to get channel id, use getChannelId() method below
      let channelId = this.getChannelId(user.uid);
      let channel = {
        id: channelId,
        name: user.name
      };

      this.$store.dispatch("setPrivate", true);
      this.$store.dispatch("setCurrentChannel", channel);
    },

    isActive(user) {
      let channelId = this.getChannelId(user.uid);
      return this.currentChannel.id === channelId;
    },

    getChannelId(userId) {
      // use this format to create channel
      return userId < this.currentUser.uid
        ? userId + "/" + this.currentUser.uid
        : this.currentUser.uid + "/" + userId;
    }
  },

  mounted() {
    this.addListeners();
  },

  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style scoped>
.online {
  color: green;
}
.offline {
  color: red;
}
</style>