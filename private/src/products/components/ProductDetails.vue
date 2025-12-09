<template>
<div id="product-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Product Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
             <v-list-item-title class="headline mb-1">{{product.id}}</v-list-item-title>
             <v-list-item-title class="headline mb-1">{{product.name}}</v-list-item-title>
             <v-list-item-title class="headline mb-1">{{product.price}}</v-list-item-title>
             <v-list-item-title class="headline mb-1">{{product.salePrice}}</v-list-item-title>
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
  name: 'ProductDetails',
  props: {
    product: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    close () {
      this.$emit('close-product-details', this.product)
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
