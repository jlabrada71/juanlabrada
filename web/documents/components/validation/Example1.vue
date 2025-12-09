<template>
    <div class="justify-center">
        <h1>Example1</h1>
        <div id="app">
                <!-- novalidate - disables native form validation -->
            <Form class="p-10 flex gap-5" @submit="onSubmit">
                <Field type="email" name="email" :rules="validateEmail" class="rounded-full"/>
                <ErrorMessage name="email" />
                <button class="bg-slate-300 p-2 rounded-full hover:bg-slate-400">Sign up for newsletter</button>
            </Form>
        </div>
    </div>
    
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

function onSubmit(values) {
  console.log('Form submitted', values);
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