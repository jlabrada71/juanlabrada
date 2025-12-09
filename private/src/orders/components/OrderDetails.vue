<template>
<div id="order-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Order Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
             <v-list-item-title class="headline mb-1">{{order.id}}</v-list-item-title>
             <v-list-item-title class="headline mb-1">{{order.customerId}}</v-list-item-title>
             <v-list-item-title class="headline mb-1">{{order.deliveryAddress}}</v-list-item-title>

           </v-list-item-content>

           <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ></v-list-item-avatar>
         </v-list-item>
         <v-card-actions>
           <v-btn class="success" @click="close">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-container>
  </div>

</template>
<script>
export default {
  name: 'OrderDetails',
  props: {
    order: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    close () {
      this.$emit('close-order-details', this.order)
    }
  }
}

</script>
<style>
c-order-form {

}

c-order-form__title {

}

c-order-form-actions {

}
</style>
