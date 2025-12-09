<template>
  <v-card>
     <v-card-title class="indigo white--text text-h5">
      File Directory
    </v-card-title>
    <v-row
      class="pa-4"
      justify="space-between"
    >
      <v-col cols="5">
    <v-treeview
      :active.sync="active"
      ref="tree"
      v-model="tree"
      :items="files"
      :load-children="getFiles"
      activatable
      item-key="path"
      dense
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.children">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ fileType[item.extension] }}
        </v-icon>
      </template>
    </v-treeview>
    </v-col>
      <v-divider vertical></v-divider>
      <v-col
        class="d-flex text-center"
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a file
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar
                v-if="selected"
                size="88"
              >
                <v-img
                  :src="`${selected.url}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selected.name }}
              </h3>
              <p class="text-h5 mb-2">
                <strong>Size: </strong> {{ selected.size }}
              </p>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
    </v-card>
</template>
<script>
import FilesRepositorProxy from '../lib/files-repository-proxy'
import Logger from '@/lib/logger'

export default {
  props: ['files'],
  data: () => ({
    active: [],
    fileType: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      jpg: 'mdi-file-image',
      svg: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    },
    tree: [],
    filesSample: [ // this is are the original values
      {
        name: '.git'
      },
      {
        name: 'node_modules'
      },
      {
        name: 'public',
        children: [
          {
            name: 'static',
            children: [{
              name: 'logo.png',
              file: 'png'
            }]
          },
          {
            name: 'favicon.ico',
            file: 'png'
          },
          {
            name: 'index.html',
            file: 'html'
          }
        ]
      },
      {
        name: '.gitignore',
        file: 'txt'
      },
      {
        name: 'babel.config.js',
        file: 'js'
      },
      {
        name: 'package.json',
        file: 'json'
      },
      {
        name: 'README.md',
        file: 'md'
      },
      {
        name: 'vue.config.js',
        file: 'js'
      },
      {
        name: 'yarn.lock',
        file: 'txt'
      }
    ]
  }),
  computed: {
    selected () {
      if (!this.active.length) return undefined
      Logger.debug(this.active)
      const id = this.active[0]
      const lookedFile = this.find(this.files, id)
      if (lookedFile) {
        this.copyToClipboard(lookedFile.url)
      }
      return lookedFile
    }
  },
  watch: {
    files () {
      // This need to be done  because of a bug in vuetify v-treeview that doesn't set
      // hasLoaded to false when the children of an item has been set to []

      const { nodes } = this.$refs.tree
      for (const nodeKey in nodes) {
        if (nodes[nodeKey].vnode) {
          nodes[nodeKey].isOpen = false
          nodes[nodeKey].vnode.isOpen = false
          nodes[nodeKey].vnode.hasLoaded = false
        }
      }
    }
  },
  methods: {
    find (files, id) {
      const result = files.find((file) => file.path === id)
      if (result) return result
      for (const file of files) {
        if (file.children) {
          const resultChildren = this.find(file.children, id)
          if (resultChildren) return resultChildren
        }
      }
      return null
    },
    async getFiles (item) {
      const originalFiles = await FilesRepositorProxy.findAll(item.path)
      const files = originalFiles.files.map((file) => ({ ...file }))
      const folders = originalFiles.folders.map((folder) => ({ ...folder, children: [] }))
      const children = [...files, ...folders]
      console.log(children)
      children.forEach((child) => {
        item.children.push(child)
      })
      Logger.debug(item)
    },
    async copyToClipboard (text) {
      try {
        await navigator.clipboard.writeText(text)
      } catch ($e) {
        Logger.log($e)
      }
    }
  }
}
</script>
