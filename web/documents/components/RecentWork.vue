<template>
    <div class="container mx-auto mt-10 min-h-96  bg-slate-400 p-10">
        <h1 class="text-3xl font-bold mb-4">Recent Work</h1>
        <div class="grid grid-cols-3 gap-4">
            <!-- Replace this with your actual work items -->
            <div v-for="workItem in workItems" :key="workItem.id" class="bg-white p-4 shadow">
                <h2 class="text-xl font-bold mb-2">{{ workItem.title }}</h2>
                <p class="text-gray-500">{{ workItem.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            workItems: [
                {
                    id: 1,
                    title: "Project 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    id: 2,
                    title: "Project 2",
                    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                {
                    id: 3,
                    title: "Project 3",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                },
            ],
        };
    },
};
</script>

<style>
/* Add your custom styles here */
</style>
