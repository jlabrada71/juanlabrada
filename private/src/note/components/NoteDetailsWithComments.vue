<template>
  <div id="note-details-with-comments">
    <v-container class="grey lighten-5">
      <NoteDetails v-bind:note="note" v-on:close-note-details="closeNoteDetails"/>
      <CommentForm
        v-show="isVisibleCommentForm"
        v-bind:comment="currentComment"
        :is-updating="false"
        v-on:add-comment="addComment"
        v-on:cancel-add-comment="cancelAddComment"/>
    </v-container>
    <CommentList v-bind:comments="commentList"/>
  </div>
</template>
<script>
import CommentsRepositoryProxy from '@/comment/lib/comment-repository-proxy'
import CommentForm from '@/comment/components/CommentForm.vue'
import CommentList from '@/comment/components/CommentList.vue'
import NoteDetails from './NoteDetails.vue'

export default {
  name: 'NoteDetailsWithComments',
  components: {
    NoteDetails,
    CommentForm,
    CommentList
  },
  props: {
    note: Object
  },
  data: () => ({
    isVisibleCommentForm: true,
    valid: false,
    currentComment: {},
    commentList: []
  }),
  mounted () {
    CommentsRepositoryProxy.findAll({ noteId: this.note._id }).then((comments) => {
      this.commentList = comments
    })
  },
  methods: {
    addComment (comment) {
      const newComment = { ...comment }
      newComment.noteId = this.note._id
      CommentsRepositoryProxy.add(comment)
    },
    cancelAddComment () {
    },
    closeNoteDetails (note) {
      this.$emit('close-note-details', note)
    }
  }
}

</script>
<style>
c-note-form {

}

c-note-form__title {

}

c-note-form-actions {

}
</style>
