<template>
  <Teleport to="body">
    <div
      v-if="props.show"
      ref="toast"
      class="fixed bottom-6 right-6 z-[100] w-full max-w-sm glass-card overflow-hidden"
      role="status"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="flex items-start gap-3 p-4">
        <span
          class="flex-none w-9 h-9 rounded-full flex items-center justify-center"
          :style="{ background: accent.bg, color: accent.fg }"
        >
          <svg v-if="color === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.98-1.742 2.98H3.48c-1.53 0-2.492-1.646-1.743-2.98l6.52-11.59zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </span>

        <div class="flex-1 pt-1">
          <p class="label-caps" :style="{ color: accent.fg }">{{ props.title }}</p>
          <p class="font-hanken text-cyber-text text-sm mt-1">{{ props.message }}</p>
        </div>

        <button
          type="button"
          aria-label="Dismiss"
          class="flex-none text-cyber-muted hover:text-cyber-text transition-colors"
          @click="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="h-0.5 w-full bg-cyber-outline-subtle/40">
        <div ref="progress" class="h-full" :style="{ background: accent.fg }" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['update:show'])

const props = defineProps({
  title: {
    type: String,
    default: 'Success',
  },
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    default: 'success',
  },
  timeout: {
    type: Number,
    default: 5000,
  },
})

const accents = {
  success: { bg: 'rgba(101, 242, 181, 0.12)', fg: '#65f2b5' },
  error: { bg: 'rgba(255, 180, 171, 0.12)', fg: '#ffb4ab' },
  info: { bg: 'rgba(0, 240, 255, 0.12)', fg: '#00f0ff' },
}

const color = computed(() => accents[props.color] ? props.color : 'success')
const accent = computed(() => accents[color.value])

const toast = ref(null)
const progress = ref(null)
let progressTween = null

function close() {
  emit('update:show', false)
}

function startTimer() {
  progressTween?.kill()
  if (!progress.value) return
  gsap.set(progress.value, { scaleX: 1, transformOrigin: 'left' })
  progressTween = gsap.to(progress.value, {
    scaleX: 0,
    duration: props.timeout / 1000,
    ease: 'none',
    onComplete: close,
  })
}

function pauseTimer() {
  progressTween?.pause()
}

function resumeTimer() {
  progressTween?.resume()
}

watch(() => props.show, async (isShown) => {
  if (!isShown) {
    progressTween?.kill()
    return
  }
  await nextTick()
  gsap.fromTo(toast.value, { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.6)' })
  startTimer()
}, { immediate: true })

onBeforeUnmount(() => {
  progressTween?.kill()
})
</script>
