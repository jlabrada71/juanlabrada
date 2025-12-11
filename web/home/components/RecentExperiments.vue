<template>
    <div id="experiments" class="container mx-auto  min-h-96 h-fit  bg-slate-400 p-10">
        <h1 class="text-3xl font-bold mb-4">Recent Experiments</h1>
        <div class="flex flex-col lg:flex-row gap-4">
            <!-- Recent experiments items -->
            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Gallery 1</h2>
                <p class="text-gray-500">Changing the image width and height on hover within a grid.</p>
                <div class="flex justify-center">
                    <ExperimentsImageGallery4 />
                </div>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Gallery 2</h2>
                <p class="text-gray-500">Changing the image width on hover within a grid.</p>
                <div class="flex justify-center">
                    <ExperimentsImageGallery1 />
                </div>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Mermaid Graph</h2>
                <p class="text-gray-500">Creating a UML graph using Mermaid.</p>
                <div class="flex justify-center">
                    <ExperimentsMermaidDemo />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            experiments: [
                {
                    id: 1,
                    title: "Experiment 1",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
                {
                    id: 2,
                    title: "Experiment 2",
                    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                {
                    id: 3,
                    title: "Experiment 3",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
            ],
        };
    },
};
</script>

<style>
/* Add Tailwind CSS classes here if needed */
</style>
