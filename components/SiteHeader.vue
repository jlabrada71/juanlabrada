<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
          style="background: rgba(11,19,38,0.8); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,240,255,0.1);">
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-3 font-geist font-semibold text-cyber-text text-lg tracking-tight hover:text-cyber-primary transition-colors">
      Juan Labrada
      <img src="assets/images/juan-image.png" alt="Juan Labrada"
           class="w-8 h-8 rounded-full object-cover cursor-pointer"
           style="border: 1px solid rgba(0, 240, 255, 0.3);"
           @click.stop.prevent="openModal">
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

  <Teleport to="body">
    <div
      v-if="photoModalOpen"
      ref="overlay"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style="background: rgba(6, 14, 32, 0.8); backdrop-filter: blur(4px);"
      @click.self="closeModal"
    >
      <div ref="modal" class="glass-card relative max-w-md w-full max-h-[85vh] overflow-y-auto p-6 flex flex-col items-center gap-2">
        <button
          type="button"
          aria-label="Close"
          class="absolute top-3 right-3 w-10 h-10 rounded-full glass-card flex items-center justify-center text-cyber-primary hover:shadow-glow-primary transition-shadow"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <img src="assets/images/juan-image.png" alt="Juan Labrada"
             class="w-32 h-32 rounded-full border border-cyber-primary/30 shadow-glow-primary object-cover mt-2">
        <span class="label-caps text-cyber-text text-center">Juan Labrada</span>
        <QuoteWindow />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const mobileOpen = ref(false)

const navLinks = [
  { label: 'Experience',  href: '#experiences' },
  { label: 'Products',    href: '#products' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Posts',       href: '#posts' },
]

const photoModalOpen = ref(false)
const overlay = ref(null)
const modal = ref(null)

async function openModal() {
  photoModalOpen.value = true
  await nextTick()
  gsap.set(overlay.value, { opacity: 0 })
  gsap.set(modal.value, { opacity: 0, scale: 0.9, y: 24 })
  gsap.to(overlay.value, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  gsap.to(modal.value, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)' })
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  if (!photoModalOpen.value) return
  gsap.to(modal.value, { opacity: 0, scale: 0.9, y: 24, duration: 0.2, ease: 'power2.in' })
  gsap.to(overlay.value, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      photoModalOpen.value = false
      document.body.style.overflow = ''
    },
  })
  window.removeEventListener('keydown', onKeydown)
}

function onKeydown(e) {
  if (e.key === 'Escape') closeModal()
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>
