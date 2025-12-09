<template>
  <div class="random-question">
    <QuestionDetails
      v-show="isVisibleQuestionDetails"
      :question="currentQuestion"
      @close-question-details="nextQuestion"
    >
      <h1 slot="title">Random Coaching Question</h1>
      <v-btn slot="action" class="success" @click="nextQuestion">Next Question</v-btn>
    </QuestionDetails>
  </div>
</template>
<script>
import QuestionDetails from '@/questions/components/QuestionDetails.vue'
import QuestionRepositoryProxy from '@/questions/lib/question-repository-proxy'

export default {
  name: 'RandomQuestion',

  components: {
    QuestionDetails
  },

  data: () => ({
    questions: [],
    currentQuestion: {},
    isVisibleQuestionDetails: false
  }),

  async mounted () {
    await this.getQuestions()
    this.nextQuestion()
  },

  methods: {
    async getQuestions () {
      this.questions = await QuestionRepositoryProxy.findAll()
    },

    getRandomQuestion () {
      return this.questions[Math.floor(Math.random() * this.questions.length)]
    },

    nextQuestion () {
      this.currentQuestion = this.getRandomQuestion()
      this.isVisibleQuestionDetails = true
    }
  }
}

</script>
<style>
</style>
