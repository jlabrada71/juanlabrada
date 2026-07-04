<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
          style="background: rgba(11,19,38,0.8); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,240,255,0.1);">
    <!-- Logo -->
    <NuxtLink to="/" class="font-geist font-semibold text-cyber-text text-lg tracking-tight hover:text-cyber-primary transition-colors">
      Juan Labrada
    </NuxtLink>

    <!-- Nav links (desktop) -->
    <nav class="hidden md:flex items-center gap-8">
      <a v-for="link in navLinks" :key="link.href"
         :href="link.href"
         class="label-caps text-cyber-muted hover:text-cyber-text transition-colors">
        {{ link.label }}
      </a>
    </nav>

    <!-- CTA -->
    <a href="#contact" class="btn-primary-cyber hidden md:inline-flex">
      Contact
    </a>

    <!-- Mobile menu toggle -->
    <button class="md:hidden text-cyber-muted hover:text-cyber-text transition-colors"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu">
      <span class="mdi mdi-menu text-2xl" />
    </button>

    <!-- Mobile dropdown -->
    <div v-if="mobileOpen"
         class="absolute top-16 left-0 right-0 flex flex-col items-start gap-4 p-6"
         style="background: rgba(11,19,38,0.96); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,240,255,0.1);">
      <a v-for="link in navLinks" :key="link.href"
         :href="link.href"
         class="label-caps text-cyber-muted hover:text-cyber-text transition-colors"
         @click="mobileOpen = false">
        {{ link.label }}
      </a>
      <a href="#contact" class="btn-primary-cyber mt-2" @click="mobileOpen = false">
        Contact
      </a>
    </div>
  </header>
</template>

<script setup>
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Experience',  href: '#experiences' },
  { label: 'Products',    href: '#products' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Posts',       href: '#posts' },
]
</script>
