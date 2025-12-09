import { onMounted, onBeforeUnmount } from 'vue';
export const useEvent = (event, handler, options) => {
  // Default to targeting the window
  const {
    target = window,
    listener,
  } = options;
  onMounted(() => {
    target.addEventListener(event, handler, listener);
  });

  onBeforeUnmount(() => {
    target.removeEventListener(event, handler, listener);
  });
};