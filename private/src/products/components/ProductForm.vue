<template>
<div>
  <div id="product-form">
    <v-container>
      <v-card class="c-product-form">
        <v-card-title class="c-product-form__title">Product</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="product.id"></v-text-field>
          <v-text-field label="Name" v-model="product.name"></v-text-field>
          <v-text-field label="Price" v-model="product.price"></v-text-field>
          <v-text-field label="SalePrice" v-model="product.salePrice"></v-text-field>
        </v-form>
      <v-card-actions class="c-product-form-actions">
        <v-btn class="success" @click="submit">{{actionText}}</v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
export default {
  name: 'ProductForm',
  props: {
    product: Object,
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    actionText: 'Add Product'
  }),
  watch: {
    isUpdating (updating) {
      this.actionText = updating ? 'Update Product' : 'Add Product'
    }
  },
  methods: {
    submit () {
      if (this.isUpdating) {
        this.$emit('update-product', this.product)
      } else {
        this.$emit('add-product', this.product)
      }
    },
    cancel () {
      this.$emit('cancel-add-product')
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
