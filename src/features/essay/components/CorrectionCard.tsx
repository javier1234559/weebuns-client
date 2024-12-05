import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { AppButton } from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import { CardContent, CardHeader } from '~/components/ui/card'
import CorrectionSentence from '~/features/essay/components/CorrectionSentence'
import { CorrectionResponseOneDto } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'

interface CorrectionCardProps {
  item: CorrectionResponseOneDto
}

function CorrectionCard({ item }: CorrectionCardProps) {
  const [isShowExplain, setIsShowExplain] = useState(false)

  return (
    <Card
      sx={{
        mb: 2
      }}
    >
      <CardHeader>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            gap: 1
          }}
        >
          <Avatar
            src={item.creator?.profilePicture || ''}
            alt={item.creator?.username || ''}
            imgProps={{ referrerPolicy: 'no-referrer' }}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography>{item.creator?.username} </Typography>
            <Typography>{convertToRelativeTime(item.createdAt)} </Typography>
          </Box>
          <Box ml='auto'>
            <AppButton variant='outlined' onClick={() => setIsShowExplain(!isShowExplain)}>
              Show all Explanation
            </AppButton>
          </Box>
        </Box>
      </CardHeader>

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {item.sentences?.map((sentence) => (
            <CorrectionSentence key={sentence.id} item={sentence} isShowExplain={isShowExplain} />
          ))}
        </Box>

        <Box py={2}>
          <Divider sx={{ my: 1 }} />
          <Typography variant='h6' mb={1} fontWeight={500}>
            Overall Feedback
          </Typography>
          <Typography variant='body2'>{item.overallComment}</Typography>
        </Box>
        <Box mb={2}>
          <AppInput placeholder='Write your response...' fullWidth />
        </Box>
      </CardContent>
    </Card>
  )
}

CorrectionCard.displayName = 'CorrectionCard'
export default CorrectionCard
