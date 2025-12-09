<template>
<div id="delivery-address">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Delivery Address</v-card-title>
             <v-form>
               <v-text-field label="CustomerId" v-model="address.customerId"></v-text-field>
               <v-text-field label="Address" v-model="address.address"></v-text-field>
               <v-text-field label="Postal Code" v-model="address.postalCode"></v-text-field>
             </v-form>
           <v-card-actions class="c-order-form-actions">
             <v-btn class="success" @click="saveDeliveryAddress">{{actionText}}</v-btn>
           </v-card-actions>
         </v-card>
        </v-container>
  </div>

</template>
<script>
export default {
  name: 'DeliveryAddress',
  props: {
    address: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    saveDeliveryAddress () {
      this.$emit('save-delivery-address', this.address)
    }
  }
}

</script>
<style>
c-product-form {

}

c-product-form__title {

}

c-product-form-actions {

}

</style>
