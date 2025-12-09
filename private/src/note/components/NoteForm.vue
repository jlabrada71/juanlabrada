<template>
<div>
  <div id="note-form">
    <v-container>
      <v-card class="c-note-form">
        <v-card-title class="c-note-form__title">Note</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="note.id"></v-text-field>
          <v-text-field label="Title" v-model="note.title"></v-text-field>
          <v-text-field label="Image" v-model="note.image"></v-text-field>
          <v-img :src="note.image" max-width="100px"></v-img>
          <v-text-field label="SEO Description" v-model="note.seoDescription"></v-text-field>
          <v-chip  :color="seoColor">{{seoChars}}</v-chip>
          <v-textarea label="Description" v-model="note.description"></v-textarea>
          <v-textarea label="Text" v-model="note.text"></v-textarea>
          <v-text-field label="PublishDate" v-model="note.publishDate"></v-text-field>
          <v-text-field label="Rating" v-model="note.rating"></v-text-field>
          <v-text-field label="RatingCount" v-model="note.ratingCount"></v-text-field>
          <v-text-field label="Image" v-model="note.image"></v-text-field>
          <v-list shaped>
            <v-list-item-group
              v-model="note.categories"
              multiple
            >
            <v-row >
              <template v-for="(category, i) in categoryList">
                  <v-col md-4 :key="`category-${i}`">
                    <v-list-item
                      :value="category.name"
                      active-class="deep-purple--text text--accent-4"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title v-text="category.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            color="blue accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </v-col>
                </template>
              </v-row>
            </v-list-item-group>
          </v-list>
        </v-form>
      <v-card-actions class="c-note-form-actions">
        <v-btn class="success" @click="submit">{{actionText}}</v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
import CategoryRepositoryProxy from '@/categories/lib/category-repository-proxy'
import { safeUrl } from '@/lib/url-utils'

export default {
  name: 'NoteForm',
  props: {
    note: {
      type: Object,
      default () {
        return {
          title: '',
          description: '',
          seoDescription: '',
          text: '',
          rating: 0
        }
      }
    },
    isUpdating: Boolean
  },
  data: () => ({
    valid: false,
    categoryList: [],
    categories: []
  }),
  mounted () {
    this.getCategorys().then(() => { })
  },
  computed: {
    actionText () {
      return this.isUpdating ? 'Update Note' : 'Add Note'
    },
    seoChars () {
      return 140 - this.note.seoDescription.length
    },
    seoColor () {
      if (this.seoChars > 20) return 'green'
      if (this.seoChars > 10) return 'yellow'
      return 'red'
    }
  },
  methods: {
    async getCategorys () {
      const categories = await CategoryRepositoryProxy.findAll()
      this.categoryList = categories.map((category) => ({
        id: category._id,
        name: category.name,
        selected: false
      }))
      this.categoryList.sort((first, second) => {
        const nameA = first.name.toUpperCase() // ignore upper and lowercase
        const nameB = second.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    },
    submit () {
      this.note.safeUrl = safeUrl(this.note.title)
      if (this.isUpdating) {
        this.$emit('update-note', this.note)
      } else {
        this.$emit('add-note', this.note)
      }
    },
    cancel () {
      this.$emit('cancel-add-note')
    }
  }
}

</script>
<style>
c-note-form {

}

c-note-form__title {

}

c-note-form-actions {

}
</style>
