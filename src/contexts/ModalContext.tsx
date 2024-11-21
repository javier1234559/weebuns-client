/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface ModalContextType {
  openModal: (ModalComponent: React.ComponentType<any>, props?: any) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalStackItem {
  ModalComponent: React.ComponentType<any>
  props: unknown
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  width: {
    xs: '100%',
    sm: '800px'
  },
  maxWidth: 'calc(100% - 32px)', // Giới hạn maxWidth để tạo margin
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden',
  p: 0
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([])

  const openModal = useCallback((ModalComponent: React.ComponentType<any>, props = {}) => {
    setModalStack((prevStack) => [...prevStack, { ModalComponent, props }])
  }, [])

  const closeModal = useCallback(() => {
    setModalStack((prevStack) => prevStack.slice(0, -1))
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalStack.map(({ ModalComponent, props }, index) => (
        <Modal
          key={index}
          open={true}
          onClose={closeModal}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <Box sx={modalStyle}>
            <Box
              sx={{
                overflow: 'auto', // Enable scrolling for content
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <ModalComponent {...(props as object)} onClose={closeModal} />
            </Box>
          </Box>
        </Modal>
      ))}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
