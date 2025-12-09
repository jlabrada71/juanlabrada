import { action } from '@storybook/addon-actions'
import CommentForm from './CommentForm.vue'

export default {
  title: 'comments/CommentForm',
  component: CommentForm,
  argTypes: {
    comment: {
      id: '1',
      author: 'Diego Cobian',
      email: 'diego@cobian.com',
      text: 'this is a text',
      publishDate: ''
    }
  },
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const actionsData = {
  onUpdateComment: action('updateComment'),
  onAddComment: action('addComment'),
  onCancelAddComment: action('cancelAddComment')

}

export const commentData = {

  id: '1',
  author: 'Diego Cobian',
  email: 'diego@cobian.com',
  text: 'this is a text',
  noteId: 12,
  publishDate: '',
  publishDate: new Date(2019, 0, 1, 9, 0)
}

const commentFormTemplate = '<comment-form :comment="comment" @update-comment="onUpdateComment" @add-comment="onAddComment" @cancel-add-comment="onCancelAddComment"/>'

export const Default = () => ({
  components: { CommentForm },
  template: commentFormTemplate,
  props: {
    comment: {
      default: () => commentData
    }
  },
  methods: actionsData
})
