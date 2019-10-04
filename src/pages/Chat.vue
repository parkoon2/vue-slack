<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <sidebar></sidebar>
        </div>
        <div class="col-md-8 content">
          <message></message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar/Sidebar";
import Message from "../messages/Messages";

export default {
  name: "chat",
  components: {
    Sidebar,
    Message
  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  width: 33.5%;
  display: block;
  float: left;
  position: fixed;
  height: 100%;
  background: #000;
  padding-top: 2em;
  /* overflow: scroll; */
}

.content {
  width: 66%;
  display: block;
  float: left;
  margin-left: 34%;
}
</style>