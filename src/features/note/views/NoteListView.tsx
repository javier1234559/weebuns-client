import { ModalProvider } from '~/contexts/ModalContext'
import NoteGridView from '~/features/note/views/NoteGridView'
import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'

function NoteListView() {
  return (
    <ModalProvider>
      <NoteGridView />
      <FloatingVocabButton />
    </ModalProvider>
  )
}

NoteListView.displayName = 'NoteListView'
export default NoteListView
