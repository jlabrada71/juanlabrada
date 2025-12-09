<template>
  <div class="note-list">

    <v-row justify="center">
    <v-dialog
      v-model="showSelectedNote"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <NoteDetailsWithComments v-bind:note="currentNote"
      v-on:close-note-details="closeNoteDetails"/>

    </v-dialog>
  </v-row>
    <v-container class="grey lighten-5">
      <v-layout wrap>
        <v-flex my-2 mx-2 xs12 md12 v-for="(note, index) in notes" :key="index">
          <note-card :note="note" @show-note="showNoteDetails"></note-card>
        </v-flex>
      </v-layout>
   </v-container>
  </div>
</template>
<script>
import NoteCard from './NoteCard.vue'
import NoteDetailsWithComments from './NoteDetailsWithComments.vue'

export default {
  name: 'note-card-list',
  props: {
    notes: Array
  },
  data: () => ({
    showSelectedNote: false,
    currentNote: null,
    valid: false
  }),
  components: {
    NoteCard,
    NoteDetailsWithComments
  },
  methods: {
    deleteNote (note) {
      this.$emit('delete-note', note)
      // alert(`deleting ${JSON.stringify(note)}`);
    },
    editNote (note) {
      this.$emit('edit-note', note)
      // alert(`editing ${JSON.stringify(note)}`);
    },
    showNoteDetails (note) {
      this.showSelectedNote = true
      this.currentNote = note
      // alert(`showing ${JSON.stringify(note)}`);
    },
    closeNoteDetails () {
      // alert('closing');
      this.showSelectedNote = false
      this.currentNote = null
      // alert(`showing ${JSON.stringify(note)}`);
    }
  }
}
</script>
<style lang="sass" >
c-note-form

c-note-form__title

c-note-form-actions

.note-list
  @extends ma-3

</style>
