<template>
  <div id="note-list">
      <v-card
        class="mx-auto"
        max-width="800"
        tile
      >
      <v-card-title>Notes</v-card-title>
        <v-list>

          <v-list-item-group color="primary">
            <v-container>
            <v-list-item v-for="(note, index) in notes" :key="index">
              <v-list-item-content>
                <v-row>
                  <v-col cols="6">
                    <v-list-item-title v-html="note.title"
                      v-on:click="showNote(note)"></v-list-item-title>
                  </v-col>
                  <v-col cols="1">
                    <v-list-item-title v-html="note.publishDate"
                      v-on:click="showNote(note)"></v-list-item-title>
                  </v-col>
                  <v-col cols="1">
                    <v-list-item-title v-html="note.rating"
                      v-on:click="showNote(note)"></v-list-item-title>
                  </v-col>
                  <v-col cols="1">
                    <v-list-item-title v-html="note.ratingCount"
                      v-on:click="showNote(note)"></v-list-item-title>
                  </v-col>
                  <v-col cols="3">
                    <v-icon v-on:click="editNote(note)">edit</v-icon>
                    <v-icon v-on:click="deleteNote(note)">delete</v-icon>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            </v-container>
          </v-list-item-group>
        </v-list>
      </v-card>
  </div>

</template>
<script>
export default {
  name: 'note-list',
  props: {
    notes: Array
  },
  methods: {
    deleteNote (note) {
      this.$emit('delete-note', note)
    },
    editNote (note) {
      this.$emit('edit-note', note)
    },
    showNote (note) {
      this.$emit('show-note', note)
    }
  },
  data: () => ({
    valid: false
  })

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
