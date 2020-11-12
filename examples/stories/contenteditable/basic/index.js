import MyExample from './MyExample'
import NoteMd from './Note.md'
import genStory from '../../basic-story'

export const Story = genStory(
  MyExample,
  {},
  {
    notes: { NoteMd },
  }
)
