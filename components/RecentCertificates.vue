<template>
  <section id="certifications" class="w-full py-16 px-6 glass-card" style="background: rgba(23, 31, 51, 0.35);">
    <div class="max-w-5xl mx-auto">
      <p class="label-caps text-cyber-primary mb-3">Credentials</p>
      <h2 class="font-geist font-semibold text-cyber-text mb-3"
          style="font-size: 2.5rem; letter-spacing: -0.01em;">
        Certifications
      </h2>
      <p class="font-hanken text-cyber-muted text-sm mb-12 max-w-xl">
        Commitment to continuous learning in AI and software engineering.
      </p>

      <div class="relative">
        <button
          type="button"
          aria-label="Previous certificate"
          class="hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-card text-cyber-primary hover:shadow-glow-primary transition-shadow"
          @click="scrollByCard(-1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </button>

        <div
          ref="track"
          class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar"
          @scroll.passive="onScroll"
        >
          <div
            v-for="cert in certificates"
            :key="cert.file"
            class="glass-card p-5 flex flex-col gap-4 flex-none w-72 snap-start"
          >
            <button
              type="button"
              class="rounded-xl overflow-hidden border border-cyber-primary/30 shadow-glow-primary cursor-pointer"
              :aria-label="`View ${cert.title} certificate`"
              @click="openModal(cert)"
            >
              <img :src="`/certificates/${cert.file}`" :alt="cert.title" class="w-full h-40 object-cover" loading="lazy">
            </button>
            <div class="flex items-center justify-between gap-2">
              <span class="label-caps text-cyber-text">{{ cert.title }}</span>
              <button type="button" class="btn-ghost-cyber text-xs px-3 py-1.5 flex-none" @click="openModal(cert)">View</button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Next certificate"
          class="hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-card text-cyber-primary hover:shadow-glow-primary transition-shadow"
          @click="scrollByCard(1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="flex items-center justify-center gap-2 mt-6">
        <button
          v-for="(cert, index) in certificates"
          :key="cert.file"
          type="button"
          :aria-label="`Go to ${cert.title}`"
          class="w-2 h-2 rounded-full transition-all"
          :class="index === activeIndex ? 'bg-cyber-primary shadow-glow-primary w-6' : 'bg-cyber-outline-subtle'"
          @click="scrollToCard(index)"
        />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="activeCert"
        ref="overlay"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style="background: rgba(6, 14, 32, 0.8); backdrop-filter: blur(4px);"
        @click.self="closeModal"
        @keydown.esc="closeModal"
      >
        <div ref="modal" class="glass-card relative max-w-3xl w-full p-6 flex flex-col gap-4">
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
          <img :src="`/certificates/${activeCert.file}`" :alt="activeCert.title" class="w-full max-h-[75vh] object-contain rounded-xl border border-cyber-primary/30 shadow-glow-primary">
          <span class="label-caps text-cyber-text text-center">{{ activeCert.title }}</span>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const { data: certificates } = await useFetch('/certificates/certificates.json', { default: () => [] })

const track = ref(null)
const activeIndex = ref(0)

function cardStep() {
  const card = track.value?.querySelector(':scope > div')
  if (!card) return 0
  const gap = 24
  return card.offsetWidth + gap
}

function scrollByCard(direction) {
  track.value?.scrollBy({ left: direction * cardStep(), behavior: 'smooth' })
}

function scrollToCard(index) {
  track.value?.scrollTo({ left: index * cardStep(), behavior: 'smooth' })
}

function onScroll() {
  const step = cardStep()
  if (!step || !track.value) return
  activeIndex.value = Math.round(track.value.scrollLeft / step)
}

const activeCert = ref(null)
const overlay = ref(null)
const modal = ref(null)

async function openModal(cert) {
  activeCert.value = cert
  await nextTick()
  gsap.set(overlay.value, { opacity: 0 })
  gsap.set(modal.value, { opacity: 0, scale: 0.9, y: 24 })
  gsap.to(overlay.value, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  gsap.to(modal.value, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)' })
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  if (!activeCert.value) return
  gsap.to(modal.value, { opacity: 0, scale: 0.9, y: 24, duration: 0.2, ease: 'power2.in' })
  gsap.to(overlay.value, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      activeCert.value = null
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

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
