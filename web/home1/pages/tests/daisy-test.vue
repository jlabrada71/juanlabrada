<template>
    <DaisyuiAlert :title="title" :message="message" :show="showMessage" @close="hide"></DaisyuiAlert>

    <div class="flex flex-row gap-5">
        <button @click="show" class="bg-red-500 border border-2 p-4" >Show</button>
        <button class="bg-red-500 border border-2 p-4 hover:bg-slate-100"  @click="hide">Hide</button>
    </div>
    <input type="text" v-model="message">

    <div role="alert" class="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>New software update available.</span>
    </div>


    <div role="alert" class="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info h-6 w-6 shrink-0">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>we use cookies for no reason.</span>
      <div>
        <button class="btn btn-sm">Deny</button>
        <button class="btn btn-sm btn-primary">Accept</button>
      </div>
    </div>

    <div role="alert" class="alert shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info h-6 w-6 shrink-0">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h3 class="font-bold">New message!</h3>
        <div class="text-xs">You have 1 unread message</div>
      </div>
      <button class="btn btn-sm">See</button>
    </div>


    
</template>
<script setup>


  const message = ref('This is a simple alert');
  const title = ref('This is a simple title');

    const showMessage = ref(false);

    function show() {
        showMessage.value = true;
    }
    function hide() {
        showMessage.value = false;
    }
</script>