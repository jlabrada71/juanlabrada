<template>
    <div>
        <h1>Component Life Cycle</h1>
    </div>
</template>
<script>
import Logger from '@/lib/logger'

export default {
  beforeCreate () {
    Logger.debug('Running before create', 'component cycle')
  },
  created () {
    Logger.debug('Running created', 'component cycle')
  },
  beforeMount () {
    Logger.debug('Running before mount', 'component cycle')
  },
  mounted () {
    Logger.debug('Running mounted', 'component cycle')
  },
  beforeUpdate () {
    Logger.debug('Running before Update', 'component cycle')
  },
  updated () {
    Logger.debug('Running updated', 'component cycle')
  },
  activated () {
    Logger.debug('Running activated', 'component cycle')
  },
  deactivated () {
    Logger.debug('Running deactivated', 'component cycle')
  },
  beforeUnmount () {
    Logger.debug('Running befored unmount', 'component cycle')
  },
  unmounted () {
    Logger.debug('Running unmounted', 'component cycle')
  },
  errorCaptured () {
    Logger.debug('Running error captured', 'component cycle')
  }
}
</script>
