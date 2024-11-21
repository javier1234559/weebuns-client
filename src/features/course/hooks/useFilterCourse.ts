import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface FilterParams {
  language: string
  minLevel: string
  maxLevel: string
  courseType: string
  topics: string[]
}

const useFilterCourse = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Local states for UI
  const [filters, setFilters] = useState<FilterParams>({
    language: '',
    minLevel: '',
    maxLevel: '',
    courseType: '',
    topics: []
  })

  // Update URL and state
  const updateFilters = useCallback(
    (key: keyof FilterParams, value: string | string[] | null) => {
      const urlParams = new URLSearchParams(location.search)

      // Handle array for topics
      if (key === 'topics' && Array.isArray(value)) {
        urlParams.delete('topics') // Clear existing topics
        value.forEach((topic) => {
          if (topic) urlParams.append('topics', topic)
        })
      }
      // Handle single value params
      else if (typeof value === 'string') {
        if (value) {
          urlParams.set(key, value)
        } else {
          urlParams.delete(key)
        }
      }

      navigate({ search: urlParams.toString() })
    },
    [location.search, navigate]
  )

  // Sync URL params to state
  useEffect(() => {
    const params = new URLSearchParams(location.search)

    setFilters({
      language: params.get('language') || '',
      minLevel: params.get('minLevel') || '',
      maxLevel: params.get('maxLevel') || '',
      courseType: params.get('type') || '',
      topics: params.getAll('topics')
    })
  }, [location.search])

  const handleFilterChange = useCallback(
    (key: keyof FilterParams, value: string | string[] | null) => {
      // Update UI state
      setFilters((prev) => ({
        ...prev,
        [key]: value
      }))
      // Update URL
      updateFilters(key, value)
    },
    [updateFilters]
  )

  return {
    filters, // For UI display
    setFilter: handleFilterChange, // Function to update individual filter
    // Convenience destructured values
    language: filters.language,
    minLevel: filters.minLevel,
    maxLevel: filters.maxLevel,
    courseType: filters.courseType,
    topics: filters.topics
  }
}

export default useFilterCourse
