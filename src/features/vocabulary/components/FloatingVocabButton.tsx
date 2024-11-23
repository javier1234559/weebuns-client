import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { Book } from 'lucide-react'
import { useState } from 'react'

import VocabTabView from '~/features/vocabulary/views/VocabTabView'

const FloatingVocabButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Backdrop open={isOpen} onClick={() => setIsOpen(false)} sx={{ zIndex: 9999 }} />
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999
        }}
      >
        <Tooltip title={isOpen ? 'Open Dictionary' : 'Hide Dictionary'} placement='left'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Fab
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                boxShadow: 3,
                borderRadius: '50% !important'
              }}
            >
              <Book size={24} color='#888' />
            </Fab>
          </motion.div>
        </Tooltip>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                duration: 0.5
              }}
              style={{
                position: 'absolute',
                bottom: '100%',
                right: 0,
                marginBottom: '16px',
                minWidth: 400,
                maxWidth: 600,
                transformOrigin: 'bottom right'
              }}
            >
              <Box
                sx={{
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  boxShadow: 3,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.2)',
                    borderRadius: '4px'
                  }
                }}
              >
                <VocabTabView />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  )
}

export default FloatingVocabButton
