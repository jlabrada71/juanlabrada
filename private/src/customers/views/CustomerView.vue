<template>
 <div class="customer">
    <CustomerDetails v-bind:customer="currentCustomer"
      v-show="isVisibleCustomerDetails"
      v-on:close-customer-details="closeCustomerDetails"/>

    <v-icon @click="showAddCustomerForm" v-show="!isVisibleCustomerForm">add_circle</v-icon>
    <CustomerForm
      v-show="isVisibleCustomerForm"
      v-bind:customer="currentCustomer"
      v-bind:is-updating="isUpdatingCustomer"
      v-on:add-customer="addCustomer"
      v-on:update-customer="updateCustomer"
      v-on:cancel-add-customer="cancelAddCustomer"/>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Customer list</h1>
    <CustomerList v-bind:customers="customers"
      v-on:show-customer="showCustomerDetails"
      v-on:edit-customer="editCustomer"
      v-on:delete-customer="deleteCustomer"/>
  </div>

</template>
<script>
import CustomerList from '@/customers/components/CustomerList.vue'
import CustomerForm from '@/customers/components/CustomerForm.vue'
import CustomerDetails from '@/customers/components/CustomerDetails.vue'
import CustomerRepositoryProxy from '@/customers/lib/customer-repository-proxy'

export default {
  name: 'Customer',

  components: {
    CustomerList,
    CustomerForm,
    CustomerDetails
  },

  data: () => ({
    customers: [],
    currentCustomer: { name: '', address: '' },
    isVisibleCustomerForm: false,
    isVisibleCustomerDetails: false,
    isUpdatingCustomer: false
  }),

  mounted () {
    this.getCustomers()
  },

  methods: {
    async getCustomers () {
      this.customers = await CustomerRepositoryProxy.findAll()
    },

    async deleteCustomer (customer) {
      await CustomerRepositoryProxy.delete(customer)
      await this.getCustomers()
    },

    async addCustomer (customer) {
      // alert(`adding customer ${JSON.stringify(customer)}`);
      await CustomerRepositoryProxy.add(customer)
      await this.getCustomers()
      this.hideCustomerForm()
    },

    async updateCustomer (customer) {
      // alert(`adding customer ${JSON.stringify(customer)}`);
      await CustomerRepositoryProxy.update(customer)
      await this.getCustomers()
      this.hideCustomerForm()
    },

    showCustomerDetails (customer) {
      this.currentCustomer = customer
      this.isVisibleCustomerDetails = true
    },

    closeCustomerDetails () {
      this.isVisibleCustomerDetails = false
    },

    editCustomer (customer) {
      this.isUpdatingCustomer = true
      this.currentCustomer = customer
      this.isVisibleCustomerForm = true
    },

    cancelAddCustomer () {
      this.hideCustomerForm()
    },

    hideCustomerForm () {
      this.isVisibleCustomerForm = false
    },

    showCustomerForm () {
      this.isVisibleCustomerForm = true
    },

    showAddCustomerForm () {
      this.isUpdatingCustomer = false
      this.currentCustomer = { name: '', address: '' }
      this.isVisibleCustomerForm = true
    }
  }
}

</script>
<style>
</style>
