import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { GripVertical, Trash2 } from 'lucide-react'
import { memo, useState } from 'react'
import { useSelector } from 'react-redux'

import BlockEditor from '~/features/admin/lesson/components/LessonContenBuilder/BlockEditor'
import LessonContentBuilderToolBar from '~/features/admin/lesson/components/LessonContenBuilder/LessonContentBuilderToolBar'
import { Block, DictationContent, LessonContent, QuizContent, TextContent } from '~/features/lesson/lesson.type'
import { RootState } from '~/store/store'
import { generateId } from '~/utils/generateId'

interface LessonContentBuilderProps {
  content: LessonContent
  onChangeContent: (content: LessonContent) => void
}

function createEmptyContent(type: Block['type']) {
  switch (type) {
    case 'text':
      return { html: '' }
    case 'quiz':
      return {
        title: '',
        questions: [
          {
            id: generateId('q-'),
            question: '',
            options: [
              { id: generateId('opt-'), text: '', isCorrect: false },
              { id: generateId('opt-'), text: '', isCorrect: false }
            ]
          }
        ]
      }
    case 'dictation':
      return { audioUrl: '', text: '' }
  }
}

function LessonContentBuilder({ content, onChangeContent }: LessonContentBuilderProps) {
  const userId = useSelector((state: RootState) => state.auth.id)
  const [blocks, setBlocks] = useState<Block[]>(content.blocks || [])

  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: generateId('block-'),
      type,
      order: blocks.length,
      content: createEmptyContent(type)
    }

    const newBlocks = [...blocks, newBlock]
    updateContent(newBlocks)
  }

  const handleUpdateBlock = (blockId: string, newContent: TextContent | QuizContent | DictationContent) => {
    const newBlocks = blocks.map((block) => (block.id === blockId ? { ...block, content: newContent } : block))
    updateContent(newBlocks)
  }

  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter((block) => block.id !== blockId)
    updateContent(newBlocks)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }))

    updateContent(updatedItems)
  }

  const updateContent = (newBlocks: Block[]) => {
    setBlocks(newBlocks)
    onChangeContent({
      blocks: newBlocks,
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedById: userId || 'defaultUserId'
      }
    })
  }

  return (
    <Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='blocks'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} sx={{ mb: 2 }}>
                      <CardContent>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <div {...provided.dragHandleProps}>
                            <GripVertical />
                          </div>
                          <Box flexGrow={1}>
                            <BlockEditor block={block} onChange={(content) => handleUpdateBlock(block.id, content)} />
                          </Box>
                          <IconButton onClick={() => handleDeleteBlock(block.id)}>
                            <Trash2 />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <LessonContentBuilderToolBar onAddBlock={handleAddBlock} />
    </Box>
  )
}

LessonContentBuilder.displayName = 'LessonContentBuilder'
export default memo(LessonContentBuilder)
