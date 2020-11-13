import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = window.genStory(
  MyExample,
  {
    schema: {
      type: 'integer',
      minimum: -2000,
      maximum: 2000,
      exclusiveMinimum: false,
      exclusiveMaximum: true,
    },
  },
  {
    notes: { NoteMd },
  }
)
