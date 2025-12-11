<script setup lang="ts">
  const user = useCookie<{ name: string }>('user')
  const logins = useCookie<number>('logins')
  
  const name = ref('')

  const login = () => {
    logins.value = (logins.value || 0) + 1
    user.value = { name: name.value }
  }
  
  const logout = () => {
    user.value = null
  }
  </script>
  
  <template>
    <template v-if="user">
      <h1 class="text-3xl mb-3">
        Welcome, {{ user.name }}! 👋
      </h1>
      <div>
        <span n="green6" icon="carbon:idea" class="inline-flex">
          You have logged in <b>{{ logins }} times</b>!
        </span>
      </div>
      <div class="mt-3">
        <button n="red" icon="carbon:logout" @click="logout">
          Log out
        </button>
      </div>
    </template>
    <template v-else>
      <h1 class="text-3xl mb-3">
        Login
      </h1>
      <input type="text" v-model="name" n="lg" class="w-100 m-auto" placeholder="Enter your name..." @keypress.enter="login()" />
      <div class="mt-3">
        <button icon="carbon:user" :disabled="!name" @click="login">
          Log in
        </button>
      </div>
    </template>

  </template>
  