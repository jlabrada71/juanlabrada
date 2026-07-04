<template>
  <section id="contact" class="w-full py-24 px-6" style="background: #0b1326;">
    <div class="max-w-2xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Let's Talk</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Contact Me
      </h2>

      <ActionFeedback :message="feedbackMessage" v-model:show="showFeedback" />

      <form class="glass-card p-8 flex flex-col gap-6" @submit="onSubmit">

        <div v-if="errorList.length > 0"
             class="p-3 rounded"
             style="background: rgba(255,180,171,0.1); border: 1px solid rgba(255,180,171,0.3);">
          <ul class="text-sm" style="color: #ffb4ab;">
            <li v-for="error in errorList" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="flex flex-col gap-1">
          <label for="name" class="label-caps text-cyber-muted">Name</label>
          <input id="name" type="text" v-model="name" v-bind="nameAttrs"
                 class="input-cyber font-hanken"
                 placeholder="Your name" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="label-caps text-cyber-muted">Email</label>
          <input id="email" type="email" v-model="email" v-bind="emailAttrs"
                 class="input-cyber font-hanken"
                 placeholder="your@email.com" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="message" class="label-caps text-cyber-muted">Message</label>
          <textarea id="message" v-model="message" v-bind="messageAttrs" rows="5"
                    class="input-cyber font-hanken resize-none"
                    placeholder="What's on your mind?" />
        </div>

        <button type="submit" class="btn-primary-cyber self-start" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import MessageRepositoryProxy from '@/messages/lib/message-repository-proxy'

import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required(),
  message: yup.string().required(),
});

const { errors, values, defineField, handleSubmit } = useForm({ validationSchema: schema });

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
const [message, messageAttrs] = defineField('message');

const feedbackMessage = ref('Thanks for sending your message.');
const showFeedback = ref(false);
const loading = ref(false);

const errorList = computed(() => {
    return Object.keys(errors.value).map((key) => errors.value[key]);
});

const onSubmit = handleSubmit(async (values, actions) => {
    console.log('Form submitted', values);
    loading.value = true

    // show the waiting image
    const runtimeConfig = useRuntimeConfig()
    const messageRepository = new MessageRepositoryProxy(runtimeConfig)
    await messageRepository.add({...values, date: new Date(Date.now())})

    loading.value = false
    showFeedback.value = true
    actions.resetForm();
})

</script>

<style>
/* Add Tailwind CSS classes here if needed */
</style>
