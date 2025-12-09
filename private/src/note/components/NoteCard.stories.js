import { action } from '@storybook/addon-actions'
import NoteCard from './NoteCard.vue'

export default {
  title: 'note/NoteCard',
  component: NoteCard,
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const actionsData = {
  onNoteDetails: action('showNote')
}

export const noteData = {
  id: '1',
  title: 'Short title',
  description: 'this is a short description',
  text: '## this is a title\nthis is below title',
  publishDate: new Date(2019, 0, 1, 9, 0)
}

const noteTemplate = '<note-card :note="note" @show-note="onNoteDetails"/>'

export const Default = () => ({
  components: { NoteCard },
  template: noteTemplate,
  props: {
    note: {
      default: () => noteData
    }
  },
  methods: actionsData
})
