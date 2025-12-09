<template>
    <div id="posts" class="container mx-auto min-h-96  bg-slate-400 p-10">
        <h1 class="text-3xl font-bold mb-4">Recent Posts</h1>
        <div class="flex flex-col lg:flex-row justify-center gap-4">
            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">4 Rules of Simple Design</h2>
                <NuxtLink to="/blog/4-rules-of-simple-design">Click here</NuxtLink>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Test Driven Development ROI</h2>
                <NuxtLink to="/blog/test-driven-development-roi">Click here</NuxtLink>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Liskov Substitution Principle</h2>
                <NuxtLink to="/blog/liskov-substitution-principle">Click here</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recentPosts: [
                {
                    id: 1,
                    title: "Post 1",
                    date: "2022-01-01",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    id: 2,
                    title: "Post 2",
                    date: "2022-01-02",
                    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                // Add more recent posts here
            ],
        };
    },
};
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
