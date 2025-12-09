
<template>
 <div class="comment">
    <CommentDetails v-bind:comment="currentComment"
      v-show="isVisibleCommentDetails"
      v-on:close-comment-details="closeCommentDetails"/>

    <v-icon @click="showAddCommentForm" v-show="!isVisibleCommentForm">add_circle</v-icon>
    <CommentForm
      v-show="isVisibleCommentForm"
      v-bind:comment="currentComment"
      v-bind:is-updating="isUpdatingComment"
      v-on:add-comment="addComment"
      v-on:update-comment="updateComment"
      v-on:cancel-add-comment="cancelAddComment"/>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Comment list</h1>
    <CommentList v-bind:comments="comments"
      v-on:show-comment="showCommentDetails"
      v-on:edit-comment="editComment"
      v-on:delete-comment="deleteComment"/>
  </div>

</template>
<script>
import CommentList from '@/comment/components/CommentList.vue'
import CommentForm from '@/comment/components/CommentForm.vue'
import CommentDetails from '@/comment/components/CommentDetails.vue'
import CommentRepositoryProxy from '@/comment/lib/comment-repository-proxy'

export default {
  name: 'Comment',

  components: {
    CommentList,
    CommentForm,
    CommentDetails
  },

  data: () => ({
    comments: [],
    currentComment: { name: '', address: '' },
    isVisibleCommentForm: false,
    isVisibleCommentDetails: false,
    isUpdatingComment: false
  }),

  mounted () {
    this.getComments()
  },

  methods: {
    async getComments () {
      this.comments = await CommentRepositoryProxy.findAll()
    },

    async deleteComment (comment) {
      await CommentRepositoryProxy.delete(comment)
      await this.getComments()
    },

    async addComment (comment) {
      // alert(`adding comment ${JSON.stringify(comment)}`);
      await CommentRepositoryProxy.add(comment)
      await this.getComments()
      this.hideCommentForm()
    },

    async updateComment (comment) {
      // alert(`adding comment ${JSON.stringify(comment)}`);
      await CommentRepositoryProxy.update(comment)
      await this.getComments()
      this.hideCommentForm()
    },

    showCommentDetails (comment) {
      this.currentComment = comment
      this.isVisibleCommentDetails = true
    },

    closeCommentDetails () {
      this.isVisibleCommentDetails = false
    },

    editComment (comment) {
      this.isUpdatingComment = true
      this.currentComment = comment
      this.isVisibleCommentForm = true
    },

    cancelAddComment () {
      this.hideCommentForm()
    },

    hideCommentForm () {
      this.isVisibleCommentForm = false
    },

    showCommentForm () {
      this.isVisibleCommentForm = true
    },

    showAddCommentForm () {
      this.isUpdatingComment = false
      this.currentComment = { name: '', address: '' }
      this.isVisibleCommentForm = true
    }
  }
}

</script>
<style>

</style>
