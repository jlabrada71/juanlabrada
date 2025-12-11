<template>
    <div id="products" class="container mx-auto min-h-96  bg-slate-400 p-10">
        <h1 class="text-3xl font-bold mb-4">Recent Products</h1>
        <div class="flex flex-col lg:flex-row gap-4 justify-center">
            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">MabayJS</h2>
                <p class="text-gray-500">Model based code generator</p>
                <NuxtLink to="https://github.com/jlabrada71/mabayjs">
                    Github
                </NuxtLink>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Palette generator</h2>
                <p class="text-gray-500">Model based code generator</p>
                <NuxtLink to="/color-tools">
                     Palette Generator
                </NuxtLink>
            </div>

            <div class="bg-white p-4 shadow rounded">
                <h2 class="text-lg font-semibold">Utm builder</h2>
                <p class="text-gray-500">This tool helps create Utm urls for ad campaigns.</p>
                <NuxtLink to="/utm-builder">
                   Utm Builder
                </NuxtLink>
            </div>
        </div>
        <!-- generate a button more -->

    </div>
</template>

<script>
export default {
    name: 'RecentProducts',
    // Add your data, methods, computed properties, etc. here
}
</script>

<style>
/* Add your custom styles or Tailwind CSS classes here */
</style>
