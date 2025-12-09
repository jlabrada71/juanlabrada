<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <v-card
     :loading="loading"
     class="mx-auto my-12"
     max-width="374"
   >
     <v-img
       height="250"
       src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
     ></v-img>

     <v-card-title><h1>{{currentProblem.title}}</h1></v-card-title>
     <v-card-text>
       <v-row align="center">
        {{currentProblem.description}}
       </v-row>
     </v-card-text>

     <v-divider class="mx-4"></v-divider>

     <v-card-text>
       <div class="title text--primary">What would you do?</div>
       <v-radio-group v-model="answer" :mandatory="false">
         <v-radio v-for="item in currentProblem.choices" v-bind:key= "item.id" :label="item.description" :value="item.id">
         </v-radio>
       </v-radio-group>
       <div class="title text--primary">{{feedback}}</div>
     </v-card-text>

     <v-card-actions>
       <v-btn
         v-show='!isSubmitted'
         color="green accent-4"
         text
         @click="processAnswer"
       >
         Enviar
       </v-btn>
       <v-btn
         v-show='next'
         color="green accent-4"
         text
         @click="nextProblem"
       >
         Next
       </v-btn>
     </v-card-actions>
   </v-card>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    problems: [
      {
        title: 'Buying a house',
        description: 'You want to buy the house of your dreams. What would you do?',
        choices: [{ id: 1, description: 'Look for the price of other properties on sale around' },
          { id: 2, description: 'Ask for a lower price' },
          { id: 3, description: 'What ever option' }],
        answers: [{ id: 1, description: 'Well done, having a strong BATNA is a good negotiation strategy.', points: 2 },
          { id: 2, description: 'Not bad. Sometimes you can make the onwer lower the price.', points: 1 },
          { id: 3, description: 'Too bad, that way you wont get your dreams house', points: 0 }]
      },
      {
        title: 'Buying a car',
        description: 'You want to buy the car of your dreams. What would you do?',
        choices: [{ id: 1, description: 'Look for the price of other cars on sale around' },
          { id: 2, description: 'Ask for a lower price' },
          { id: 3, description: 'What ever option' }],
        answers: [{ id: 1, description: 'Well done, having a strong BATNA is a good negotiation strategy.', points: 2 },
          { id: 2, description: 'Not bad. Sometimes you can make the onwer lower the price.', points: 1 },
          { id: 3, description: 'Too bad, that way you wont get your dreams house', points: 0 }]
      }
    ],
    currentProblemIndex: 0,
    currentProblem: {
      title: 'Prueba',
      description: 'Description de prueba',
      choices: [{ id: 1, description: 'option de prueba' }],
      answers: [{ id: 1, description: 'respuesta de prueba' }]
    },
    answer: '',
    feedback: '',
    isSubmitted: false

  }),
  computed: {
    next () { return this.isSubmitted }
  },
  mounted () {
    this.currentProblem = this.problems[0]
  },
  methods: {
    processAnswer () {
      this.isSubmitted = true
      for (let i = 0; i < this.currentProblem.answers.length; i += 1) {
        if (this.currentProblem.answers[i].id === this.answer) {
          this.feedback = this.currentProblem.answers[i].description
          return
        }
      }
      this.feedback = 'Respuesta no encontrada'
    },
    nextProblem () {
      this.isSubmitted = false
      this.answer = ''
      this.feedback = ''
      this.currentProblemIndex += 1
      if (this.currentProblemIndex === this.problems.length) {
        this.currentProblemIndex = 0
      }
      this.currentProblem = this.problems[this.currentProblemIndex]
    }
  }

}
</script>

<style>

</style>
