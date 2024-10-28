/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Essay } from '~/services/api/api-axios'

export interface User {
  id: string
  name: string
  avatar: string
}

export interface IFeed {
  id: string
  title: string
  lang: string
  thumbnail: string
  excerpt: string
  createdAt: string
  like: number
  comment: number
  user: User
}
