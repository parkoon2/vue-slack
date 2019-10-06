<template>
  <div>
    <div class="messageForm">
      <!-- file upload progress bar -->
      <div class="progress" v-if="uploadState !== null">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
        >{{uploadLabel}}</div>
      </div>
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
      <file-modal ref="file_modal"></file-modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FileModal from "./FileModal";
import uuidv4 from "uuid/v4";
import storage from "firebase/storage";

export default {
  name: "message-form",
  components: {
    FileModal
  },
  data() {
    return {
      message: "",
      errors: [],
      storageRef: firebase.storage().ref(),
      uploadTask: null,
      uploadState: null
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser"]),

    uploadLabel() {
      switch (this.uploadState) {
        case "uploading":
          return "Uploading in progress";
          break;
        case "error":
          return "Error occured";
          break;
        case "done":
          return "Upload completed";

        default:
          return "";
      }
    }
  },
  methods: {
    createMessage(fileUrl = null) {
      // create message object to push to firebase
      let message = {
        // content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      };

      if (!fileUrl) {
        message["content"] = this.message;
      } else {
        message["image"] = fileUrl;
      }

      return message;
    },
    sendMessage() {
      // Construct new message object

      // let newMessage = {
      //   content: this.message,
      //   timestamp: firebase.database.ServerValue.TIMESTAMP,
      //   user: {
      //     name: this.currentUser.displayName,
      //     avatar: this.currentUser.photoURL,
      //     id: this.currentUser.uid
      //   }
      // };

      if (this.currentChannel) {
        if (this.message.length > 0) {
          this.$parent
            .getMessagesRef()
            .child(this.currentChannel.id)
            .push()
            .set(this.createMessage())
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
    },

    uploadFile(file, metadata) {
      if (!file) return false;

      let pathToUpload = this.currentChannel.id;
      let ref = this.$parent.getMessagesRef();
      let filePath = this.getPath() + "/" + uuidv4() + ".jpg";

      this.uploadTask = this.storageRef.child(filePath).put(file, metadata);
      this.uploadState = "uploading";

      // on upload state change
      this.uploadTask.on(
        "state_changed",
        snapshot => {
          // upload in progress
          let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          $(".progress-bar").css("width", percent + "%");
        },
        err => {
          // error
          this.errors.push(error.message);
          this.uploadState = "error";
          this.uploadTask = null;
        },
        () => {
          // upload finished
          this.uploadState = "done";

          // Reset form
          this.$refs.file_modal.resetForm();

          let fileUrl = this.uploadTask.snapshot.ref
            .getDownloadURL()
            .then(fileUrl => {
              this.sendFileMessage(fileUrl, ref, pathToUpload);
            });
        }
      );
    },

    sendFileMessage(fileUrl, ref, pathToUpload) {
      ref
        .child(pathToUpload)
        .push()
        .set(this.createMessage(fileUrl))
        .then(() => {
          this.$nextTick(() => {
            $("html, body").scrollTop($(document).height());
          });
        })
        .catch(err => {
          this.errors.push(err.message);
        });
    },

    getPath() {
      if (this.isPrivate) {
        return "chat/private/" + this.currentChannel.id;
      } else {
        return "chat/public";
      }
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
  margin-bottom: -20px;
  margin-left: 33.3%;
}

input,
button {
  height: 50px;
}

.progress {
  margin-bottom: -16px;
}
</style>