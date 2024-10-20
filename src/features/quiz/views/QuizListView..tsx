import { ModalProvider } from '~/contexts/ModalContext'
import TableQuiz from '~/features/quiz/components/TabletQuiz'

function QuizListView() {
  return (
    <ModalProvider>
      <TableQuiz />
    </ModalProvider>
  )
}

QuizListView.displayName = 'QuizListView'
export default QuizListView
