<template>
    <NuxtLink :to="props.url">
        <div class=" rounded-2xl border-2 border-slate-50/30 shadow-md backdrop-blur-sm gap-5 flex-col flex-wrap justify-center bg-zinc-400/40 w-full flex p-5 text-white text-5xl font-black 
                                hover:backdrop-blur-sm  hover:bg-zinc-400/40 hover:scale-105 hover:transition-all hover:duration-500 hover:text-white hover:text-5xl hover:font-black 
                                ">

            <h1 class="  justify-center bg-transparent transition-all duration-500 text-lg ">
                {{props.title}}

            </h1>

        </div>
    </NuxtLink>

</template>
<script setup>
const props = defineProps({

    title: {
        type: String,
        required: true,
        default: ''
    },

    url: {
        type: String,
        required: false,
        default: ''
    }

})
const emit = defineEmits([])
</script>
<style scoped>

</style>