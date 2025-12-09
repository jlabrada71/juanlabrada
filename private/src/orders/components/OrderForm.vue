<template>
<div>
  <div id="order-form">
    <v-container>
      <v-card class="c-order-form">
        <v-card-title class="c-order-form__title">Order</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="order.id"></v-text-field>
          <v-text-field label="CustomerId" v-model="order.customerId"></v-text-field>
          <v-text-field label="DeliveryAddress" v-model="order.deliveryAddress"></v-text-field>
        </v-form>
      <v-card-actions class="c-order-form-actions">
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
  name: 'OrderForm',
  props: {
    order: Object,
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    actionText: 'Add Order'
  }),
  watch: {
    isUpdating (updating) {
      this.actionText = updating ? 'Update Order' : 'Add Order'
    }
  },
  methods: {
    submit () {
      if (this.isUpdating) {
        this.$emit('update-order', this.order)
      } else {
        this.$emit('add-order', this.order)
      }
    },
    cancel () {
      this.$emit('cancel-add-order')
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
