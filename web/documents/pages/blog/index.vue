<template>
  <div class="max-w-prose">
    <h1 class="text-white text-3xl">Notes List</h1>
    <div class="flex flex-col gap-10 py-5">
      <input
        v-model="query"
        label="Search"
        placeholder="Type here search terms"
        required
        class="text-black"
      >
      <div>
        <h2 class="text-slate-100">Categories</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="category in categories" :key="category" class="h-4">
            <div v-if="selectedCategory != category" class="badge badge-neutral badge-xs cursor-pointer p-2" @click="selectedCategory = category">{{ category }}</div>
            <div v-else class="badge badge-accent badge-xs cursor-pointer p-2" @click="selectCategory">{{ category }}</div>
          </div>
        </div>

      </div>
      <main class="text-left bg-slate-200">
        <nav class="flex flex-col p-10 gap-5">
          <!-- <div v-if="articles.length"> -->
            <h2 >Search Result</h2>
            <ul >
              <li v-for="article of articles" :key="article.slug" >
                <NuxtLink class="text-xs" :to="`blog/${article.slug}`" >{{ article.title }}</NuxtLink>
              </li>
            </ul>
            <button class="btn btn-sm btn-primary" v-if="hasMore" @click="loadMore">Load More</button>
          <!-- </div>
          <AppNavigation v-else :navigation-tree="navigation"  /> -->
        </nav>
      </main>
    </div>
  </div>
  </template>
  <script setup>
    import { watch, ref } from 'vue'
    import { get } from '~/lib/storage';
    // const { data: navigation } = await useAsyncData('navigation', () => {
    //   return fetchContentNavigation()
    // })
    
    const query = ref('');
    let documentQuery = {};
    const articles = ref([]);
    const categories = ref([]);
    const selectedCategory = ref('');
    let toSkip = 0;
    let toLimit = 10;
    const hasMore = ref(false);

    async function findArticles( where = {}, options = { skip: 0, limit: 10 }) {
      const { skip, limit } = options;
      const results = await queryContent('')
        .only(['title', 'slug', 'tags'])
        // .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit)
        .where(where)
        .find()
      // console.log(`query: ${JSON.stringify(where)} skip: ${skip} toSkip: ${toSkip} limit: ${limit} Result length: ${results.length}`);
      hasMore.value = results.length === limit;
      return results;
    }

    async function loadMore() {
      const result = await findArticles(documentQuery, { skip: toSkip, limit: toLimit });
      toSkip += Math.min(toLimit, result.length);
      // console.log(`loadMore: ${result.length}`);
      articles.value = [...articles.value, ...result];
    } 

    function getCategories(articles) {
      return Array.from(new Set(articles.flatMap(article => article.tags)));
    }

    function selectCategory(category) {
      selectedCategory.value = category;
    }
  
    watch([query, selectedCategory], async ([newQuery, newCategory], [oldQuery, oldCategory]) => {
      toSkip = 0;
      articles.value = [];
      console.log(`query: "${newQuery}" category: "${newCategory}" toSkip: ${toSkip}`);
      documentQuery = {$or: [{ description: { $regex: `/${newQuery}/ig` } }, {tags: { $contains: newCategory } }]}; // $or: [title: { $regex: `/${search}/ig` }, description: { $regex: `/${search}/ig` }]
      console.log(JSON.stringify(documentQuery));
      await loadMore();
    });

    onMounted(async () => {
      // the first time needs to read 1000 to find all categories
      // this can be improved by finding all categories in the backend on service start.
      const result = await findArticles({}, { skip: 0, limit: 1000 });
      categories.value = getCategories(result);
      await loadMore();
    }); 
    
  </script>