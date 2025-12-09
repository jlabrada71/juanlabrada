<template>
    Random
    <div>{{random}}</div>
    News
    <div>{{news }}</div>
    Weather
    <div>{{ weather }}</div>
    Stocks
    <div>{{ stocks }}</div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useEvent } from '@/composables/useEvent.js';

    const random = ref(0)

    // more details on EventSource options: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    
    const randomSource = new EventSource("http://localhost:3000/random");

    useEvent('message',  e => {
     console.log('RECEIVED', e.data);
     random.value = e.data;
    }, { target: randomSource } );

    const news = ref('');

    const latestSource = new EventSource("http://localhost:3000/latest");

    useEvent('news',  e => {
        news.value = e.data;
    }, { target: latestSource } );

    const weather = ref({temperature: 0, wind: 0});

    // weather message handler
    useEvent('weather',  e => {
        weather.value = JSON.parse(e.data);
    }, { target: latestSource } );

    const stocks = ref({symbol:'', share: '', price: 0.0 });

    // stock message handler
    useEvent('stock',  e => {
        stocks.value = JSON.parse(e.data);
    }, { target: latestSource } );
</script>