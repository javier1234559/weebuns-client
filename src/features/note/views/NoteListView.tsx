import { ModalProvider } from '~/contexts/ModalContext'
import TableNote from '~/features/note/components/TableNote'

function NoteListView() {
  return (
    <ModalProvider>
      <TableNote />
    </ModalProvider>
  )
}

NoteListView.displayName = 'NoteListView'
export default NoteListView
