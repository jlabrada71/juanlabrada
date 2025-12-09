<template>
<div id="question-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title ><slot name="title">Question Details</slot></v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{question.id}}</v-list-item-title>
            <v-list-item-title class="headline mb-1">{{question.question}}</v-list-item-title>
            <v-list-item-title class="headline mb-1">{{question.description}}</v-list-item-title>
            <v-list-item-title class="headline mb-1">{{question.image}}</v-list-item-title>
            <v-list-item-title class="headline mb-1">{{question.publishDate}}</v-list-item-title>
           </v-list-item-content>
           <!-- <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ></v-list-item-avatar> -->
         </v-list-item>
         <v-card-actions>
           <slot name="action"><v-btn class="success" @click="close">Close</v-btn></slot>
         </v-card-actions>
       </v-card>
     </v-container>
  </div>

</template>
<script>
export default {
  name: 'QuestionDetails',
  props: {
    question: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    close () {
      this.$emit('close-question-details', this.question)
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
