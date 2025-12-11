/*

how to use it:

case 1:
  with default values. When the element is visible, it will have the class .visible and when it is hidden, it will have the class .hidden

<div v-scrollanimate>
</div>


<style>
.hidden {
    opacity: 0;
    transform: translateY(100px);
    transition: all 2s ease-out;
  }
  .visible {
    opacity: 1;
    transform: translateY(0px);
  }
</style>

case 2:
  passing class values through. When the element is visible, it will have the class <visible class> and when it is hidden, it will have the <hidden> class.

  <div v-scrollanimate="{ hidden: <hidden class>, visible: <visible class> }" ></div>

  <style>
.<hidden class> {
    opacity: 0;
    transform: translateY(100px);
    transition: all 2s ease-out;
  }
  .<visible class> {
    opacity: 1;
    transform: translateY(0px);
  }
</style>

*/

export default defineNuxtPlugin( nuxtApp =>  {
  nuxtApp.vueApp.directive('scrollanimate', {
    beforeMount(el,  { value = { hidden: 'hidden', visible: 'visible' } }) {

      const animatedScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry)
            entry.target.classList.add(value.visible)
            animatedScrollObserver.unobserve(entry.target)
          }
        });
      });
  
      el.classList.add(value.hidden)
      animatedScrollObserver.observe(el)
    },

    getSSRProps (binding, vnode) {
      // server-side implementation:
      // return the props to be rendered.
      // getSSRProps only receives the directive binding.
      return {}
    }
  })
} ) 
