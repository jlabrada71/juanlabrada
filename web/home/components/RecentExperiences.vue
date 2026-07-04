<template>
  <section id="experiences" class="w-full py-24 px-6" style="background: #0b1326;">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Career</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-12"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Experience
      </h2>

      <div class="flex flex-col gap-6">
        <div v-for="exp in experiences" :key="exp.company" class="glass-card p-6 flex flex-col sm:flex-row sm:items-start gap-4">
          <div class="flex-1">
            <h3 class="font-geist font-semibold text-cyber-text text-lg mb-1">{{ exp.role }}</h3>
            <p class="text-cyber-primary font-medium mb-2">{{ exp.company }}</p>
            <p v-if="exp.description" class="font-hanken text-cyber-muted text-sm leading-relaxed">
              {{ exp.description }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in exp.tags" :key="tag" class="tech-chip">{{ tag }}</span>
            </div>
          </div>
          <span v-if="exp.period" class="font-jetbrains text-cyber-muted text-xs whitespace-nowrap mt-1">
            {{ exp.period }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = [
  {
    role: 'Senior Software Developer',
    company: 'MonetizeMore',
    period: '2022 – Present',
    description: 'Built and maintained ad tech revenue optimization platform features using Vue.js and Node.js.',
    tags: ['Vue.js', 'Node.js', 'TypeScript'],
  },
  {
    role: 'Senior Software Developer',
    company: 'WPlex',
    period: '2020 – 2022',
    description: 'Developed full-stack web applications and REST APIs for WordPress hosting infrastructure.',
    tags: ['Vue.js', 'PHP', 'REST API'],
  },
  {
    role: 'Senior Software Developer',
    company: 'Experian',
    period: '2018 – 2020',
    description: 'Contributed to credit data analytics dashboards and data pipeline integrations.',
    tags: ['Angular', 'Java', 'SQL'],
  },
]
</script>
