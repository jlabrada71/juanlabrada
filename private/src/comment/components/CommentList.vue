<template>
  <div id="comment-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-card-title>Comments</v-card-title>
        <v-list :nav="nav">

          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(comment, index) in comments" :key="index">
              <v-list-item-avatar v-if="avatar">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="comment.id"
                      v-on:click="showComment(comment)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="comment.noteId"
                      v-on:click="showComment(comment)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="comment.text"
                      v-on:click="showComment(comment)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="comment.author"
                      v-on:click="showComment(comment)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="comment.email"
                      v-on:click="showComment(comment)"></v-list-item-title>
                  </v-col>

                  <v-col>
                    <v-icon v-on:click="editComment(comment)">edit</v-icon>
                    <v-icon v-on:click="deleteComment(comment)">delete</v-icon>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
   </v-container>
  </div>

</template>
<script>
export default {
  name: 'comment-list',
  props: {
    comments: Array
  },
  methods: {
    deleteComment (comment) {
      this.$emit('delete-comment', comment)
      // alert(`deleting ${JSON.stringify(comment)}`);
    },
    editComment (comment) {
      this.$emit('edit-comment', comment)
      // alert(`editing ${JSON.stringify(comment)}`);
    },
    showComment (comment) {
      this.$emit('show-comment', comment)
      // alert(`showing ${JSON.stringify(comment)}`);
    }
  },
  data: () => ({
    valid: false
  })

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
