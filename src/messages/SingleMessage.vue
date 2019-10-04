<template>
  <div>
    <div class="mt-3">
      <div v-for="message in messages">
        <div class="media">
          <img :src="message.user.avatar" alt="avatar" height="50" class="align-self-start mr-3" />
          <div class="media-body">
            <h6 class="mt-0">
              <a href="#">{{ message.user.name}}</a>
              - {{ message.timestamp | fromNow}}
            </h6>
            <p :class="{'self-message': selfMessage(message.user)}">{{ message.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "single-message",
  props: ["messages"],

  computed: {
    ...mapGetters(["currentUser"])
  },

  methods: {
    selfMessage(user) {
      console.log(user, this.currentUser);
      return user.id === this.currentUser.uid;
    }
  },

  filters: {
    fromNow(value) {
      return moment(value).fromNow();
    }
  }
};
</script>

<style scoped>
.self-message {
  border-left: 5px solid red;
  padding: 0 10px;
}
</style>