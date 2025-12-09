<template>
  <div id="product-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-card-title>Products</v-card-title>
        <v-list :nav="nav">

          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(product, index) in products" :key="index">
              <v-list-item-avatar v-if="avatar">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="product.id"
                      v-on:click="showProduct(product)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="product.name"
                      v-on:click="showProduct(product)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="product.price"
                      v-on:click="showProduct(product)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="product.salePrice"
                      v-on:click="showProduct(product)"></v-list-item-title>
                  </v-col>

                  <v-col>
                    <v-icon v-on:click="editProduct(product)">edit</v-icon>
                    <v-icon v-on:click="deleteProduct(product)">delete</v-icon>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
   </v-container>
  </div>

</template>
<script>
export default {
  name: 'product-list',
  props: {
    products: Array
  },
  methods: {
    deleteProduct (product) {
      this.$emit('delete-product', product)
      // alert(`deleting ${JSON.stringify(product)}`);
    },
    editProduct (product) {
      this.$emit('edit-product', product)
      // alert(`editing ${JSON.stringify(product)}`);
    },
    showProduct (product) {
      this.$emit('show-product', product)
      // alert(`showing ${JSON.stringify(product)}`);
    }
  },
  data: () => ({
    valid: false
  })

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
