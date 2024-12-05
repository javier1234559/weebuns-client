/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Essay } from '~/services/api/api-axios'

export interface IEssay extends Essay {}

export const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Public' },
  { value: 'private', label: 'Private' }
]
