<template>
  <div class="showProductsForSale">
    <ProductForSaleDetails v-bind:product="currentProduct"
                            v-bind:showDialog="showDialog"
                            v-on:hide-product-details="hideProductDetails">
    </ProductForSaleDetails>

    <li v-for="product in products" v-bind:key="product.id">
       <ProductForSale @click.native="showProductDetails(product)" v-bind:product="product"/>
    </li>

  </div>

</template>
<script>
import ProductForSale from '@/sales/components/ProductForSale.vue'
import ProductForSaleDetails from '@/sales/components/ProductForSaleDetails.vue'
import ProductRepositoryProxy from '@/products/lib/product-repository-proxy'

export default {
  name: 'ProductsForSale',

  components: {
    ProductForSale,
    ProductForSaleDetails
  },

  data: () => ({
    products: [],
    currentProduct: { name: '', address: '' },
    isVisibleProductForm: false,
    isVisibleProductDetails: false,
    isUpdatingProduct: false,
    showDialog: false
  }),

  mounted () {
    this.getProducts()
  },

  methods: {
    async getProducts () {
      this.products = await ProductRepositoryProxy.findAll()
    },

    async addToShoppingChart (product) {
      // alert(`adding product ${JSON.stringify(product)}`);
      // await ProductRepositoryProxy.add(product);
      alert(`added ${product.name}`)
      // await this.getProducts();
      // this.hideProductForm();
    },

    showProductDetails (product) {
      this.currentProduct = product
      this.showDialog = true
    },
    hideProductDetails () {
      this.showDialog = false
    },
    closeProductDetails () {
      this.isVisibleProductDetails = false
    }
  }
}

</script>
<style>
</style>
