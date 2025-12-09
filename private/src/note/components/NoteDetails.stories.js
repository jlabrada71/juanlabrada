import { action } from '@storybook/addon-actions'
import NoteDetails from './NoteDetails.vue'

export default {
  title: 'note/NoteDetails',
  component: NoteDetails,
  argTypes: {
    note: {
      id: '1',
      title: 'Short title',
      text: 'this is a text',
      publishDate: ''
    }
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const actionsData = {
  onNoteDetails: action('onClose')
}

export const noteData = {
  id: '1',
  title: 'Short title',
  text: 'this is a text',
  publishDate: new Date(2019, 0, 1, 9, 0)
}

const noteTemplate = '<note-details :note="note" @close-note-details="onNoteDetails"/>'

export const Default = () => ({
  components: { NoteDetails },
  template: noteTemplate,
  props: {
    note: {
      default: () => noteData
    }
  },
  methods: actionsData
})
