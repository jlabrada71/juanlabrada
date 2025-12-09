
<template>
<div id="comment-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Comment Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
             <v-list-item-title class="headline mb-1">{{comment.id}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{comment.noteId}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{comment.text}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{comment.author}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{comment.email}}</v-list-item-title>

           </v-list-item-content>

           <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ></v-list-item-avatar>
         </v-list-item>
         <v-card-actions>
           <v-btn class="success" @click="close">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-container>
  </div>

</template>
<script>
export default {
  name: 'CommentDetails',
  props: {
    comment: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    close () {
      this.$emit('close-comment-details', this.comment)
    }
  }
}

</script>
<style>
c-comment-form {

}

c-comment-form__title {

}

c-comment-form-actions {

}

</style>
