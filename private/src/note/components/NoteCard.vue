<template>
  <div id="note-card">

    <v-card class="mx-auto" tile @click='showNote'>
        <v-card-title>{{note.title}}</v-card-title>
        <v-card-text><vue-markdown :source="note.description"></vue-markdown></v-card-text>
        <v-rating
          readonly
          dense
          hover
          length="5"
          size="20"
          value="3"
          v-model="note.rating"
        ></v-rating>
    </v-card>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'note-card',
  props: {
    note: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    valid: false
  }),
  components: {
    VueMarkdown
  },
  methods: {
    showNote () {
      this.$emit('show-note', this.note)
      // alert(`showing ${JSON.stringify(note)}`);
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
