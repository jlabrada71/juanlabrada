<template>
<div id="note-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Note Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">{{note.title}}</v-list-item-title>
              <v-list-item-title class="title mb-4">{{note.seoDescription}}</v-list-item-title>
                <vue-markdown :source="note.description"></vue-markdown>
                <vue-markdown :source="note.text"></vue-markdown>
              <v-list-item-title class="headline mb-1">{{note.publishDate}}</v-list-item-title>
           </v-list-item-content>

           <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ><v-img :src="note.image" max-width="100"></v-img></v-list-item-avatar>
         </v-list-item>
         <v-card-actions>
           <v-btn class="success" @click="close">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-container>
  </div>

</template>
<script>
import VueMarkdown from 'vue-markdown'
// import Logger from '@/lib/logger';

export default {
  name: 'NoteDetails',
  head () {
    return {
      title: 'Foo Bar',
      titleTemplate: '%s - Baz'
    }
  },
  components: {
    VueMarkdown
  },
  props: {
    note: Object
  },
  data: () => ({
    valid: false,
    source: '',
    show: true,
    html: false,
    breaks: true,
    linkify: false,
    emoji: true,
    typographer: true,
    toc: false
  }),
  methods: {
    close () {
      this.$emit('close-note-details', this.note)
    }
  }
}

</script>
<style>
.result-html {
  padding:2px 10px;
  overflow:auto;
  background-color:#fff;
  border:1px solid#ccc;
  border-radius:4px
}

.full-height{
  height:100%
}

c-note-form {

}

c-note-form__title {

}

c-note-form-actions {

}
</style>
