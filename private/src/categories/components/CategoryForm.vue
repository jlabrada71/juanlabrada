<template>
<div>
  <div id="category-form">
    <v-container>
      <v-card class="c-category-form">
        <v-card-title class="c-category-form__title">Category</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="category.id"></v-text-field>
<v-text-field label="Name" v-model="category.name"></v-text-field>
        </v-form>
      <v-card-actions class="c-category-form-actions">
        <v-btn class="success" @click="submit">{{actionText}}</v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
import { safeUrl } from '@/lib/url-utils'

export default {
  name: 'CategoryForm',
  props: {
    category: Object,
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    actionText: 'Add Category'
  }),
  watch: {
    isUpdating (updating) {
      this.actionText = updating ? 'Update Category' : 'Add Category'
    }
  },
  methods: {
    submit () {
      this.category.safeUrl = safeUrl(this.category.name)
      if (this.isUpdating) {
        this.$emit('update-category', this.category)
      } else {
        this.$emit('add-category', this.category)
      }
    },
    cancel () {
      this.$emit('cancel-add-category')
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
