import { FlashcardArray } from 'react-quizlet-flashcard'

type Flashcard = {
  id: number
  frontHTML: JSX.Element
  backHTML: JSX.Element
}

interface VocabQuizProps {
  data: Flashcard[]
  onCardChange: (id: any, index: number) => void
}

function VocabQuiz({ data, onCardChange }: VocabQuizProps) {
  return (
    <>
      <style>{`
        .FlashcardArrayWrapper {
          margin: auto;
        }
      `}</style>
      <FlashcardArray cards={data} onCardChange={onCardChange} />
    </>
  )
}

VocabQuiz.displayName = 'VocabQuiz'
export default VocabQuiz
