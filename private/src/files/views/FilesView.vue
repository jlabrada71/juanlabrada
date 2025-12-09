<template>
 <div class="files">
   <h1>File Manager</h1>
   <FileForm @file-sent="fileSent"/>
   <FileList v-bind:files="files" />
  </div>

</template>
<script>
import FileList from '../components/FileList.vue'
import FileForm from '../components/FileForm.vue'
import FilesRepositorProxy from '../lib/files-repository-proxy'

export default {
  name: 'FilesView',

  components: {
    FileList,
    FileForm
  },

  data: () => ({
    files: []
  }),

  mounted () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const originalFiles = await FilesRepositorProxy.findAll()
      console.log('INITIALIZE')
      console.log(originalFiles)
      // initiate the children as empty for directories
      const files = originalFiles.files.map((file) => ({ ...file }))
      const folders = originalFiles.folders.map((folder) => ({ ...folder, children: [] }))
      console.log(folders)
      this.files = [...files, ...folders]
      console.log(this.files)
    },
    fileSent () {
      this.initialize()
    }
  }
}

</script>
<style>
</style>
