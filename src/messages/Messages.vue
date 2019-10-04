<template>
  <div>
    <!-- Show single messages -->
    <single-message></single-message>

    <!-- Message Form -->
    <message-form></message-form>
  </div>
</template>
<script>
import SingleMessage from "./SingleMessage";
import MessageForm from "./MessageForm";
export default {
  name: "message",
  components: {
    SingleMessage,
    MessageForm
  }
};
</script>