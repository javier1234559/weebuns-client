import { ModalProvider } from '~/contexts/ModalContext'
import TableVocab from '~/features/vocabulary/components/TableVocab'

function VocabView() {
  return (
    <ModalProvider>
      <TableVocab />
    </ModalProvider>
  )
}

VocabView.displayName = 'VocabView'
export default VocabView
