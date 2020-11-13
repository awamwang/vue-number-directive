import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = window.genStory(
  MyExample,
  {
    minimum: -1001,
    maximum: 1000,
  },
  {
    notes: { NoteMd },
  }
)
