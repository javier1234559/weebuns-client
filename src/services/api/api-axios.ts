/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export type DeleteResponseDto = object

export interface UserLanguage {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  user_id: string
  /** @example "English" */
  language: string
  /** @example "Intermediate" */
  proficiency_level: string
  /** @example false */
  is_native: boolean
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
}

export interface Follower {
  /** @example 1 */
  id: string
  /** @example 1 */
  id_follower: string
  /** @example 2 */
  id_following: string
  /** @format date-time */
  followed_at: string
  follower: User | null
  following: User | null
}

export interface Space {
  /** @example 1 */
  id: string
  /** @example "English Learning Space" */
  name: string
  /** @example "A space for learning English" */
  description: string | null
  /** @example 1 */
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  /** @example {"essays":0,"quizzes":0,"vocabularies":0} */
  _count: {
    /** @example 0 */
    essays?: number
    /** @example 0 */
    quizzes?: number
    /** @example 0 */
    vocabularies?: number
  }
}

export interface CorrectionSentence {
  /** @example "uuid" */
  id: string
  /** @example "uuid" */
  id_correction: string
  /** @example 0 */
  index: number
  /** @example "Original text" */
  original_text: string
  /** @example "Corrected text" */
  corrected_text: string
  /** @example "Explanation of corrections" */
  explanation: string
  /** @example false */
  is_correct: boolean
  /** @example 4 */
  rating: number
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  created_at: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  updated_at: string
  correction: Correction | null
}

export interface CorrectionReply {
  /** @example 1 */
  id: string
  /**
   * ID of the related correction
   * @example 1
   */
  correction_id: string
  /**
   * Reply comment to the correction
   * @example "Great improvement on your grammar!"
   */
  comment: string
  /**
   * User ID who created the reply
   * @example 1
   */
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  creator: User | null
}

export interface Correction {
  /** @example 1 */
  id: string
  /**
   * ID of the essay being corrected
   * @example 1
   */
  essay_id: string
  /**
   * Overall feedback for the essay
   * @example "Good structure but needs work on tenses"
   */
  overall_comment: string | null
  /**
   * Rating score for the essay
   * @min 0
   * @max 10
   * @example 8
   */
  rating: number | null
  /**
   * User ID who created the correction
   * @example 1
   */
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  essay: Essay | null
  creator: User | null
  sentences: CorrectionSentence[] | null
  replies: CorrectionReply[] | null
}

export interface HashtagCount {
  /** @example 5 */
  essays: number
}

export interface Hashtag {
  /** @example 1 */
  id: string
  /** @example "grammar" */
  name: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  created_at: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  updated_at: string
  essays: EssayHashtag[] | null
  _count: HashtagCount | null
}

export interface EssayHashtag {
  /**
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string
  /**
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  essay_id: string
  /**
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  hashtag_id: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  created_at: string
  essay?: Essay | null
  hashtag?: Hashtag | null
}

export interface Essay {
  /** @example 1 */
  id: string
  /** @example 1 */
  id_space: string
  /** @example "My First Essay" */
  title: string
  /** @example "A brief summary" */
  summary: string | null
  /** @example "Essay content..." */
  content: string
  /** @example 0 */
  upvote_count: number
  /** @example "https://example.com/cover.jpg" */
  cover_url: string | null
  /** @example "draft" */
  status: 'draft' | 'public' | 'private' | 'deleted'
  /** @example "en" */
  language: string
  /** @example 1 */
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  space: Space | null
  author: User | null
  corrections: Correction[] | null
  /** Associated hashtags for this essay */
  hashtags: EssayHashtag[] | null
}

export interface User {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string
  /** @example "johndoe" */
  username: string | null
  /** @example "john@example.com" */
  email: string
  password_hash: string | null
  /** @example "user" */
  role: 'user' | 'admin'
  /** @example "local" */
  auth_provider: 'local' | 'google' | 'facebook'
  auth_provider_id: string | null
  /** @example "John" */
  first_name: string | null
  /** @example "Doe" */
  last_name: string | null
  /** @example "https://example.com/avatar.jpg" */
  profile_picture: string | null
  /** @example false */
  is_email_verified: boolean
  /** @format date-time */
  last_login: string | null
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  languages: UserLanguage[] | null
  followedBy: Follower[] | null
  following: Follower[] | null
  spaces: Space[] | null
  essays: Essay[] | null
}

export interface PaginationOutputDto {
  /**
   * Total number of items
   * @example 100
   */
  totalItems: number
  /**
   * Current page number
   * @example 1
   */
  currentPage: number
  /**
   * Total number of pages
   * @example 10
   */
  totalPages: number
  /**
   * Number of items per page
   * @example 10
   */
  itemsPerPage: number
  /**
   * Indicates if there is a next page
   * @example true
   */
  hasNextPage: boolean
  /**
   * Indicates if there is a previous page
   * @example false
   */
  hasPreviousPage: boolean
}

export interface UsersResponse {
  users: User[]
  pagination: PaginationOutputDto
}

export interface UserResponse {
  user: User
}

export interface CreateUserDto {
  last_name: string
  first_name: string
  username: string
  email: string
  password: string
  profile_picture: string
  role: 'user' | 'admin'
  auth_provider: 'local' | 'google' | 'facebook'
}

export interface CreateUserResponse {
  user: User
}

export interface UpdateUserDto {
  last_name?: string
  first_name?: string
  username?: string
  email?: string
  profile_picture?: string
  role?: 'user' | 'admin'
  auth_provider?: 'local' | 'google' | 'facebook'
  id: number | null
}

export interface UpdateUserResponse {
  user: User
}

export interface DeleteUserResponse {
  user: User
}

export interface RegisterDto {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserRegisterResponse {
  access_token: string
  user: User
}

export interface LoginDto {
  email: string
  password: string
}

export interface UserLoginResponse {
  access_token: string
  user: User
}

export interface LoginGoogleDto {
  accessToken: string
}

export interface LoginFacebookDto {
  accessToken: string
}

export interface UserRefreshTokenResponse {
  access_token: string
  refresh_token: string
}

export interface LogoutResponse {
  message: string
}

export interface SpacesResponse {
  data: Space[]
  pagination: PaginationOutputDto
}

export interface FindOneSpaceResponseDto {
  space: Space
}

export interface CreateSpaceDto {
  name: string
  description: string
  created_by: string
}

export interface CreateSpaceResponseDto {
  id: string
  name: string
  description: string
  essay_number: number
  quiz_number: number
  vocab_number: number
}

export interface UpdateSpaceDto {
  name?: string
  description?: string
}

export interface UpdateSpaceResponseDto {
  id: string
  name: string
  description: string
  essay_number: number
  quiz_number: number
  vocab_number: number
}

export interface DeleteSpaceResponseDto {
  space: Space
}

export interface EssaysResponse {
  data: Essay[]
  pagination: PaginationOutputDto
}

export interface FindOneEssayResponseDto {
  essay: Essay
}

export enum EssayStatus {
  Draft = 'draft',
  Public = 'public',
  Private = 'private',
  Deleted = 'deleted'
}

export interface CreateEssayDto {
  /** @example "My Journey Learning English" */
  title: string
  summary?: string | null
  /** @example "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..." */
  content: string
  /**
   * @pattern ^https?://
   * @example "https://example.com/images/cover-123.jpg"
   */
  cover_url?: string | null
  /** @example "public" */
  status: EssayStatus
  /**
   * @minLength 2
   * @maxLength 5
   * @example "en"
   */
  language: string
  /** @example "123e4567-e89b-12d3-a456-426614174000" */
  spaceId: string
  /** @example ["english","travel"] */
  hashtag_names?: string[]
}

export interface CreateEssayResponseDto {
  /** @example "123e4567-e89b-12d3-a456-426614174000" */
  id?: string
  /** @example "123e4567-e89b-12d3-a456-426614174000" */
  id_space?: string
  /** @example "Updated: My Journey Learning English" */
  title?: string
  /** @example "Updated summary of my language learning experience" */
  summary?: string | null
  /**
   * @minLength 1
   * @example "Updated content: Lorem ipsum dolor sit amet..."
   */
  content?: string
  /**
   * @min 0
   * @example 42
   */
  upvote_count?: number
  /**
   * @pattern ^https?://
   * @example "https://example.com/images/updated-cover-123.jpg"
   */
  cover_url?: string | null
  /** @example "public" */
  status?: string
  /**
   * @minLength 2
   * @maxLength 5
   * @example "en"
   */
  language?: string
  /** Author */
  author?: User
  hashtags?: any[][]
}

export interface UpdateEssayDto {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Updated: My Journey Learning English"
   */
  title?: string
  /** @example "Updated summary of my language learning experience" */
  summary?: string | null
  /**
   * @minLength 1
   * @example "Updated content: Lorem ipsum dolor sit amet..."
   */
  content?: string
  /**
   * @min 0
   * @example 42
   */
  upvote_count?: number
  /**
   * @pattern ^https?://
   * @example "https://example.com/images/updated-cover-123.jpg"
   */
  cover_url?: string | null
  /** @example "public" */
  status?: EssayStatus
  /**
   * @minLength 2
   * @maxLength 5
   * @example "en"
   */
  language?: string
  hashtag_names?: any[][]
}

export interface UpdateEssayResponseDto {
  essay: Essay
}

export interface DeleteEssayResponseDto {
  essay: Essay
}

export type CreateVocabularyDto = object

export type FlashCard = object

export interface CreateVocabularyResponseDto {
  id: string
  image_url?: string
  word: string
  part_of_speech?: string
  definition?: string
  pronunciation?: string
  example?: string
  reference_link?: string
  id_essay_link?: string
  id_space?: string
  mastery_level?: string
  is_need_review?: boolean
  next_review_date?: string
  ease_factor?: number
  interval?: number
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  creator?: User
  space?: Space
  flash_cards?: FlashCard[]
}

export interface FindAllVocabularyDto {
  /** @default 1 */
  page?: number
  /** @default 10 */
  perPage?: number
  search?: string
}

export interface Vocabulary {
  /** @example "123e4567-e89b-12d3-a456-426614174000" */
  id: string
  /** @example "https://example.com/images/word.jpg" */
  image_url: string | null
  /** @example "ephemeral" */
  word: string
  /** @example "adjective" */
  part_of_speech: string
  /** @example "Lasting for a very short time" */
  definition: string
  /** @example "ih-fem-er-uhl" */
  pronunciation: string
  /** @example "The ephemeral nature of fashion trends makes it hard to stay current." */
  example: string
  /** @example "https://dictionary.com/ephemeral" */
  reference_link: string | null
  /** @example "123" */
  id_essay_link: string
  /** @example "456" */
  id_space: string
  /** @example "intermediate" */
  mastery_level: string
  /** @example true */
  is_need_review: boolean
  /** @example "2024-10-25" */
  next_review_date: string
  /** @example 2.5 */
  ease_factor: number
  /** @example 7 */
  interval: number
  /** @example "789" */
  created_by: string
  /**
   * @format date-time
   * @example "2024-10-24T12:00:00Z"
   */
  created_at: string
  /**
   * @format date-time
   * @example "2024-10-24T12:00:00Z"
   */
  updated_at: string
}

export interface FindOneVocabularyResponseDto {
  vocabulary: Vocabulary
}

export type UpdateVocabularyDto = object

export interface UpdateVocabularyResponseDto {
  /**
   * Unique identifier of the vocabulary entry
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string
  /**
   * URL of the associated image
   * @example "https://example.com/images/vocabulary/word.jpg"
   */
  image_url?: string | null
  /**
   * The vocabulary word
   * @example "ephemeral"
   */
  word: string
  /**
   * Part of speech (e.g., noun, verb, adjective)
   * @example "adjective"
   */
  part_of_speech?: string | null
  /**
   * Definition of the word
   * @example "Lasting for a very short time"
   */
  definition?: string | null
  /**
   * Phonetic pronunciation of the word
   * @example "ih-fem-er-uhl"
   */
  pronunciation?: string | null
  /**
   * Example sentence using the word
   * @example "The ephemeral nature of fashion trends makes it hard to stay current."
   */
  example?: string | null
  /**
   * External reference link for the word
   * @example "https://dictionary.com/word/ephemeral"
   */
  reference_link?: string | null
  /**
   * ID of the related essay
   * @example "789abc-def-456"
   */
  id_essay_link?: string | null
  /**
   * ID of the space this vocabulary belongs to
   * @example "123xyz-789"
   */
  id_space?: string | null
  /**
   * Current mastery level (e.g., beginner, intermediate, advanced)
   * @example "intermediate"
   */
  mastery_level?: string | null
  /**
   * Indicates if the word needs to be reviewed
   * @example true
   */
  is_need_review?: boolean | null
  /**
   * Next scheduled review date
   * @example "2024-10-25T00:00:00Z"
   */
  next_review_date?: string | null
  /**
   * Spaced repetition ease factor (typically between 1.3 and 2.5)
   * @example 2.5
   */
  ease_factor?: number | null
  /**
   * Days until next review
   * @example 7
   */
  interval?: number | null
  /**
   * ID of the user who created this vocabulary entry
   * @example "456def-789"
   */
  created_by: string
  /**
   * Timestamp when the vocabulary was created
   * @format date-time
   * @example "2024-10-24T12:00:00Z"
   */
  created_at: string
  /**
   * Timestamp of the last update
   * @format date-time
   * @example "2024-10-24T14:30:00Z"
   */
  updated_at: string
}

export interface DeleteVocabularyResponseDto {
  message: string
}

export interface CreateQuizDto {
  title: string
  id_space: string
  created_by: string
}

export type QuizQuestion = object

export interface CreateQuizResponseDto {
  id: string
  id_space: string
  title: string
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  space?: Space
  creator?: User
  questions?: QuizQuestion[]
}

export interface QuizResponse {
  data: string[]
  pagination: PaginationOutputDto
}

export type Quiz = object

export interface FindOneQuizResponseDto {
  quiz: Quiz
}

export interface UpdateQuizDto {
  title?: string
}

export interface UpdateQuizResponseDto {
  /**
   * Quiz ID
   * @example 1
   */
  id: string
  /**
   * Space ID that quiz belongs to
   * @example 1
   */
  id_space: string
  /**
   * Quiz title
   * @example "JavaScript Fundamentals Quiz"
   */
  title: string
  /**
   * ID of user who created the quiz
   * @example 1
   */
  created_by: string
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-10-25T10:30:00Z"
   */
  created_at: string
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-10-25T10:30:00Z"
   */
  updated_at: string
  /** Space details that quiz belongs to */
  space?: Space
  /** Creator details */
  creator?: User
  questions: QuizQuestion[][]
}

export interface DeleteQuizResponseDto {
  message: string
}

export interface CreateQuizQuestionDto {
  question_text: string
  correct_answer: string
  user_answer?: string
  is_correct: boolean
  id_vocabulary?: string
}

export interface CreateQuizQuestionResponseDto {
  id: string
  quiz_id: string
  question_text: string
  correct_answer: string
  user_answer?: string
  is_correct: boolean
  id_vocabulary?: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  quiz?: Quiz
}

export interface QuizQuestionResponse {
  data: string[]
  pagination: PaginationOutputDto
}

export interface FindOneQuizQuestionResponseDto {
  quizQuestion: QuizQuestion
}

export interface UpdateQuizQuestionDto {
  question_text?: string
  correct_answer?: string
  user_answer?: string
  is_correct?: boolean
  id_vocabulary?: string
}

export interface UpdateQuizQuestionResponseDto {
  id: string
  quiz_id: string
  question_text: string
  correct_answer: string
  user_answer?: string
  is_correct: boolean
  id_vocabulary?: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  quiz?: Quiz
}

export interface DeleteQuizQuestionResponseDto {
  message: string
}

export interface HashtagsResponseDto {
  data: Hashtag[]
  pagination: PaginationOutputDto
}

export interface DeleteHashtagResponseDto {
  hashtag: Hashtag
}

export interface TopicDto {
  title: string
  description: string
}

export interface RecommendTopicsResponseDto {
  topics: TopicDto[]
  category: string
  count: number
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType

  instance?: AxiosInstance
  injectHeaders?: (data: any) => any
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType
  private injectHeaders?: (data: any) => any

  constructor({
    securityWorker,
    secure,
    format,
    instance,
    injectHeaders,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = instance ?? axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
    this.injectHeaders = injectHeaders
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T, _E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    let headers = {
      ...(requestParams.headers || {}),
      ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
    }

    if (this.injectHeaders) {
      headers = await this.injectHeaders(headers)
    }

    return this.instance.request({
      ...requestParams,
      headers,
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title Weebuns lms api
 * @version 1.0
 * @contact
 *
 * This docs includes all the endpoints of the weebuns lms api
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadFile
     * @request POST:/api/uploads
     */
    uploadControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadMany
     * @request POST:/api/uploads/many
     */
    uploadControllerUploadMany: (
      data: {
        files: File[]
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          key?: string
          url?: string
          name?: string
          size?: number
        }[],
        any
      >({
        path: `/api/uploads/many`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadVideo
     * @request POST:/api/uploads/video
     */
    uploadControllerUploadVideo: (
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads/video`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerDeleteFile
     * @request DELETE:/api/uploads/{key}
     */
    uploadControllerDeleteFile: (key: string, params: RequestParams = {}) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads/${key}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieve a paginated list of users with optional filters
     *
     * @tags users
     * @name UserControllerFindAll
     * @summary Get all users
     * @request GET:/api/users
     * @secure
     */
    userControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<UsersResponse, void>({
        path: `/api/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create a new user account. Admin access only.
     *
     * @tags users
     * @name UserControllerCreate
     * @summary Create new user
     * @request POST:/api/users
     * @secure
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<CreateUserResponse, void>({
        path: `/api/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieve detailed information about a specific user. Admin access only.
     *
     * @tags users
     * @name UserControllerFindOne
     * @summary Get user by ID
     * @request GET:/api/users/{id}
     * @secure
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/api/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update user information. Admin access only.
     *
     * @tags users
     * @name UserControllerUpdate
     * @summary Update user by ID
     * @request PUT:/api/users/{id}
     * @secure
     */
    userControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UpdateUserResponse, void>({
        path: `/api/users/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Permanently remove a user account. Admin access only.
     *
     * @tags users
     * @name UserControllerRemove
     * @summary Delete user by ID
     * @request DELETE:/api/users/{id}
     * @secure
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteUserResponse, void>({
        path: `/api/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMe
     * @summary Get current user profile
     * @request GET:/api/auth/me
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/api/auth/me`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Register new user
     * @request POST:/api/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<UserRegisterResponse, void>({
        path: `/api/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login with email and password
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLoginWithGoogle
     * @summary Login with Google
     * @request POST:/api/auth/login/google
     */
    authControllerLoginWithGoogle: (data: LoginGoogleDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login/google`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLoginWithFacebook
     * @summary Login with Facebook
     * @request POST:/api/auth/login/facebook
     */
    authControllerLoginWithFacebook: (data: LoginFacebookDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login/facebook`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRefreshToken
     * @summary Refresh access token
     * @request POST:/api/auth/refresh-token
     */
    authControllerRefreshToken: (params: RequestParams = {}) =>
      this.request<UserRefreshTokenResponse, void>({
        path: `/api/auth/refresh-token`,
        method: 'POST',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary Logout user
     * @request POST:/api/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<LogoutResponse, any>({
        path: `/api/auth/logout`,
        method: 'POST',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerFindAll
     * @request GET:/api/spaces
     */
    spaceControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SpacesResponse, any>({
        path: `/api/spaces`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerCreate
     * @request POST:/api/spaces
     */
    spaceControllerCreate: (data: CreateSpaceDto, params: RequestParams = {}) =>
      this.request<CreateSpaceResponseDto, any>({
        path: `/api/spaces`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerFindOne
     * @request GET:/api/spaces/{id}
     */
    spaceControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneSpaceResponseDto, any>({
        path: `/api/spaces/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerUpdate
     * @request PATCH:/api/spaces/{id}
     */
    spaceControllerUpdate: (id: string, data: UpdateSpaceDto, params: RequestParams = {}) =>
      this.request<UpdateSpaceResponseDto, any>({
        path: `/api/spaces/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerDelete
     * @request DELETE:/api/spaces/{id}
     */
    spaceControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteSpaceResponseDto, any>({
        path: `/api/spaces/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerFindAll
     * @request GET:/api/essays
     */
    essayControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
        /** @example "public" */
        status?: 'draft' | 'public' | 'private' | 'deleted'
      },
      params: RequestParams = {}
    ) =>
      this.request<EssaysResponse, any>({
        path: `/api/essays`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerCreate
     * @request POST:/api/essays
     */
    essayControllerCreate: (data: CreateEssayDto, params: RequestParams = {}) =>
      this.request<CreateEssayResponseDto, any>({
        path: `/api/essays`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerFindAllByUser
     * @request GET:/api/essays/user
     */
    essayControllerFindAllByUser: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
        /** @example "public" */
        status?: 'draft' | 'public' | 'private' | 'deleted'
      },
      params: RequestParams = {}
    ) =>
      this.request<EssaysResponse, any>({
        path: `/api/essays/user`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerFindOne
     * @request GET:/api/essays/{id}
     */
    essayControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneEssayResponseDto, any>({
        path: `/api/essays/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerUpdate
     * @request PATCH:/api/essays/{id}
     */
    essayControllerUpdate: (id: string, data: UpdateEssayDto, params: RequestParams = {}) =>
      this.request<UpdateEssayResponseDto, any>({
        path: `/api/essays/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerDelete
     * @request DELETE:/api/essays/{id}
     */
    essayControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteEssayResponseDto, any>({
        path: `/api/essays/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags essays
     * @name EssayControllerDeleteByUser
     * @request DELETE:/api/essays/{id}/user
     */
    essayControllerDeleteByUser: (id: string, params: RequestParams = {}) =>
      this.request<DeleteEssayResponseDto, any>({
        path: `/api/essays/${id}/user`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Creates a new vocabulary entry in the specified space
     *
     * @tags vocabularies
     * @name VocabularyControllerCreate
     * @summary Create a new vocabulary
     * @request POST:/api/vocabularies
     */
    vocabularyControllerCreate: (data: CreateVocabularyDto, params: RequestParams = {}) =>
      this.request<CreateVocabularyResponseDto, void>({
        path: `/api/vocabularies`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieves all vocabularies with pagination and filtering options
     *
     * @tags vocabularies
     * @name VocabularyControllerFindAll
     * @summary Get all vocabularies
     * @request GET:/api/vocabularies
     */
    vocabularyControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<FindAllVocabularyDto, void>({
        path: `/api/vocabularies`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieves detailed information about a specific vocabulary
     *
     * @tags vocabularies
     * @name VocabularyControllerFindOne
     * @summary Get vocabulary by ID
     * @request GET:/api/vocabularies/{id}
     */
    vocabularyControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneVocabularyResponseDto, void>({
        path: `/api/vocabularies/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Updates an existing vocabulary with new data
     *
     * @tags vocabularies
     * @name VocabularyControllerUpdate
     * @summary Update vocabulary by ID
     * @request PATCH:/api/vocabularies/{id}
     */
    vocabularyControllerUpdate: (id: string, data: UpdateVocabularyDto, params: RequestParams = {}) =>
      this.request<UpdateVocabularyResponseDto, void>({
        path: `/api/vocabularies/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Permanently removes a vocabulary entry
     *
     * @tags vocabularies
     * @name VocabularyControllerDelete
     * @summary Delete vocabulary by ID
     * @request DELETE:/api/vocabularies/{id}
     */
    vocabularyControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteVocabularyResponseDto, void>({
        path: `/api/vocabularies/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizControllerCreate
     * @summary Create a new quiz
     * @request POST:/api/quizs
     */
    quizControllerCreate: (data: CreateQuizDto, params: RequestParams = {}) =>
      this.request<CreateQuizResponseDto, void>({
        path: `/api/quizs`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizControllerFindAll
     * @summary Get all vocabularies
     * @request GET:/api/quizs
     */
    quizControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<QuizResponse, any>({
        path: `/api/quizs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizControllerFindOne
     * @summary Get a Quiz by ID
     * @request GET:/api/quizs/{id}
     */
    quizControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneQuizResponseDto, void>({
        path: `/api/quizs/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizControllerUpdate
     * @summary Update a quiz by ID
     * @request PATCH:/api/quizs/{id}
     */
    quizControllerUpdate: (id: string, data: UpdateQuizDto, params: RequestParams = {}) =>
      this.request<UpdateQuizResponseDto, void>({
        path: `/api/quizs/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizControllerDelete
     * @summary Delete a Quiz by ID
     * @request DELETE:/api/quizs/{id}
     */
    quizControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteQuizResponseDto, void>({
        path: `/api/quizs/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizQuestionControllerCreateQuestion
     * @summary Create a new quiz question
     * @request POST:/api/quizs/{quizId}/questions
     */
    quizQuestionControllerCreateQuestion: (quizId: string, data: CreateQuizQuestionDto, params: RequestParams = {}) =>
      this.request<CreateQuizQuestionResponseDto, void>({
        path: `/api/quizs/${quizId}/questions`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizQuestionControllerFindAll
     * @summary Find all quiz questions
     * @request GET:/api/quizs/{quizId}/questions
     */
    quizQuestionControllerFindAll: (
      quizId: string,
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<QuizQuestionResponse, any>({
        path: `/api/quizs/${quizId}/questions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizQuestionControllerFindOne
     * @summary Find one quiz question
     * @request GET:/api/quizs/{quizId}/questions/{id}
     */
    quizQuestionControllerFindOne: (quizId: string, id: string, params: RequestParams = {}) =>
      this.request<FindOneQuizQuestionResponseDto, void>({
        path: `/api/quizs/${quizId}/questions/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizQuestionControllerUpdate
     * @summary Update a quiz question
     * @request PATCH:/api/quizs/questions/{id}
     */
    quizQuestionControllerUpdate: (id: string, data: UpdateQuizQuestionDto, params: RequestParams = {}) =>
      this.request<UpdateQuizQuestionResponseDto, void>({
        path: `/api/quizs/questions/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags quizs
     * @name QuizQuestionControllerDelete
     * @summary Delete a quiz question
     * @request DELETE:/api/quizs/questions/{id}
     */
    quizQuestionControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteQuizQuestionResponseDto, void>({
        path: `/api/quizs/questions/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags health
     * @name HealthControllerCheck
     * @request GET:/api/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "ok" */
          status?: string
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {} */
          error?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"database":{"status":"up"}} */
          details?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
        },
        {
          /** @example "error" */
          status?: string
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"redis":{"status":"down","message":"Could not connect"}} */
          error?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
          /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
          details?: Record<
            string,
            {
              status: string
              [key: string]: any
            }
          >
        }
      >({
        path: `/api/health`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags hashtags
     * @name HashtagControllerFindAll
     * @request GET:/api/hashtags
     */
    hashtagControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<HashtagsResponseDto, any>({
        path: `/api/hashtags`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags hashtags
     * @name HashtagControllerDeleteByName
     * @request DELETE:/api/hashtags/{name}
     */
    hashtagControllerDeleteByName: (name: string, params: RequestParams = {}) =>
      this.request<DeleteHashtagResponseDto, any>({
        path: `/api/hashtags/${name}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiController
     * @request POST:/api/ai/translate
     */
    aiController: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/translate`,
        method: 'POST',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiController2
     * @request POST:/api/ai/check-grammar
     * @originalName aiController
     * @duplicate
     */
    aiController2: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/check-grammar`,
        method: 'POST',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerRecommendTopics
     * @request GET:/api/ai/recommend-topics
     */
    aiControllerRecommendTopics: (
      query?: {
        category?: string
        /** @default 5 */
        count?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<RecommendTopicsResponseDto, any>({
        path: `/api/ai/recommend-topics`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      })
  }
}
