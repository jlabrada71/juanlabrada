import { action } from '@storybook/addon-actions'
import NoteForm from './NoteForm.vue'

export default {
  title: 'note/NoteForm',
  component: NoteForm,
  argTypes: {
    note: {
      id: '1',
      title: 'Short title',
      description: 'Short description',
      text: 'this is a text',
      publishDate: ''
    }
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const actionsData = {
  onUpdateNote: action('updateNote'),
  onAddNote: action('addNote'),
  onCancelAddNote: action('cancelAddNote')

}

export const noteData = {
  id: '1',
  title: 'Short title',
  description: 'Short description',
  text: 'this is a text',
  publishDate: new Date(2019, 0, 1, 9, 0)
}

const noteFormTemplate = '<note-form :note="note" @update-note="onUpdateNote" @add-note="onAddNote" @cancel-add-note="onCancelAddNote"/>'

export const Default = () => ({
  components: { NoteForm },
  template: noteFormTemplate,
  props: {
    note: {
      default: () => noteData
    }
  },
  methods: actionsData
})
