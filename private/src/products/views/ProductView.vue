<template>
 <div class="product">
    <ProductDetails v-bind:product="currentProduct"
      v-show="isVisibleProductDetails"
      v-on:close-product-details="closeProductDetails"/>

    <v-icon @click="showAddProductForm" v-show="!isVisibleProductForm">add_circle</v-icon>
    <ProductForm
      v-show="isVisibleProductForm"
      v-bind:product="currentProduct"
      v-bind:is-updating="isUpdatingProduct"
      v-on:add-product="addProduct"
      v-on:update-product="updateProduct"
      v-on:cancel-add-product="cancelAddProduct"/>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Product list</h1>
    <ProductList v-bind:products="products"
      v-on:show-product="showProductDetails"
      v-on:edit-product="editProduct"
      v-on:delete-product="deleteProduct"/>
  </div>

</template>
<script>
import ProductList from '@/products/components/ProductList.vue'
import ProductForm from '@/products/components/ProductForm.vue'
import ProductDetails from '@/products/components/ProductDetails.vue'
import ProductRepositoryProxy from '@/products/lib/product-repository-proxy'

export default {
  name: 'Product',

  components: {
    ProductList,
    ProductForm,
    ProductDetails
  },

  data: () => ({
    products: [],
    currentProduct: { name: '', address: '' },
    isVisibleProductForm: false,
    isVisibleProductDetails: false,
    isUpdatingProduct: false
  }),

  mounted () {
    this.getProducts()
  },

  methods: {
    async getProducts () {
      this.products = await ProductRepositoryProxy.findAll()
    },

    async deleteProduct (product) {
      await ProductRepositoryProxy.delete(product)
      await this.getProducts()
    },

    async addProduct (product) {
      // alert(`adding product ${JSON.stringify(product)}`);
      await ProductRepositoryProxy.add(product)
      await this.getProducts()
      this.hideProductForm()
    },

    async updateProduct (product) {
      // alert(`adding product ${JSON.stringify(product)}`);
      await ProductRepositoryProxy.update(product)
      await this.getProducts()
      this.hideProductForm()
    },

    showProductDetails (product) {
      this.currentProduct = product
      this.isVisibleProductDetails = true
    },

    closeProductDetails () {
      this.isVisibleProductDetails = false
    },

    editProduct (product) {
      this.isUpdatingProduct = true
      this.currentProduct = product
      this.isVisibleProductForm = true
    },

    cancelAddProduct () {
      this.hideProductForm()
    },

    hideProductForm () {
      this.isVisibleProductForm = false
    },

    showProductForm () {
      this.isVisibleProductForm = true
    },

    showAddProductForm () {
      this.isUpdatingProduct = false
      this.currentProduct = { name: '', address: '' }
      this.isVisibleProductForm = true
    }
  }
}

</script>
<style>
</style>
