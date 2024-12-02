import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ChevronDown, GraduationCap, Lock } from 'lucide-react'
import { useState } from 'react'

import { Unit } from '~/services/api/api-axios'

interface UnitAccordionProps {
  units: Unit[]
}

const UnitAccordion = ({ units }: UnitAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{ py: 2 }}>
      {units.map((unit, unitIndex) => (
        <Accordion
          key={unit.id}
          expanded={expanded === unit.id}
          onChange={handleChange(unit.id)}
          sx={{
            '&:before': { display: 'none' },
            borderRadius: 2,
            bgcolor: 'transparent',
            mb: 2
          }}
        >
          <AccordionSummary
            expandIcon={
              <ChevronDown
                style={{
                  transform: expanded === unit.id ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s'
                }}
              />
            }
            sx={{
              p: 0,
              minHeight: 'unset',
              borderRadius: 2,
              '& .MuiAccordionSummary-content': {
                m: 0
              }
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <Typography variant='body1'>{unitIndex + 1}</Typography>
              </Box>

              <Typography
                variant='subtitle1'
                sx={{
                  flex: 1,
                  fontWeight: 500
                }}
              >
                {unit.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GraduationCap size={20} />
                {unit.isPremium && (
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}
                  >
                    Premium
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, mt: 1 }}>
            {unit.lessons?.map((lesson, lessonIndex) => (
              <Box
                key={lesson.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  pl: 7,
                  borderRadius: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'background.default',
                    borderRadius: 0,
                    transition: 'background-color ease-in 0.1s'
                  }
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    flex: 1,
                    color: 'text.secondary'
                  }}
                >
                  {`${unitIndex + 1}.${lessonIndex + 1} ${lesson.title}`}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {lesson.isPremium && (
                    <>
                      <Lock size={16} />
                      <Box
                        sx={{
                          bgcolor: 'success.main',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        Premium
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default UnitAccordion
