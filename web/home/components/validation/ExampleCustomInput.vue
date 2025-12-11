<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
  }),
});

const [email, emailProps] = defineField('email',{
  validateOnModelUpdate: false,  // remove this line to validate on each model update
                                // otherwise it validates only on blur
});
</script>

<template>
    <h1>Custom Input</h1>
    <ValidationCustomInput v-model="email" v-bind="emailProps" />

    <pre>errors: {{ errors }}</pre>
    <pre>values: {{ values }}</pre>
</template>