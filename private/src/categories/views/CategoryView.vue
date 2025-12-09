<template>
 <div class="category">
    <CategoryDetails v-bind:category="currentCategory"
      v-show="isVisibleCategoryDetails"
      v-on:close-category-details="closeCategoryDetails"/>

    <v-icon @click="showAddCategoryForm" v-show="!isVisibleCategoryForm">add_circle</v-icon>
    <CategoryForm
      v-show="isVisibleCategoryForm"
      v-bind:category="currentCategory"
      v-bind:is-updating="isUpdatingCategory"
      v-on:add-category="addCategory"
      v-on:update-category="updateCategory"
      v-on:cancel-add-category="cancelAddCategory"/>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Category list</h1>
    <CategoryList v-bind:categorys="categorys"
      v-on:show-category="showCategoryDetails"
      v-on:edit-category="editCategory"
      v-on:delete-category="deleteCategory"/>
  </div>

</template>
<script>
import CategoryList from '@/categories/components/CategoryList.vue'
import CategoryForm from '@/categories/components/CategoryForm.vue'
import CategoryDetails from '@/categories/components/CategoryDetails.vue'
import CategoryRepositoryProxy from '@/categories/lib/category-repository-proxy'

export default {
  name: 'Category',

  components: {
    CategoryList,
    CategoryForm,
    CategoryDetails
  },

  data: () => ({
    categorys: [],
    currentCategory: { name: '', address: '' },
    isVisibleCategoryForm: false,
    isVisibleCategoryDetails: false,
    isUpdatingCategory: false
  }),

  mounted () {
    this.getCategorys()
  },

  methods: {
    async getCategorys () {
      this.categorys = await CategoryRepositoryProxy.findAll()
    },

    async deleteCategory (category) {
      await CategoryRepositoryProxy.delete(category)
      await this.getCategorys()
    },

    async addCategory (category) {
      // alert(`adding category ${JSON.stringify(category)}`);
      await CategoryRepositoryProxy.add(category)
      await this.getCategorys()
      this.hideCategoryForm()
    },

    async updateCategory (category) {
      // alert(`adding category ${JSON.stringify(category)}`);
      await CategoryRepositoryProxy.update(category)
      await this.getCategorys()
      this.hideCategoryForm()
    },

    showCategoryDetails (category) {
      this.currentCategory = category
      this.isVisibleCategoryDetails = true
    },

    closeCategoryDetails () {
      this.isVisibleCategoryDetails = false
    },

    editCategory (category) {
      this.isUpdatingCategory = true
      this.currentCategory = category
      this.isVisibleCategoryForm = true
    },

    cancelAddCategory () {
      this.hideCategoryForm()
    },

    hideCategoryForm () {
      this.isVisibleCategoryForm = false
    },

    showCategoryForm () {
      this.isVisibleCategoryForm = true
    },

    showAddCategoryForm () {
      this.isUpdatingCategory = false
      this.currentCategory = { name: '', address: '' }
      this.isVisibleCategoryForm = true
    }
  }
}

</script>
<style>

</style>
