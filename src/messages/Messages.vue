<template>
  <div>
    <!-- Show single messages -->
    <single-message :messages="messages"></single-message>

    <!-- Message Form -->
    <message-form></message-form>
  </div>
</template>
<script>
import SingleMessage from "./SingleMessage";
import MessageForm from "./MessageForm";
import database from "firebase/database";
import { mapGetters } from "vuex";

export default {
  name: "message",
  components: {
    SingleMessage,
    MessageForm
  },
  data() {
    return {
      messageRef: firebase.database().ref("messages"),
      messages: [],
      channel: ""
    };
  },
  computed: {
    ...mapGetters(["currentChannel"])
  },

  watch: {
    currentChannel: function() {
      // if current channel changes, watch for its messages
      this.messages = [];
      this.addListeners();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    addListeners() {
      // listen to child added events on current channel
      this.messageRef
        .child(this.currentChannel.id)
        .on("child_added", snapshot => {
          this.messages.push(snapshot.val());
        });
    },

    detachListeners() {
      if (this.channel) {
        this.messageRef.child(this.channel.id).off();
      }
    }
  },
  beforeDistory() {
    this.detachListeners();
  }
};
</script>