<template>
    <div id="contact" class="container mx-auto w-full min-h-96 h-screen bg-slate-400 p-10">
        <ActionFeedback 
            :message="feedbackMessage" 
            v-model:show="showFeedback">
        </ActionFeedback>
        <div  class="flex justify-center items-center ">
            <form class="w-full p-6 bg-white rounded shadow-md"  @submit="onSubmit">
                <h2 class="text-3xl font-bold mb-4">Contact Me</h2>
                <div v-if="errorList.length > 0"  class="mb-4">
                    <p class="text-red-500 font-bold">Please fix the following errors:</p>
                    <ul>
                        <li v-for="error in errorList" :key="error">{{ error }}</li>
                    </ul>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" v-model="name"  v-bind="nameAttrs" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" v-model="email"  v-bind="emailAttrs" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4">
                    <label for="message" class="block text-gray-700 font-bold mb-2">Message</label>
                    <textarea id="message" v-model="message"  v-bind="messageAttrs"  rows="4" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    </div>
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
