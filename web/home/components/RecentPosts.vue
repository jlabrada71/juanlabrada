<template>
  <section id="posts" class="w-full py-24 px-6" style="background: #0d1628;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Writing</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Posts
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a v-for="post in posts" :key="post.title"
           :href="post.url"
           target="_blank"
           rel="noopener"
           class="glass-card p-6 flex flex-col gap-3 group"
           style="text-decoration: none;">
          <h3 class="font-geist font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors">
            {{ post.title }}
          </h3>
          <span class="label-caps text-cyber-primary mt-auto">Read →</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    title: '4 Rules of Simple Design',
    url: 'https://docs.juanlabrada.com/blog/4-rules-of-simple-design',
  },
  {
    title: 'Test Driven Development ROI',
    url: 'https://docs.juanlabrada.com/blog/test-driven-development-roi',
  },
  {
    title: 'Liskov Substitution Principle',
    url: 'https://docs.juanlabrada.com/blog/liskov-substitution-principle',
  },
]
</script>
