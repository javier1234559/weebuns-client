/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

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

export interface EssayHashtag {
  /**
   * Unique identifier for the essay-hashtag association
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string
  /**
   * Name of the hashtag
   * @minLength 1
   * @maxLength 50
   * @example "technology"
   */
  name: string
  /**
   * ID of the associated essay
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  essay_id: string
  /**
   * ID of the associated hashtag
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  hashtag_id: string
  /**
   * Number of times this hashtag has been used in essays
   * @min 0
   * @example 42
   */
  usage_count: number
  /**
   * Timestamp when the association was created
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  created_at: string
  /**
   * Timestamp when the association was last updated
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updated_at: string
  /** The associated essay details. Only populated when explicitly requested. */
  essay?: Essay | null
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
  hashtags: EssayHashtag[] | null
  corrections: Correction[] | null
}

export interface Space {
  /** @example 1 */
  id: string
  /** @example "English Learning Space" */
  name: string
  /** @example "A space for learning English" */
  description: string | null
  /** @example 5 */
  essay_number: number | null
  /** @example 10 */
  quiz_number: number | null
  /** @example 20 */
  vocab_number: number | null
  /** @example 1 */
  created_by: string
  /** @format date-time */
  created_at: string
  /** @format date-time */
  updated_at: string
  essays: Essay[] | null
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

export interface UsersResponse {
  users: User[]
  pagination: object
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
  user: object
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
  user: object
}

export interface DeleteUserResponse {
  user: object
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

export type PaginationOutputDto = object

export interface SpacesResponse {
  data: string[]
  pagination: PaginationOutputDto
}

export interface FindOneSpaceResponseDto {
  space: Space
}

export interface CreateSpaceDto {
  name: string
  description: string
  essay_number: number
  quiz_number: number
  vocab_number: number
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
  name: string
  description: string
  essay_number: number
  quiz_number: number
  vocab_number: number
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
  data: string[]
  pagination: PaginationOutputDto
}

export interface FindOneEssayResponseDto {
  essay: Essay
}

export interface CreateEssayDto {
  status: 'draft' | 'public' | 'private' | 'deleted'
}

export interface CreateEssayResponseDto {
  essay: Essay
}

export interface UpdateEssayDto {
  status: 'draft' | 'public' | 'private' | 'deleted'
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

export interface VocabulariesResponse {
  data: string[]
  pagination: PaginationOutputDto
}

export type Vocabulary = object

export interface FindOneVocabularyResponseDto {
  vocabulary: Vocabulary
}

export type UpdateVocabularyDto = object

export interface UpdateVocabularyResponseDto {
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
}

export interface DeleteVocabularyResponseDto {
  message: string
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
        page?: number
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
     * @summary Get all spaces with pagination and filters
     * @request GET:/api/spaces
     */
    spaceControllerFindAll: (
      query?: {
        page?: number
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SpacesResponse, void>({
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
     * @summary Create new space
     * @request POST:/api/spaces
     */
    spaceControllerCreate: (data: CreateSpaceDto, params: RequestParams = {}) =>
      this.request<CreateSpaceResponseDto, void>({
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
     * @summary Get space by ID
     * @request GET:/api/spaces/{id}
     */
    spaceControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneSpaceResponseDto, void>({
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
     * @summary Update space by ID
     * @request PATCH:/api/spaces/{id}
     */
    spaceControllerUpdate: (id: string, data: UpdateSpaceDto, params: RequestParams = {}) =>
      this.request<UpdateSpaceResponseDto, void>({
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
     * @summary Delete space by ID
     * @request DELETE:/api/spaces/{id}
     */
    spaceControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteSpaceResponseDto, void>({
        path: `/api/spaces/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieves all essays with pagination and filtering options
     *
     * @tags essays
     * @name EssayControllerFindAll
     * @summary Get all essays
     * @request GET:/api/essays
     */
    essayControllerFindAll: (
      query?: {
        page?: number
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<EssaysResponse, void>({
        path: `/api/essays`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Creates a new essay with the provided content and metadata
     *
     * @tags essays
     * @name EssayControllerCreate
     * @summary Create a new essay
     * @request POST:/api/essays
     */
    essayControllerCreate: (data: CreateEssayDto, params: RequestParams = {}) =>
      this.request<CreateEssayResponseDto, void>({
        path: `/api/essays`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieves detailed information about a specific essay
     *
     * @tags essays
     * @name EssayControllerFindOne
     * @summary Get essay by ID
     * @request GET:/api/essays/{id}
     */
    essayControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneEssayResponseDto, void>({
        path: `/api/essays/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Updates an existing essay with new content or metadata
     *
     * @tags essays
     * @name EssayControllerUpdate
     * @summary Update essay by ID
     * @request PATCH:/api/essays/{id}
     */
    essayControllerUpdate: (id: string, data: UpdateEssayDto, params: RequestParams = {}) =>
      this.request<UpdateEssayResponseDto, void>({
        path: `/api/essays/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Permanently removes an essay and its associated content
     *
     * @tags essays
     * @name EssayControllerDelete
     * @summary Delete essay by ID
     * @request DELETE:/api/essays/{id}
     */
    essayControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteEssayResponseDto, void>({
        path: `/api/essays/${id}`,
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
        page?: number
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<VocabulariesResponse, void>({
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
      })
  }
}
