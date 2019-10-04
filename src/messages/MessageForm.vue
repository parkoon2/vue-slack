<template>
  <div>
    <div class="messageForm">
      <form>
        <div class="input-group mb-3">
          <input type="text" name="message" placeholder="white something" class="form-control mt-3" />

          <div class="input-group-append">
            <button class="btn btn-primary mt-3" type="button">&nbsp Send &nbsp</button>
          </div>

          <div class="input-group-append">
            <button class="btn btn-warning mt-3" type="button">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "message-form"
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