<template>
  <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-16"
           style="background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,240,255,0.12) 0%, transparent 60%), linear-gradient(rgba(11,19,38,0.85), rgba(11,19,38,0.85)), url('/images/hero-image-vue.png'); background-size: cover, cover, cover; background-position: center, center, center; background-repeat: no-repeat, no-repeat, no-repeat;">

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 pointer-events-none"
         style="background-image: linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px); background-size: 48px 48px;" />

    <div class="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full min-w-0">
      <!-- Role tag -->
      <span class="label-caps text-cyber-primary">
        Fullstack AI Engineer · Claude · LangChain · Vue.js · Node.js
      </span>

      <!-- Headline -->
      <h1 class="font-geist font-bold text-cyber-text leading-tight"
          style="font-size: clamp(2.5rem, 6vw, 4rem); letter-spacing: -0.02em;">
        Solving the  <span style="color: #00f0ff;">unsolvable</span><span class="text-cyber-text"> with AI-driven architecture</span>
      </h1>
      <p class="text-cyber-text">Specializing in AI Solutions with Vue.js/Nuxt frontend systems and highly scalable Node.js backend infrastructures.</p>

      <!-- Certifications -->
      <RecentCertificates />

      <!-- CTAs -->
      <div class="flex flex-wrap gap-4 justify-center mt-2">
        <a href="#products" class="btn-primary-cyber">View Projects</a>
        <a href="#experiences" class="btn-ghost-cyber">Experience</a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
