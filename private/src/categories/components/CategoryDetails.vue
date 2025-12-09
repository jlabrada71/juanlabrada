<template>
<div id="category-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Category Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
             <v-list-item-title class="headline mb-1">{{category.id}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{category.name}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{category.address}}</v-list-item-title>

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
  name: 'CategoryDetails',
  props: {
    category: Object
  },
  data: () => ({
    valid: false
  }),
  methods: {
    close () {
      this.$emit('close-category-details', this.category)
    }
  }
}

</script>
<style>
c-category-form {

}

c-category-form__title {

}

c-category-form-actions {

}
</style>
