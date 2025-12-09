<template>
  <div id="order-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-card-title>Orders</v-card-title>
        <v-list :nav="nav">

          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(order, index) in orders" :key="index">
              <v-list-item-avatar v-if="avatar">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="order.id"
                      v-on:click="showOrder(order)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="order.customerId"
                      v-on:click="showOrder(order)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="order.deliveryAddress"
                      v-on:click="showOrder(order)"></v-list-item-title>
                  </v-col>

                  <v-col>
                    <v-icon v-on:click="editOrder(order)">edit</v-icon>
                    <v-icon v-on:click="deleteOrder(order)">delete</v-icon>
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
  name: 'order-list',
  props: {
    orders: Array
  },
  methods: {
    deleteOrder (order) {
      this.$emit('delete-order', order)
      // alert(`deleting ${JSON.stringify(order)}`);
    },
    editOrder (order) {
      this.$emit('edit-order', order)
      // alert(`editing ${JSON.stringify(order)}`);
    },
    showOrder (order) {
      this.$emit('show-order', order)
      // alert(`showing ${JSON.stringify(order)}`);
    }
  },
  data: () => ({
    valid: false
  })

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
