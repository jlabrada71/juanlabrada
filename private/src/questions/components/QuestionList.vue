<template>
  <div id="question-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="800"
        tile
      >
      <v-card-title>Questions</v-card-title>
        <v-list>

          <v-list-item-group color="primary">
            <v-list-item v-for="(question, index) in questions" :key="index">
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="question.id"
                      v-on:click="showQuestion(question)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="question.question"
                      v-on:click="showQuestion(question)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="question.image"
                      v-on:click="showQuestion(question)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="question.publishDate"
                      v-on:click="showQuestion(question)"></v-list-item-title>
                  </v-col>

                  <v-col>
                    <v-icon v-on:click="editQuestion(question)">edit</v-icon>
                    <v-icon v-on:click="deleteQuestion(question)">delete</v-icon>
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
  name: 'question-list',
  props: {
    questions: Array
  },
  methods: {
    deleteQuestion (question) {
      this.$emit('delete-question', question)
      // alert(`deleting ${JSON.stringify(question)}`);
    },
    editQuestion (question) {
      this.$emit('edit-question', question)
      // alert(`editing ${JSON.stringify(question)}`);
    },
    showQuestion (question) {
      this.$emit('show-question', question)
      // alert(`showing ${JSON.stringify(question)}`);
    }
  },
  data: () => ({
    valid: false
  })

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
