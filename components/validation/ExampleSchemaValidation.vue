<template>
    <div class="justify-center">
        <h1>Example using schema</h1>

                <!-- novalidate - disables native form validation -->
        <Form :validation-schema="schema" @submit="onSubmit">
            <Field name="email" type="email" class="rounded-full" />
            <ErrorMessage name="email" />

            <Field name="name" class="rounded-full" />
            <ErrorMessage name="name" />

            <button class="bg-slate-300 p-2 rounded-full hover:bg-slate-400">Sign up for newsletter</button>
        </Form>

    </div>
    
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}

function validateEmail(value) {
    // if the field is empty
    if (!value) {
    return 'This field is required';
    }
    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'This field must be a valid email';
    }
    // All is good
    return true;
}

</script>