import { ModalProvider } from '~/contexts/ModalContext'
import NoteGridView from '~/features/note/views/NoteGridView'

function NoteListView() {
  return (
    <ModalProvider>
      <NoteGridView />
    </ModalProvider>
  )
}

NoteListView.displayName = 'NoteListView'
export default NoteListView
