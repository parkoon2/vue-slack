<template>
  <div>
    <button @click="openModal" class="btn btn-outline-primary">Add Channel</button>

    <!-- show list of channels -->
    <div class="mt-4">
      <button
        v-for="channel in channels"
        :id="channel.id"
        class="list-group-item list-group-item-action"
        type="button"
        @click="changeChannel(channel)"
        :class="{'active': setActiveChannel(channel)}"
      >
        {{channel.name}}
        <span
          v-if="getNotification(channel) > 0 && channel.id !== currentChannel.id"
          class="float-right"
        >{{ getNotification(channel)}}</span>
      </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="channelModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <input
                  v-model="new_channel"
                  type="text"
                  id="new_channel"
                  name="new_channel"
                  placeholder="channel name"
                  class="form-control"
                />
              </div>

              <ul class="list-group" v-if="hasErrors">
                <li class="list-group-item text-danger" v-for="error in errors">{{error}}</li>
              </ul>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addChannel" type="button" class="btn btn-primary">Add Channel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "firebase/database";
import { mapGetters } from "vuex";
export default {
  name: "channels",

  data() {
    return {
      new_channel: "",
      errors: [],
      channelsRef: firebase.database().ref("channels"),
      messagesRef: firebase.database().ref("messages"),
      notifiCount: [],
      channels: []
    };
  },

  computed: {
    ...mapGetters(["currentChannel", "isPrivate"]),
    hasErrors() {
      return this.errors.length > 0;
    }
  },

  watch: {
    isPrivate() {
      if (this.isPrivate) {
        this.resetNotifications();
      }
    }
  },

  methods: {
    openModal() {
      $("#channelModal")
        .append("body")
        .modal({
          backdrop: false,
          show: true
        });
    },

    addChannel() {
      // get key to the newly creating channel
      let key = this.channelsRef.push().key;

      let newChannel = { id: key, name: this.new_channel };

      // create new channel
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = "";
          $("#channelModal").modal("hide");
        })
        .catch(err => {
          this.errors.push(err.message);
        });
    },
    addListeners() {
      this.channelsRef.on("child_added", sanpshot => {
        this.channels.push(sanpshot.val());

        if (this.channels.length > 0) {
          this.channel = this.channels[0];

          this.$store.dispatch("setPrivate", false);
          this.$store.dispatch("setCurrentChannel", this.channel);
        }

        this.addCountListener(sanpshot.key);
      });
    },

    addCountListener(channelId) {
      this.messagesRef.child(channelId).on("value", snapshot => {
        this.handleNotification(
          channelId,
          this.currentChannel.id,
          this.notifiCount,
          snapshot
        );
      });
    },

    handleNotification(channelId, currentChannelId, notifiCount, snapshot) {
      let lastTotal = 0;
      let index = notifiCount.findIndex(el => el.id === channelId);

      if (index !== -1) {
        if (channelId !== currentChannelId) {
          lastTotal = notifiCount[index].total;
          if (snapshot.numChildren() - lastTotal > 0) {
            notifiCount[index].notifi = snapshot.numChildren() - lastTotal;
          }
        }

        notifiCount[index].lastKnownTotal = snapshot.numChildren();
      } else {
        notifiCount.push({
          id: channelId,
          total: snapshot.numChildren(),
          lastKnownTotal: snapshot.numChildren(),
          notifi: 0
        });
      }
    },

    getNotification(channel) {
      let notifi = 0;
      this.notifiCount.forEach(el => {
        if (el.id === channel.id) {
          notifi = el.notifi;
        }
      });
      return notifi;
    },
    detachListeners() {
      this.channelsRef.off();
      this.channels.forEach(ef => {
        this.messageRef.child(el.id).off();
      });
    },

    setActiveChannel(channel) {
      if (this.currentChannel) {
        return channel.id === this.currentChannel.id;
      }
    },

    changeChannel(channel) {
      // reset notifications
      this.resetNotifications();

      this.$store.dispatch("setPrivate", false);
      this.$store.dispatch("setCurrentChannel", channel);

      // set channel
      this.channel = channel;
    },

    resetNotifications() {
      let index = this.notifiCount.findIndex(el => (el.id = this.channel.id));
      if (index !== -1) {
        console.log(this.notifiCount[index]);
        this.notifiCount[index].total = this.notifiCount[index].lastKnownTotal;
        this.notifiCount[index].notifi = 0;
      }
    }
  },

  mounted() {
    this.addListeners();
  },

  beforeDestroy() {
    console.log("distory....in channel");
    this.detachListeners();
  }
};
</script>

<style scoped>
</style>