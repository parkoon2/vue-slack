<template>
  <div class="modal fade" id="fileModal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark">Upload file</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group">
              <input @change="addFile" type="file" id="file" name="file" class="form-control" />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="sendFile" type="button" class="btn btn-primary">Send File</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "file-modal",
  data() {
    return {
      file: null
    };
  },

  methods: {
    addFile(e) {},
    sendFile() {}
  }
};
</script>