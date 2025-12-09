<template>
  <v-layout>
    <v-text-field
      label="Directory"
      hide-details="auto"
      v-model="directory"

    ></v-text-field>
    <v-flex>
      <v-file-input
        show-size
        counter
        chips
        multiple
        label="Files to send"
        ref="myfile"
        v-model="files"
      >
      </v-file-input>
    </v-flex>
    <v-flex>
      <v-btn color="primary" text @click="submitFiles">Submit</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import Logger from '@/lib/logger'

export default {
  data () {
    return {
      files: [],
      directory: ''
    }
  },
  methods: {
    submitFiles () {
      const formData = new FormData()
      if (this.directory) {
        formData.append('directory', this.directory)
      }

      if (this.files) {
        this.files.forEach((file) => {
          formData.append('files', file)
        })

        // console.log(formData.getAll('files'));
        // console.log(this.files);
        axios
          .post(
            `${process.env.VUE_APP_API_SERVER}/api/v1/files/firebase`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((response) => {
            Logger.debug('Success!')
            Logger.debug({ response })
            this.$emit('file-sent', formData)
            this.directory = ''
            this.files = []
          })
          .catch((error) => {
            Logger.log({ error })
          })
      } else {
        Logger.debug('there are no files.')
      }
    }
  }
}
</script>
