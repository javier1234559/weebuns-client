import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'

import AppError from '~/components/common/AppError'
import UnitForm, { UnitFormData } from '~/features/admin/course/components/CourseBuilder/UnitForm'
import { useCreateUnit, useDeleteUnit, useGetUnitById, useUpdateUnit } from '~/features/unit/hooks/useUnitQueries'
import { UnitWithLessonsDto } from '~/services/api/api-axios'

interface UnitModalProps {
  courseId: string
  unitId?: string
  nextOrderIndex?: number
  onSuccess?: (unit: UnitWithLessonsDto) => void
  onDelete?: (unitId: string) => void
  onClose: () => void
}

function UnitModal({ courseId, unitId, nextOrderIndex = 0, onSuccess, onDelete, onClose }: UnitModalProps) {
  const isEditMode = Boolean(unitId)

  const {
    data: unitData,
    isLoading: isLoadingUnit,
    error
  } = useGetUnitById(unitId!, {
    enabled: isEditMode
  })

  const createUnit = useCreateUnit()
  const updateUnit = useUpdateUnit()
  const deleteUnit = useDeleteUnit()

  const isSubmitting = createUnit.isPending || updateUnit.isPending

  const handleSubmit = async (formData: UnitFormData) => {
    try {
      if (isEditMode) {
        const updatedUnit = await updateUnit.mutateAsync({
          id: unitId!,
          data: formData
        })

        const unitWithLessonsDto: UnitWithLessonsDto = {
          id: updatedUnit.unit.id,
          courseId: updatedUnit.unit.courseId,
          title: updatedUnit.unit.title,
          orderIndex: updatedUnit.unit.orderIndex,
          lessons: updatedUnit.unit.lessons ?? [],
          isPremium: updatedUnit.unit.isPremium ?? false,
          createdBy: updatedUnit.unit.createdBy,
          createdAt: updatedUnit.unit.createdAt,
          updatedAt: updatedUnit.unit.updatedAt
        }

        onSuccess?.(unitWithLessonsDto)
      } else {
        const newUnit = await createUnit.mutateAsync({
          courseId,
          ...formData,
          orderIndex: nextOrderIndex
        })

        const unitWithLessonsDto: UnitWithLessonsDto = {
          id: newUnit.unit.id,
          courseId: newUnit.unit.courseId,
          title: newUnit.unit.title,
          orderIndex: newUnit.unit.orderIndex,
          lessons: newUnit.unit.lessons ?? [],
          isPremium: newUnit.unit.isPremium ?? false,
          createdBy: newUnit.unit.createdBy,
          createdAt: newUnit.unit.createdAt,
          updatedAt: newUnit.unit.updatedAt
        }
        onSuccess?.(unitWithLessonsDto)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save unit:', error)
      toast.error('Failed to save unit')
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const handleDelete = async () => {
    if (!unitId) return

    try {
      await deleteUnit.mutateAsync(unitId)
      toast.success('Unit deleted successfully')
      onDelete?.(unitId)
      onClose()
    } catch (error) {
      console.error('Failed to delete unit:', error)
      toast.error('Failed to delete unit')
    }
  }

  if (error) <AppError error={error} />

  // Show loading state while fetching initial data
  if (isEditMode && isLoadingUnit) {
    return (
      <Box sx={{ width: 400, p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: 400, p: 3 }}>
      <Typography variant='h6' component='h2' id='modal-title'>
        {isEditMode ? 'Edit Unit' : 'Create Unit'}
      </Typography>
      <Typography id='modal-description' sx={{ mt: 2 }}>
        <UnitForm
          isLoading={isSubmitting}
          initialData={isEditMode ? unitData?.unit : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={isEditMode ? handleDelete : undefined}
        />
      </Typography>
    </Box>
  )
}

export default UnitModal
