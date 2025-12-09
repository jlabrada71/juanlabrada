<template>
  <div class="admin">
    <div id="app-routes">
      <router-link to="/">Home</router-link> |
      <router-link to="/customers">Customers</router-link> |
      <router-link to="/notes">Notes</router-link> |
      <router-link to="/questions">Questions</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/orders">Orders</router-link> |
      <router-link to="/categorys">Categorys</router-link> |
      <router-link to="/files">Files</router-link> |
      <router-link to="/productsForSale">Products For Sale</router-link> |
       <!-- Do not remove: new entity -->
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
