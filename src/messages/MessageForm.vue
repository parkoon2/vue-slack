<template>
  <div>
    <div class="messageForm">
      <form @submit.prevent="sendMessage">
        <div class="input-group mb-3">
          <input
            v-model="message"
            type="text"
            name="message"
            placeholder="white something"
            class="form-control mt-3"
          />

          <div class="input-group-append">
            <button @click="sendMessage" class="btn btn-primary mt-3" type="button">&nbsp Send &nbsp</button>
          </div>

          <div class="input-group-append">
            <button @click.prevent="openFileModal" class="btn btn-warning mt-3" type="button">Upload</button>
          </div>
        </div>
      </form>

      <!-- File Modal -->
      <file-modal></file-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FileModal from "./FileModal";

export default {
  name: "message-form",
  components: {
    FileModal
  },
  data() {
    return {
      message: "",
      errors: []
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser"])
  },
  methods: {
    sendMessage() {
      // Construct new message object

      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      };

      if (this.currentChannel) {
        if (this.message.length > 0) {
          this.$parent
            .getMessagesRef()
            .child(this.currentChannel.id)
            .push()
            .set(newMessage)
            .then(() => {
              this.$nextTick(() => {
                $("html, body").scrollTop($(document).height());
              });
            })
            .catch(err => {
              this.errors.push(err.message);
            });

          this.message = "";
        }
      }
    },
    openFileModal() {
      $("#fileModal")
        .appendTo("body")
        .modal("show");
    }
  }
};
</script>

<style scoped>
.messageForm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: #fff;
  text-align: center;
  margin-bottom: -16px;
  margin-left: 33.3%;
}

input,
button {
  height: 50px;
}
</style>