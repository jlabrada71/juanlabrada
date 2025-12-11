
<template>
    <h1>Composition Api Validation</h1>
    <form class="p-10 flex gap-5" @submit="onSubmit">
      <input v-model="email" v-bind="emailAttrs" type="text" />
      <input v-model="name" v-bind="nameAttrs" type="text" />
      <textarea v-model="content" v-bind="contentAttrs" type="text" />
      <button class="bg-slate-300 p-2 rounded-full hover:bg-slate-400">Send Message</button>
    </form>

    <pre>values: {{ values }}</pre>
    <pre>errors: {{ errors }}</pre>
</template>
    

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required(),
  content: yup.string().required(),
});

const { errors, values, defineField, handleSubmit } = useForm({ validationSchema: schema });

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
const [content, contentAttrs] = defineField('content');

const onSubmit = handleSubmit((values, actions) => {
  console.log('Form submitted', values);
  actions.resetForm();
})

</script>