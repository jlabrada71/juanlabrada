<template>
 <div class="order">
    <OrderDetails v-bind:order="currentOrder"
      v-show="isVisibleOrderDetails"
      v-on:close-order-details="closeOrderDetails"/>

    <v-icon @click="showAddOrderForm" v-show="!isVisibleOrderForm">add_circle</v-icon>
    <OrderForm
      v-show="isVisibleOrderForm"
      v-bind:order="currentOrder"
      v-bind:is-updating="isUpdatingOrder"
      v-on:add-order="addOrder"
      v-on:update-order="updateOrder"
      v-on:cancel-add-order="cancelAddOrder"/>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Order list</h1>
    <OrderList v-bind:orders="orders"
      v-on:show-order="showOrderDetails"
      v-on:edit-order="editOrder"
      v-on:delete-order="deleteOrder"/>
  </div>

</template>
<script>
import OrderList from '@/orders/components/OrderList.vue'
import OrderForm from '@/orders/components/OrderForm.vue'
import OrderDetails from '@/orders/components/OrderDetails.vue'
import OrderRepositoryProxy from '@/orders/lib/order-repository-proxy'

export default {
  name: 'Order',

  components: {
    OrderList,
    OrderForm,
    OrderDetails
  },

  data: () => ({
    orders: [],
    currentOrder: { name: '', address: '' },
    isVisibleOrderForm: false,
    isVisibleOrderDetails: false,
    isUpdatingOrder: false
  }),

  mounted () {
    this.getOrders()
  },

  methods: {
    async getOrders () {
      this.orders = await OrderRepositoryProxy.findAll()
    },

    async deleteOrder (order) {
      await OrderRepositoryProxy.delete(order)
      await this.getOrders()
    },

    async addOrder (order) {
      // alert(`adding order ${JSON.stringify(order)}`);
      await OrderRepositoryProxy.add(order)
      await this.getOrders()
      this.hideOrderForm()
    },

    async updateOrder (order) {
      // alert(`adding order ${JSON.stringify(order)}`);
      await OrderRepositoryProxy.update(order)
      await this.getOrders()
      this.hideOrderForm()
    },

    showOrderDetails (order) {
      this.currentOrder = order
      this.isVisibleOrderDetails = true
    },

    closeOrderDetails () {
      this.isVisibleOrderDetails = false
    },

    editOrder (order) {
      this.isUpdatingOrder = true
      this.currentOrder = order
      this.isVisibleOrderForm = true
    },

    cancelAddOrder () {
      this.hideOrderForm()
    },

    hideOrderForm () {
      this.isVisibleOrderForm = false
    },

    showOrderForm () {
      this.isVisibleOrderForm = true
    },

    showAddOrderForm () {
      this.isUpdatingOrder = false
      this.currentOrder = { name: '', address: '' }
      this.isVisibleOrderForm = true
    }
  }
}

</script>
<style>
</style>
