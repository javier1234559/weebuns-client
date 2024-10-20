import { ModalProvider } from '~/contexts/ModalContext'
import TableEssay from '~/features/essay/components/TableEssay'

function EssayListView() {
  return (
    <ModalProvider>
      <TableEssay />
    </ModalProvider>
  )
}

EssayListView.displayName = 'EssayListView'
export default EssayListView
