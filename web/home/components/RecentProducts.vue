<template>
  <section id="products" class="w-full py-24 px-6" style="background: #0d1628;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Work</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Products
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.title" class="glass-card p-6 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <h3 class="font-geist font-semibold text-cyber-text text-lg">{{ product.title }}</h3>
            <span class="tech-chip">{{ product.type }}</span>
          </div>

          <div class="flex flex-col gap-3 flex-1">
            <div>
              <p class="label-caps text-cyber-muted mb-1">Problem</p>
              <p class="font-hanken text-cyber-muted text-sm leading-relaxed">{{ product.problem }}</p>
            </div>
            <div>
              <p class="label-caps text-cyber-muted mb-1">Stack</p>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in product.stack" :key="tag" class="tech-chip">{{ tag }}</span>
              </div>
            </div>
          </div>

          <NuxtLink :to="product.url" class="btn-ghost-cyber text-center mt-auto text-sm">
            {{ product.linkLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    title: 'MabayJS',
    type: 'OSS',
    problem: 'Manually writing boilerplate code for CRUD models slows down development cycles.',
    stack: ['Node.js', 'JavaScript'],
    url: 'https://github.com/jlabrada71/mabayjs',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Palette Generator',
    type: 'Tool',
    problem: 'Designers need instant harmonic color palettes with contrast-safe combinations.',
    stack: ['Vue.js', 'chroma-js'],
    url: '/color-tools',
    linkLabel: 'Open Tool',
  },
  {
    title: 'UTM Builder',
    type: 'Tool',
    problem: 'Marketing teams waste time hand-crafting UTM tracking URLs for ad campaigns.',
    stack: ['Vue.js', 'Nuxt'],
    url: '/utm-builder',
    linkLabel: 'Open Tool',
  },
]
</script>
