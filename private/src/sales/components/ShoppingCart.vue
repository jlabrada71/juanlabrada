<template>
<div id="shopping-cart">
  <v-dialog
    v-model="showDialog"
    max-width="290"
  >
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <v-card-title>Product On Sale</v-card-title>
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
    <v-icon @click="addToShoppingChart(product)">add_shopping_cart</v-icon>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="hideProductDetails"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
  </div>

</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',
  props: {
    product: Object,
    showDialog: Boolean
  },
  data: () => ({
    valid: false
  }),
  methods: {
    ...mapActions(['addOrderItem']),
    addToShoppingChart (product) {
      this.addOrderItem({
        productId: product._id,
        count: 1,
        price: product.price
      })
    },
    showProductDetails () {
      this.$emit('show-product-details', this.product)
    },
    hideProductDetails () {
      this.$emit('hide-product-details')
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
