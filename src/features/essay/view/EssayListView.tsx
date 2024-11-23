import { ModalProvider } from '~/contexts/ModalContext'
import TableEssay from '~/features/essay/components/TableEssay'
import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'

function EssayListView() {
  return (
    <ModalProvider>
      <TableEssay />
      <FloatingVocabButton />
    </ModalProvider>
  )
}

EssayListView.displayName = 'EssayListView'
export default EssayListView
