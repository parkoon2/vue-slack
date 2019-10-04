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
      >{{channel.name}}</button>
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
      channels: []
    };
  },

  computed: {
    ...mapGetters(["currentChannel"]),
    hasErrors() {
      return this.errors.length > 0;
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
      });
    },
    detachListeners() {
      this.channelsRef.off();
    },

    setActiveChannel(channel) {
      if (this.currentChannel) {
        return channel.id === this.currentChannel.id;
      }
    },

    changeChannel(channel) {
      this.$store.dispatch("setPrivate", false);
      this.$store.dispatch("setCurrentChannel", channel);
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