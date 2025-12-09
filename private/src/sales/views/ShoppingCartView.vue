<template>
  <div class="shopping-cart">
    <DeliveryAddress v-bind:address="deliveryAddress"
      v-on:save-delivery-address="saveDeliveryAddress">
    </DeliveryAddress>
    <button @click='saveOrder'>Save Order</button>
    <div id="paypal-button-container"></div>
    <span>{{totalAmount}}</span>
    <span>{{invoiceNumber}}</span>

    <!-- https://www.npmjs.com/package/vue-paypal-checkout -->
    <PayPal
      v-bind:amount="totalAmount"
      currency="USD"
      :client="paypal"
      v-bind:env="paypalEnv"
      v-bind:invoice-number="invoiceNumber"
      >
    </PayPal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PayPal from 'vue-paypal-checkout'
import OrderRepositoryProxy from '@/orders/lib/order-repository-proxy'
import DeliveryAddress from '@/sales/components/DeliveryAddress.vue'

export default {
  name: 'ShoppingCartView',

  components: {
    DeliveryAddress,
    PayPal
  },

  data: () => ({
    deliveryAddress: {
      address: ''
    },
    totalAmount: 0,
    invoiceNumber: 0,
    paypalEnv: 'sandbox', // production
    paypal: {
      sandbox: 'AfcSqEWnTBPSLbR7FjGUD2rctfWqSAZ3Np1THUDm9K22WRq8cMX8vLRdS_d2As1aRaMWM-y-t4nJZah4',
      production: ' production client id (get from config file, the same for sandbox)'
    }
  }),
  mounted () {

  },

  methods: {
    ...mapGetters(['shoppingCart']),
    ...mapActions([]),
    saveDeliveryAddress (address) {
      this.deliveryAddress = address
    },
    async saveOrder () {
      const order = this.shoppingCart()
      this.totalAmount = order.total()
      this.invoiceNumber = order.id
      order.address = this.deliveryAddress
      alert(`adding order ${JSON.stringify(order)}`)
      await OrderRepositoryProxy.add(order)
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
