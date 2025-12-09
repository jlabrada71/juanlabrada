<template>
  <div class="w-full flex justify-center p-20">
  <div class="bg-slate-100 flex flex-col justify-center items-center max-w-screen-md p-5 gap-5">
    <div class="border-cyan-400 border-solid border-2 rounded-md w-full">
      <div v-for="question in questions" class="bg-cyan-100 w-full p-5"> 
        <p class="text-left">{{ question.text }}</p>
        <p class="text-right">{{ question.answer }}</p>
      </div>
    </div>
    <p class="text-left">{{ currentQuestion }}</p>
    <div class="p-5 flex gap-5 w-full">
      <UInput v-model="answer" class="w-full" />
      <UButton @click="ask">Send</UButton>
    </div>

  </div>
</div>

</template>

<script setup lang="ts">
  const answer = ref('')
  const currentQuestion = ref('How can I help you today?')
  const questions = ref([])
  const nextQuestions = ref([]);


  async function ask() {
    questions.value.push({ text: currentQuestion.value, answer: answer.value })
    currentQuestion.value = '';
    answer.value = '';
    if (nextQuestions.value.length) {
      currentQuestion.value = nextQuestions.value.pop();
      return;
    }
    
    const response = await $fetch('/api/coach', { 
      method: 'POST', 
      body: {
        questions: questions.value
      }
    })

    console.log(response)

    nextQuestions.value = response.response.questions;
    currentQuestion.value = nextQuestions.value.pop();
  }

</script>