import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = window.genStory(
  MyExample,
  {
    sep: true,
  },
  {
    notes: { NoteMd },
  }
)
