<template>
  <ClientOnly>
    <div class="w-fit h-fit p-10 rounded-lg text-white font-black backdrop-blur-sm">
      <h1>{{quote.title}}</h1>
      <h2>{{quote.author}}</h2>
      <p class="neon-slate p-5 text-white  neon-text-slate">{{quote.text}}</p>
    </div>
  </ClientOnly>
</template>
<script setup>
  import { ref } from 'vue'

  const quotes = [{
    title: '',
    text: 'A good coach can change a game. A great coach can change a life.',
    author: ''
  },
  {
    title: '',
    text: 'In preparing for battle I have always found that plans are useless but planning is indispensable.',
    author: 'Dwight D. Eisenhower'
  },
  {
    title: '',
    text: 'First, solve the problem. Then, write the code.',
    author: ''
  },
  {
    title: '',
    text: 'For it is the mark of an educated person to search for the same kind of clarity in each topic to the extent that the nature of the matter accepts it.',
    author: 'Aristóteles'
  },
  {
    title: '',
    text: 'Self-awareness arises from reflection, Change starts with inquiring.',
    author: ''
  },
  {
    title: '',
    text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi'
  },
  {
    title: '',
    text: 'To homogenize should never be a goal. Things only get value in comparison. The value is in the gap between two different things. The tension between different things is released either by breaking them apart or moving them toward the minimum energy state.',
    author: ''
  },
  {
    title: '',
    text: 'Without data you’re just another person with an opinion.',
    author: 'William Edwards Deming'
  }]

  const quote = ref(quotes[Math.floor(Math.random() * quotes.length)])

</script>

