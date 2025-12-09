<template>
 <div class="notes">
   <v-btn block
          text
          :ripple="false"
          elevation="0"
          v-show="isWaiting">
     <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular></v-btn>
    <NoteDetails v-bind:note="currentNote"
      v-show="isVisibleNoteDetails"
      v-on:close-note-details="closeNoteDetails"/>

    <v-icon @click="showAddNoteForm" v-show="!isVisibleNoteForm">add_circle</v-icon>
    <v-container>
      <v-row>
        <v-col>
    <NoteForm
      v-show="isVisibleNoteForm"
      v-bind:note="currentNote"
      v-bind:is-updating="isUpdatingNote"
      v-on:add-note="addNote"
      v-on:update-note="updateNote"
      v-on:cancel-add-note="cancelAddNote"/>
        </v-col>
      </v-row>
      </v-container>
    <h1 class="display-2 blue darken-4 white--text text--lighten-1">Note list</h1>
    <NoteList v-bind:notes="notes"
      v-on:show-note="showNoteDetails"
      v-on:edit-note="editNote"
      v-on:delete-note="deleteNote"/>
  </div>

</template>
<script>
import Note from '@/note/lib/note'
import NoteList from '@/note/components/NoteList.vue'
import NoteForm from '@/note/components/NoteForm.vue'
import NoteDetails from '@/note/components/NoteDetails.vue'
import NoteRepositoryProxy from '@/note/lib/note-repository-proxy'

export default {
  name: 'NoteView',

  components: {
    NoteList,
    NoteForm,
    NoteDetails
  },

  data: () => ({
    isWaiting: false,
    notes: [],
    currentNote: {
      title: '',
      description: '',
      seoDescription: '',
      text: '',
      rating: 0
    },
    isVisibleNoteForm: false,
    isVisibleNoteDetails: false,
    isUpdatingNote: false
  }),

  mounted () {
    this.currentNote = new Note()
    this.getNotes()
  },

  methods: {
    async getNotes () {
      this.isWaiting = true
      this.notes = await NoteRepositoryProxy.findAll()
      this.isWaiting = false
    },

    async deleteNote (note) {
      this.isWaiting = true
      await NoteRepositoryProxy.delete(note)
      await this.getNotes()
      this.isWaiting = false
    },

    async addNote (note) {
      this.isWaiting = true
      await NoteRepositoryProxy.add(note)
      await this.getNotes()
      this.isWaiting = false
      this.hideNoteForm()
    },

    async updateNote (note) {
      this.isWaiting = true
      await NoteRepositoryProxy.update(note)
      await this.getNotes()
      this.isWaiting = false
      this.hideNoteForm()
    },

    showNoteDetails (note) {
      this.currentNote = note
      this.isVisibleNoteDetails = true
    },

    closeNoteDetails () {
      this.isVisibleNoteDetails = false
    },

    editNote (note) {
      this.isUpdatingNote = true
      this.currentNote = note
      this.isVisibleNoteForm = true
    },

    cancelAddNote () {
      this.hideNoteForm()
    },

    hideNoteForm () {
      this.isVisibleNoteForm = false
    },

    showNoteForm () {
      this.isVisibleNoteForm = true
    },

    showAddNoteForm () {
      this.isUpdatingNote = false
      this.currentNote = new Note()
      this.isVisibleNoteForm = true
    }
  }
}

</script>
<style>
</style>
