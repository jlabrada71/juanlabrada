<template>
  <div id="category-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-card-title>Categorys</v-card-title>
        <v-list>

          <v-list-item-group color="primary">
            <v-list-item v-for="(category, index) in categorys" :key="index">
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <v-list-item-title v-html="category.id"
                      v-on:click="showCategory(category)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="category.name"
                      v-on:click="showCategory(category)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-list-item-title v-html="category.address"
                      v-on:click="showCategory(category)"></v-list-item-title>
                  </v-col>
                  <v-col>
                    <v-icon v-on:click="editCategory(category)">edit</v-icon>
                    <v-icon v-on:click="deleteCategory(category)">delete</v-icon>
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
  name: 'category-list',
  props: {
    categorys: Array
  },
  methods: {
    deleteCategory (category) {
      this.$emit('delete-category', category)
      // alert(`deleting ${JSON.stringify(category)}`);
    },
    editCategory (category) {
      this.$emit('edit-category', category)
      // alert(`editing ${JSON.stringify(category)}`);
    },
    showCategory (category) {
      this.$emit('show-category', category)
      // alert(`showing ${JSON.stringify(category)}`);
    }
  },
  data: () => ({
    valid: false
  })

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
