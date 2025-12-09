<template>
 <div class="questions">
    <RandomQuestion />
    <QuestionDetails
      v-show="isVisibleQuestionDetails"
      :question="currentQuestion"
      @close-question-details="closeQuestionDetails"
    />

    <v-icon v-show="!isVisibleQuestionForm" @click="showAddQuestionForm">
      add_circle
    </v-icon>
    <v-container>
      <v-row>
        <v-col>
          <QuestionForm
            v-show="isVisibleQuestionForm"
            :question="currentQuestion"
            :is-updating="isUpdatingQuestion"
            @add-question="addQuestion"
            @update-question="updateQuestion"
            @cancel-add-question="cancelAddQuestion"
          />
        </v-col>
      </v-row>
    </v-container>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">
      Question list
    </h1>
    <QuestionList
      :questions="questions"
      @show-question="showQuestionDetails"
      @edit-question="editQuestion"
      @delete-question="deleteQuestion"
    />
  </div>

</template>
<script>
import RandomQuestion from '@/questions/components/RandomQuestion.vue'
import QuestionList from '@/questions/components/QuestionList.vue'
import QuestionForm from '@/questions/components/QuestionForm.vue'
import QuestionDetails from '@/questions/components/QuestionDetails.vue'
import QuestionRepositoryProxy from '@/questions/lib/question-repository-proxy'

export default {
  name: 'QuestionView',

  components: {
    QuestionList,
    QuestionForm,
    QuestionDetails,
    RandomQuestion
  },

  data: () => ({
    questions: [],
    currentQuestion: {},
    isVisibleQuestionForm: false,
    isVisibleQuestionDetails: false,
    isUpdatingQuestion: false
  }),

  mounted () {
    this.currentQuestion = {}
    this.getQuestions()
  },

  methods: {
    async getQuestions () {
      this.questions = await QuestionRepositoryProxy.findAll()
    },

    async deleteQuestion (question) {
      await QuestionRepositoryProxy.delete(question)
      await this.getQuestions()
    },

    async addQuestion (question) {
      // alert(`adding question ${JSON.stringify(question)}`)
      await QuestionRepositoryProxy.add(question)
      await this.getQuestions()
      this.hideQuestionForm()
    },

    async updateQuestion (question) {
      // alert(`adding question ${JSON.stringify(question)}`)
      await QuestionRepositoryProxy.update(question)
      await this.getQuestions()
      this.hideQuestionForm()
    },

    showQuestionDetails (question) {
      this.currentQuestion = question
      this.isVisibleQuestionDetails = true
    },

    closeQuestionDetails () {
      this.isVisibleQuestionDetails = false
    },

    editQuestion (question) {
      this.isUpdatingQuestion = true
      this.currentQuestion = question
      this.isVisibleQuestionForm = true
    },

    cancelAddQuestion () {
      this.hideQuestionForm()
    },

    hideQuestionForm () {
      this.isVisibleQuestionForm = false
    },

    showQuestionForm () {
      this.isVisibleQuestionForm = true
    },

    showAddQuestionForm () {
      this.isUpdatingQuestion = false
      this.currentQuestion = {}
      this.isVisibleQuestionForm = true
    }
  }
}

</script>
<style>
</style>
