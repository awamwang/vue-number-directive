import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = window.genStory(
  MyExample,
  {
    maximum: 2000,
  },
  {
    notes: { NoteMd },
  }
)
