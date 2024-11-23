import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'
import VocabularyManager from '~/features/vocabulary/views/VocabularyManager'

function VocabView() {
  return (
    <>
      <VocabularyManager />
      <FloatingVocabButton />
    </>
  )
}

VocabView.displayName = 'VocabView'
export default VocabView
