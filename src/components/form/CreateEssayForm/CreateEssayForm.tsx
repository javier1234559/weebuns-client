import { memo } from 'react'

interface CreateEssayFormProps {
  onSubmit: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CreateEssayForm({ onSubmit }: CreateEssayFormProps) {
  console.log('CreateEssayForm render', onSubmit)
  return <div>CreateEssayForm</div>
}

CreateEssayForm.displayName = 'CreateEssayForm'
export default memo(CreateEssayForm)
