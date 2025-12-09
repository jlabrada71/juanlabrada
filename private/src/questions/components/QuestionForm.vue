
<template>
<div>
  <div id="question-form">
    <v-container>
      <v-card class="c-question-form">
        <v-card-title class="c-question-form__title">Question</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="question.id"></v-text-field>
<v-text-field label="Question" v-model="question.question"></v-text-field>
<v-textarea label="Description" v-model="question.description"></v-textarea>
<v-text-field label="Image" v-model="question.image"></v-text-field>
<v-text-field label="PublishDate" v-model="question.publishDate"></v-text-field>

        </v-form>
      <v-card-actions class="c-question-form-actions">
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
  name: 'QuestionForm',
  props: {
    question: Object,
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    actionText: 'Add Question'
  }),
  watch: {
    isUpdating (updating) {
      this.actionText = updating ? 'Update Question' : 'Add Question'
    }
  },
  methods: {
    submit () {
      if (this.isUpdating) {
        this.$emit('update-question', this.question)
      } else {
        this.$emit('add-question', this.question)
      }
    },
    cancel () {
      this.$emit('cancel-add-question')
    }
  }
}

</script>
<style>
c-question-form {

}

c-question-form__title {

}

c-question-form-actions {

}

</style>
