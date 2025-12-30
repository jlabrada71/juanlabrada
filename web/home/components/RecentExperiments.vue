<template>
    <div id="experiments" class="container mx-auto  min-h-96 h-fit  bg-slate-400 p-10">
        <h1 class="text-3xl font-bold mb-4">Recent Experiments</h1>
        <div class="flex flex-col lg:flex-row gap-4">
            <!-- Recent experiments items -->
            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Gallery 1</h2>
                <p class="text-gray-500">Changing the image width and height on hover within a grid.</p>
                <div class="flex justify-center">
                    <ImageGallery4 />
                </div>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Gallery 2</h2>
                <p class="text-gray-500">Changing the image width on hover within a grid.</p>
                <div class="flex justify-center">
                    <ImageGallery1 />
                </div>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Mermaid Graph</h2>
                <p class="text-gray-500">Creating a UML graph using Mermaid.</p>
                <div class="flex justify-center">
                    <MermaidDemo />
                </div>
            </div>
        </div>
    </div>
</template>
