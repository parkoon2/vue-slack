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
      privateMessageRef: firebase.database().ref("privateMessages"),
      messages: [],
      channel: null,
      listeners: []
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser", "isPrivate"])
  },

  watch: {
    currentChannel: function() {
      // if current channel changes, watch for its messages
      // this.messages = [];
      this.detachListeners();
      this.addListeners();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    addListeners() {
      let ref = this.getMessagesRef();

      // listen to child added events on current channel
      ref.child(this.currentChannel.id).on("child_added", snapshot => {
        let message = snapshot.val();
        message["id"] = snapshot.key;

        this.messages.push(message);

        this.$nextTick(() => {
          $("html, body").scrollTop($(document).height());
        });
      });

      // pass arguments to addToListeners() method
      this.addToListeners(this.currentChannel.id, ref, "child_added");
    },

    addToListeners(id, ref, event) {
      let index = this.listeners.findIndex(el => {
        return el.id === id && el.ref === ref && el.event === event;
      });

      if (index === -1) {
        this.listeners.push({ id, ref, event });
      }
    },

    detachListeners() {
      // if (this.channel) {
      //   this.messageRef.child(this.channel.id).off();
      // }

      this.listeners.forEach(listener => {
        listener.ref.child(listener.id).off(listener.event);
      });

      this.listeners = [];
      this.messages = [];
    },

    getMessagesRef() {
      if (this.isPrivate) {
        return this.privateMessageRef;
      } else {
        return this.messageRef;
      }
    }
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>