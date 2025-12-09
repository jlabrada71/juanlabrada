<template>
<div>
  <div id="comment-form">
    <v-container>
      <v-card class="c-comment-form">
        <v-card-title class="c-comment-form__title">Comment</v-card-title>
        <v-form class="m-2">
          <v-text-field label="Text" v-model="comment.text"></v-text-field>
          <v-text-field label="Author" v-model="comment.author"></v-text-field>
          <v-text-field label="Email" v-model="comment.email"></v-text-field>
        </v-form>
      <v-card-actions class="c-comment-form-actions">
        <v-btn class="success" @click="submit">{{actionText}}</v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
export default {
  name: 'CommentForm',
  props: {
    comment: Object,
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    actionText: 'Add Comment'
  }),
  watch: {
    isUpdating (updating) {
      this.actionText = updating ? 'Update Comment' : 'Add Comment'
    }
  },
  methods: {
    submit () {
      if (this.isUpdating) {
        this.$emit('update-comment', this.comment)
      } else {
        this.$emit('add-comment', this.comment)
      }
    },
    cancel () {
      this.$emit('cancel-add-comment')
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
