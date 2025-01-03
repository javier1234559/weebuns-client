/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export type DeleteResponseDto = object

export interface SpaceCount {
  /** @example 0 */
  essays: number
  /** @example 0 */
  notes: number
  /** @example 0 */
  vocabularies: number
}

export interface Space {
  /** @example "123e4567-e89b-12d3-a456-426614174000" */
  id: string
  /** @example "English Learning Space" */
  name: string
  /** @example "A space for learning English" */
  description: string | null
  /**
   * Learning language
   * @example "ENGLISH"
   */
  language: 'ENGLISH' | 'VIETNAMESE'
  /**
   * Learning target/purpose
   * @example "COMMUNICATION"
   */
  target: 'COMMUNICATION' | 'IELTS' | 'TOEIC' | 'OTHER'
  /**
   * Current proficiency level
   * @example "INTERMEDIATE"
   */
  currentLevel: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
  /**
   * Main learning topic
   * @example ["ACADEMIC","DAILY_LIFE"]
   */
  topics: string[]
  /**
   * Target proficiency level to achieve
   * @example "ADVANCED"
   */
  targetLevel: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
  /**
   * ID of the user who created this space
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  createdBy: string
  /**
   * Creation timestamp
   * @format date-time
   */
  createdAt: string
  /**
   * Last update timestamp
   * @format date-time
   */
  updatedAt: string
  /** @format date-time */
  deletedAt: string
  /**
   * Count of related entities
   * @example {"essays":0,"notes":0,"vocabularies":0}
   */
  _count: SpaceCount
  /** Creator user details */
  creator: User | null
}

export interface Note {
  id: string
  spaceId: string | null
  lessonId: string
  courseId: string | null
  unitId: string | null
  title: string
  content: string
  tags: string[]
  isBookmarked: boolean
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string | null
  lesson?: Lesson
  creator?: User
  space?: Space | null
  Course?: Course | null
  Unit?: Unit | null
}

export interface LessonComment {
  id: string
  lessonId: string
  createdBy: string
  content: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  lesson?: Lesson
  creator?: User
}

export interface CourseProgress {
  /** @format int32 */
  completedWeight: number
  id: string
  userId: string
  courseId: string
  currentUnitId: string | null
  currentLessonId: string | null
  nextUnitId: string | null
  nextLessonId: string | null
  /** @format date-time */
  lastAccessedAt: string | null
  completedUnits: string[]
  completedLessons: string[]
  user?: User
  course?: Course
  currentUnit?: Unit | null
  nextUnit?: Unit | null
  currentLesson?: Lesson | null
  nextLesson?: Lesson | null
}

export interface Lesson {
  /** @default 0 */
  lessonWeight: number
  id: string
  unitId: string
  title: string
  summary: string | null
  content: object
  /** @format int32 */
  orderIndex: number
  isPremium: boolean
  isRequired: boolean
  status: 'draft' | 'published' | 'private' | 'deleted'
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  unit?: Unit
  creator?: User
  notes?: Note[]
  comments?: LessonComment[]
  currentInProgress?: CourseProgress[]
  nextInProgress?: CourseProgress[]
}

export interface Unit {
  id: string
  courseId: string
  title: string
  /** @format int32 */
  orderIndex: number
  /** @default false */
  isPremium: boolean
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  course?: Course
  creator?: User
  lessons?: Lesson[]
  courseProgress?: CourseProgress[]
  nextUnits?: CourseProgress[]
}

export interface SpaceCourse {
  id: string
  spaceId: string
  courseId: string
  /** @format date-time */
  joinedAt: string
  space?: Space
  course?: Course
}

export interface Course {
  /** @default 0 */
  totalWeight: number
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  language: string
  minLevel: string
  maxLevel: string
  topics: string[]
  courseType: string
  /** @default false */
  isPremium: boolean
  /** @default "draft" */
  status: 'draft' | 'published' | 'private' | 'deleted'
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string | null
  creator?: User
  units?: Unit[]
  progress?: CourseProgress[]
  spaces?: SpaceCourse[]
}

export interface Vocabulary {
  id: string
  spaceId: string
  term: string
  meaning: string[]
  exampleSentence: string | null
  imageUrl: string | null
  referenceLink: string | null
  referenceName: string | null
  tags: string[]
  /** @format int32 */
  repetitionLevel: number
  /** @format date-time */
  nextReview: string | null
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string
  space?: Space
  creator?: User
}

export interface CorrectionSentence {
  /** @example "uuid" */
  id: string
  /** @example "uuid" */
  correctionId: string
  /** @example 0 */
  index: number
  /** @example "original text" */
  originalText: string
  /** @example "corrected text" */
  correctedText: string
  /** @example "explanation" */
  explanation: string
  /** @example true */
  isCorrect: boolean
  /** @example 4.5 */
  rating: number
  /**
   * @format date-time
   * @example "2024-12-09T18:22:27.292Z"
   */
  createdAt: string
  /**
   * @format date-time
   * @example "2024-12-09T18:22:27.292Z"
   */
  updatedAt: string
}

export interface CorrectionReply {
  /** @example 1 */
  id: string
  /**
   * ID of the related correction
   * @example 1
   */
  correctionId: string
  /**
   * Reply comment to the correction
   * @example "Great improvement on your grammar!"
   */
  comment: string
  /**
   * User ID who created the reply
   * @example 1
   */
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  creator: User | null
}

export interface Correction {
  /** @example 1 */
  id: string
  /**
   * ID of the essay being corrected
   * @example 1
   */
  essayId: string
  /**
   * Overall feedback for the essay
   * @example "Good structure but needs work on tenses"
   */
  overallComment: string | null
  /**
   * Rating score for the essay
   * @min 0
   * @max 10
   * @example "8.0"
   */
  rating: number | null
  /**
   * User ID who created the correction
   * @example 1
   */
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string
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
  /** @example 10 */
  usageCount: number
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  createdAt: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  updatedAt: string
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
  essayId: string
  /**
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  hashtagId: string
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string
  essay?: Essay | null
  hashtag?: Hashtag | null
}

export interface Essay {
  /** @example "uuid" */
  id: string
  /** @example "1" */
  spaceId: string
  /** @example "My First Essay" */
  title: string
  /** @example 0 */
  upvoteCount: number
  /** @example "A brief summary" */
  summary: string | null
  /** @example "Essay content..." */
  content: string
  /** @example "https://example.com/cover.jpg" */
  coverUrl: string | null
  /** @example "draft" */
  status: 'draft' | 'published' | 'private' | 'deleted'
  /** @example "en" */
  language: string
  /** @example "1" */
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string | null
  space: Space | null
  author: User | null
  corrections: Correction[] | null
  /** Associated hashtags for this essay */
  hashtags: EssayHashtag[] | null
}

export interface SubscriptionPayment {
  id: string
  subscriptionId: string
  /** @format double */
  amount: number
  paymentType: 'stripe' | 'momo' | 'zalopay'
  /** @format date-time */
  paymentDate: string
  status: string
  subscription?: Subscription
}

export interface Subscription {
  id: string
  userId: string
  type: 'FREE' | 'BASIC' | 'PREMIUM'
  /** @format date-time */
  startDate: string
  /** @format date-time */
  endDate: string | null
  status: string
  /** @format int32 */
  correctionBalance: number
  user?: User
  payments?: SubscriptionPayment[]
}

export interface CorrectionCredit {
  id: string
  userId: string
  /** @format int32 */
  amount: number
  /** @format double */
  price: number
  paymentId: string | null
  paymentType: 'stripe' | 'momo' | 'zalopay'
  /** @format date-time */
  expireDate: string | null
  /** @format date-time */
  createdAt: string
  user?: User
}

export interface User {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string
  /** @example "johndoe" */
  username: string
  /** @example "john@example.com" */
  email: string
  passwordHash: string | null
  /**
   * User role in the system
   * @example "user"
   */
  role: 'user' | 'admin' | 'teacher'
  /**
   * Authentication provider used
   * @example "local"
   */
  authProvider: 'local' | 'google' | 'facebook'
  authProviderId: string | null
  /** @example "John" */
  firstName: string | null
  /** @example "Doe" */
  lastName: string | null
  /** @example "https://example.com/avatar.jpg" */
  profilePicture: string | null
  /** @example false */
  isEmailVerified: boolean
  /**
   * User's native language
   * @example "VIETNAMESE"
   */
  nativeLanguage: 'ENGLISH' | 'VIETNAMESE'
  /** @format date-time */
  lastLogin: string | null
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /**
   * Timestamp when the user was deleted (soft delete)
   * @format date-time
   */
  deletedAt: string | null
  courses: Course[] | null
  /** Progress tracking for enrolled courses */
  courseProgress: CourseProgress[] | null
  /** Notes created by the user */
  notes: Note[] | null
  /** Vocabulary items created by the user */
  vocabularies: Vocabulary[] | null
  /** Learning spaces created by the user */
  spaces: Space[] | null
  /** Essays written by the user */
  essays: Essay[] | null
  /** Corrections made by the user */
  corrections: Correction[] | null
  /** Replies to corrections */
  correctionReplies: CorrectionReply[] | null
  lessonComments?: LessonComment[]
  /** User subscriptions */
  subscriptions: Subscription[] | null
  /** Correction credits owned by the user */
  correctionCredits: CorrectionCredit[] | null
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
  nativeLanguage: string
  profile_picture: string
  role: 'user' | 'admin' | 'teacher'
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
  nativeLanguage?: string
  profile_picture?: string
  role?: 'user' | 'admin' | 'teacher'
  auth_provider?: 'local' | 'google' | 'facebook'
}

export interface UpdateUserResponse {
  user: User
}

export interface UpdateProfileUserDto {
  username: string
  email: string
  firstName: string
  lastName: string
  nativeLanguage: string
  profilePicture: string
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
  nativeLanguage: string
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

export interface RequestResetPasswordDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string
}

export interface RequestResetPasswordResponse {
  /**
   * Status message
   * @example "Reset code sent to email"
   */
  message: string
}

export interface VerifyResetCodeDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string
  /**
   * Six-digit verification code sent to email
   * @example "123456"
   */
  code: string
}

export interface VerifyResetCodeResponse {
  /**
   * Status message
   * @example "Code verified successfully"
   */
  message: string
}

export interface ResetPasswordDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string
  /**
   * Verification code for password reset
   * @example "123456"
   */
  code: string
  /**
   * New password (minimum 6 characters)
   * @example "newPassword123"
   */
  newPassword: string
}

export interface ResetPasswordResponse {
  /**
   * Status message
   * @example "Password reset successfully"
   */
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
  /** @example "ENGLISH" */
  language: 'ENGLISH' | 'VIETNAMESE'
  /** @example "COMMUNICATION" */
  target: 'COMMUNICATION' | 'IELTS' | 'TOEIC' | 'OTHER'
  /**
   * Current proficiency level
   * @example "INTERMEDIATE"
   */
  currentLevel: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
  /** @example ["BUSINESS","ACADEMIC"] */
  topics: string[]
  /**
   * Target proficiency level to achieve
   * @example "ADVANCED"
   */
  targetLevel: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
}

export interface UpdateSpaceDto {
  name?: string
  description?: string
  /** @example "ENGLISH" */
  language?: 'ENGLISH' | 'VIETNAMESE'
  /** @example "COMMUNICATION" */
  target?: 'COMMUNICATION' | 'IELTS' | 'TOEIC' | 'OTHER'
  /**
   * Current proficiency level
   * @example "INTERMEDIATE"
   */
  currentLevel?: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
  /** @example ["BUSINESS","ACADEMIC"] */
  topics?: string[]
  /**
   * Target proficiency level to achieve
   * @example "ADVANCED"
   */
  targetLevel?: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED' | 'MASTER'
}

export interface DeleteSpaceResponseDto {
  space: Space
}

export interface CourseJoinedDto {
  /** @default 0 */
  totalWeight: number
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  language: string
  minLevel: string
  maxLevel: string
  topics: string[]
  courseType: string
  /** @default false */
  isPremium: boolean
  /** @default "draft" */
  status: 'draft' | 'published' | 'private' | 'deleted'
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  /** @format date-time */
  deletedAt: string | null
  creator?: User
  units?: Unit[]
  spaces?: SpaceCourse[]
  progress: CourseProgress | null
}

export interface SpaceCoursesJoinedResponseDto {
  data: CourseJoinedDto[]
  pagination: PaginationOutputDto
}

export interface CourseWithJoinStatus {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  language: string
  minLevel: string
  maxLevel: string
  topics: string[]
  courseType: string
  isPremium: boolean
  totalWeight: number
  isPublished: boolean
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  isJoined: boolean
  /** @format date-time */
  joinedAt: string | null
  progress: CourseProgress | null
  creator: User
}

export interface SpaceCoursesAllResponseDto {
  data: CourseWithJoinStatus[]
  pagination: PaginationOutputDto
}

export interface EssaysResponse {
  data: Essay[]
  pagination: PaginationOutputDto
}

export interface FindOneEssayResponseDto {
  essay: Essay
}

export enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
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
  /** @example "published" */
  status: ContentStatus
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
  /** @example "published" */
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
  /** @example "published" */
  status?: ContentStatus
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

export interface CreateVocabularyDto {
  spaceId: string
  term: string
  meaning: string[]
  exampleSentence?: string | null
  imageUrl?: string | null
  referenceLink?: string | null
  referenceName?: string | null
  /** @format date-time */
  nextReview?: string | null
  tags: string[]
  /**
   * Repetition level from 0 to 6
   * @example 1
   */
  repetitionLevel?: number | null
}

export interface FindOneVocabularyResponseDto {
  vocabulary: Vocabulary
}

export interface VocabularyResponse {
  data: Vocabulary[]
  pagination: PaginationOutputDto
}

export interface UpdateVocabularyDto {
  spaceId?: string
  term?: string
  meaning?: string[]
  exampleSentence?: string | null
  imageUrl?: string | null
  referenceLink?: string | null
  referenceName?: string | null
  /** @format date-time */
  nextReview?: string | null
  tags?: string[]
  /**
   * Repetition level from 0 to 6
   * @example 1
   */
  repetitionLevel?: number | null
}

export interface HashtagsResponseDto {
  data: Hashtag[]
  pagination: PaginationOutputDto
}

export interface DeleteHashtagResponseDto {
  hashtag: Hashtag
}

export interface ActivityDataDto {
  /** @example 2 */
  level: number
  /** @example {"streak":5} */
  data: object
}

export interface ActivityStreakResponseDto {
  /** @example [{"2024-03-15":{"level":2,"data":{"streak":5}}}] */
  activities: any[][]
  /** @example {"level":2,"data":{"streak":5}} */
  currentStreak: ActivityDataDto
}

export interface UserOverviewDto {
  /** @example 10 */
  essayCount: number
  /** @example 20 */
  vocabCount: number
  /** @example 5 */
  courseJoinedCount: number
  /** @example 15 */
  notesCount: number
}

export interface StatResponse {
  /** Current value of the stat */
  current: number
  /** Previous value of the stat */
  previous: number
}

export interface StatItemDto {
  id: number
  type: 'users' | 'currency' | 'course' | 'coursecomplete'
  stats: StatResponse
}

export interface AdminStatsOverviewDto {
  data: StatItemDto[]
}

export interface GrowthDataPoint {
  date: string
  value: number
}

export interface GrowthDataDto {
  data: GrowthDataPoint[]
}

export interface CreateCourseDto {
  title: string
  description?: string | null
  thumbnailUrl?: string | null
  language: string
  minLevel: string
  maxLevel: string
  topics: string[]
  courseType: string
  /** @default 0 */
  totalWeight?: number
  /** @default "draft" */
  status?: 'draft' | 'published' | 'private' | 'deleted'
  /** @default false */
  isPremium?: boolean
}

export interface CourseResponseDto {
  course: Course
}

export interface UpdateCourseDto {
  title?: string
  description?: string | null
  thumbnailUrl?: string | null
  language?: string
  minLevel?: string
  maxLevel?: string
  topics?: string[]
  courseType?: string
  /** @default 0 */
  totalWeight?: number
  /** @default "draft" */
  status?: 'draft' | 'published' | 'private' | 'deleted'
  /** @default false */
  isPremium?: boolean
}

export interface CourseListResponseDto {
  data: Course[]
  pagination: PaginationOutputDto
}

export interface LessonWithoutContent {
  /** @default 0 */
  lessonWeight: number
  id: string
  unitId: string
  title: string
  summary: string | null
  /** @format int32 */
  orderIndex: number
  isPremium: boolean
  isRequired: boolean
  status: 'draft' | 'published' | 'private' | 'deleted'
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  unit?: Unit
  creator?: User
  notes?: Note[]
  comments?: LessonComment[]
  currentInProgress?: CourseProgress[]
  nextInProgress?: CourseProgress[]
}

export interface UnitWithLessonsDto {
  id: string
  courseId: string
  title: string
  orderIndex: number
  isPremium: boolean
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  lessons: LessonWithoutContent[]
}

export interface CourseUnitResponseDto {
  data: UnitWithLessonsDto[]
  pagination: PaginationOutputDto
}

export interface JoinCourseRequestDto {
  spaceId: string
}

export interface JoinCourseResponseDto {
  message: string
  joinedAt: string
  progress: CourseProgress
}

export interface LessonLearnDto {
  id: string
  title: string
  orderIndex: number
  isPremium: boolean
  isRequired: boolean
  status: 'draft' | 'published' | 'private' | 'deleted'
  lessonWeight: number
}

export interface UnitLearnDto {
  id: string
  title: string
  orderIndex: number
  isPremium: boolean
  lessons: LessonLearnDto[]
}

export interface CourseLearnDto {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  language: string
  minLevel: string
  maxLevel: string
  topics: string[]
  courseType: string
  isPremium: boolean
  totalWeight: number
  status: 'draft' | 'published' | 'private' | 'deleted'
  createdBy: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  units: UnitLearnDto[]
}

export interface CourseLearnResponseDto {
  course: CourseLearnDto
}

export interface CheckJoinedCourseResponseDto {
  check: boolean
  progress?: CourseProgress
}

export interface CourseProgressResponseDto {
  courseProgress: CourseProgress
}

export interface UpdateCourseProgressDto {
  currentUnitId?: string
  currentLessonId?: string
  nextUnitId?: string
  nextLessonId?: string
  completedWeight?: number
  completedUnits?: string[]
  completedLessons?: string[]
}

export interface CreateUnitDto {
  title: string
  /** @format int32 */
  orderIndex: number
  /** @default false */
  isPremium: boolean
  courseId: string
}

export interface GetUnitResponseDto {
  unit: Unit
}

export interface UnitLearnResponseDto {
  unit: Unit
}

export interface LessonResponseDto {
  lesson: Lesson
}

export interface BulkUpdateUnitsDto {
  courseId: string
  units: UnitWithLessonsDto[]
}

export interface BulkUpdateUnitsResponseDto {
  data: UnitWithLessonsDto[]
}

export interface UpdateUnitDto {
  title?: string
  /** @format int32 */
  orderIndex?: number
  /** @default false */
  isPremium?: boolean
  courseId?: string
}

export interface FindOneNoteResponseDto {
  note: Note | null
}

export interface CreateLessonDto {
  title: string
  summary: string | null
  content: object
  /** @format int32 */
  orderIndex: number
  /** @default false */
  isPremium: boolean
  /** @default true */
  isRequired: boolean
  /**
   * @format int32
   * @default 0
   */
  lessonWeight: number
  /** @default "draft" */
  status: 'draft' | 'published' | 'private' | 'deleted'
}

export interface UpdateLessonDto {
  title?: string
  summary?: string | null
  content?: object
  /** @format int32 */
  orderIndex?: number
  /** @default false */
  isPremium?: boolean
  /** @default true */
  isRequired?: boolean
  /**
   * @format int32
   * @default 0
   */
  lessonWeight?: number
  /** @default "draft" */
  status?: 'draft' | 'published' | 'private' | 'deleted'
}

export interface CreateNoteDto {
  spaceId: string
  lessonId: string
  courseId: string | null
  unitId: string | null
  title: string
  content: string
  tags: string[]
  isBookmarked?: boolean
}

export interface SimplifiedNoteDto {
  id: string
  spaceId: string | null
  lessonId: string
  courseId: string
  unitId: string
  content: string
  title: string
  tags: string[]
  isBookmarked: boolean
  lesson: LessonWithoutContent
  course: Course
  /** @format date-time */
  createdAt: string
}

export interface NotesResponse {
  data: SimplifiedNoteDto[]
  pagination: PaginationOutputDto
}

export interface UpdateNoteDto {
  spaceId?: string
  lessonId?: string
  courseId?: string | null
  unitId?: string | null
  title?: string
  content?: string
  tags?: string[]
  isBookmarked?: boolean
}

export interface TranslateDto {
  /** @example "Hello world" */
  text: string
  /** @example "English" */
  sourceLanguage: string
  /** @example "Spanish" */
  targetLanguage: string
}

export interface TranslateResponseDto {
  /** @example "Hello world" */
  original_text: string
  /** @example "Hola mundo" */
  translated_text: string
  /** @example "English" */
  source_language: string
  /** @example "Spanish" */
  target_language: string
}

export interface CheckGrammarDto {
  /** @example "This is a sample text with grammer mistakes." */
  text: string
}

export interface PositionDto {
  /** @example 0 */
  start: number
  /** @example 5 */
  end: number
}

export interface CorrectionDto {
  /** @example "grammer" */
  original: string
  /** @example "grammar" */
  corrected: string
  explanation: string
  /** @example "spelling" */
  type: 'grammar' | 'spelling' | 'punctuation' | 'style'
  position: PositionDto
}

export interface CheckGrammarResponseDto {
  corrections: CorrectionDto[]
  /** @example "Found 2 spelling errors and 1 grammar mistake." */
  summary: string
  /**
   * @min 0
   * @max 100
   * @example 85
   */
  overall_score: number
}

export interface RecommendTopicsResponseDto {
  topics: string[]
  category: string
  count: number
}

export interface VoiceSettingDto {
  stability: number
  similarity_boost: number
  style: number
  use_speaker_boost: boolean
}

export interface TextToSpeechDto {
  text: string
  voiceId?: string
  voiceSettings?: VoiceSettingDto
}

export interface TextToSpeechResponseDto {
  audioUrl: string
  text: string
  voiceId: string
}

export interface FindSubscriptionStatusResponseDto {
  isActive: boolean
  type: 'FREE' | 'BASIC' | 'PREMIUM'
  /** @format date-time */
  expiresAt: string
}

export interface CreatePaymentDto {
  planType: 'FREE' | 'BASIC' | 'PREMIUM'
  amount: number
  currency?: string
}

export interface CreatePaymentResponseDto {
  paymentUrl: string
  transactionId: string
}

export interface CheckPaymentStatusDto {
  transactionId: string
}

export interface CheckPaymentStatusResponseDto {
  success: boolean
  status: string
  message: string | null
}

export interface CreateSubscriptionPaymentDto {
  /** UUID of subscription */
  subscriptionId: string
  /**
   * Payment amount
   * @format decimal
   */
  amount: number
  /** Type of payment */
  paymentType: 'stripe' | 'momo' | 'zalopay'
  /**
   * Date of payment
   * @format date-time
   */
  paymentDate: string
  /** Payment status */
  status: string
}

export interface FindOneSubscriptionPaymentResponseDto {
  payment: SubscriptionPayment
}

export interface SubscriptionPaymentResponse {
  data?: SubscriptionPayment[]
  pagination: PaginationOutputDto
}

export interface UpdateSubscriptionPaymentDto {
  /** @format double */
  amount?: number
  paymentType?: 'stripe' | 'momo' | 'zalopay'
  /** @format date-time */
  paymentDate?: string
  status?: string
}

export interface SentenceFieldsDto {
  en: string
  vi: string
  tag?: string[]
}

export interface SentenceResponseDto {
  _id: string
  fields: SentenceFieldsDto
}

export interface SearchSentenceResponseDto {
  language: string
  sentences: SentenceResponseDto[]
  suggestions: string[]
  tratu: string[]
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
     * No description
     *
     * @tags users
     * @name UserControllerFindAll
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
      this.request<UsersResponse, any>({
        path: `/api/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreate
     * @request POST:/api/users
     * @secure
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<CreateUserResponse, any>({
        path: `/api/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindOne
     * @request GET:/api/users/{id}
     * @secure
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdate
     * @request PUT:/api/users/{id}
     * @secure
     */
    userControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UpdateUserResponse, any>({
        path: `/api/users/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateProfile
     * @request PATCH:/api/users/{id}
     * @secure
     */
    userControllerUpdateProfile: (id: string, data: UpdateProfileUserDto, params: RequestParams = {}) =>
      this.request<UpdateUserResponse, any>({
        path: `/api/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerRemove
     * @request DELETE:/api/users/{id}
     * @secure
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteUserResponse, any>({
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
     * @tags auth
     * @name AuthControllerRequestPasswordReset
     * @summary Request password reset code
     * @request POST:/api/auth/password-reset/request
     */
    authControllerRequestPasswordReset: (data: RequestResetPasswordDto, params: RequestParams = {}) =>
      this.request<RequestResetPasswordResponse, void>({
        path: `/api/auth/password-reset/request`,
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
     * @name AuthControllerVerifyResetCode
     * @summary Verify reset code
     * @request POST:/api/auth/password-reset/verify
     */
    authControllerVerifyResetCode: (data: VerifyResetCodeDto, params: RequestParams = {}) =>
      this.request<VerifyResetCodeResponse, void>({
        path: `/api/auth/password-reset/verify`,
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
     * @name AuthControllerResetPassword
     * @summary Reset password with code
     * @request POST:/api/auth/password-reset/reset
     */
    authControllerResetPassword: (data: ResetPasswordDto, params: RequestParams = {}) =>
      this.request<ResetPasswordResponse, void>({
        path: `/api/auth/password-reset/reset`,
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
      this.request<FindOneSpaceResponseDto, any>({
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
     * @name SpaceControllerGetUserSpaces
     * @request GET:/api/spaces/user
     */
    spaceControllerGetUserSpaces: (
      query?: {
        /** @example 1 */
        page?: number
        /** @example 10 */
        perPage?: number
        /** @example "search term" */
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SpacesResponse, any>({
        path: `/api/spaces/user`,
        method: 'GET',
        query: query,
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
      this.request<FindOneSpaceResponseDto, any>({
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
     * @tags spaces
     * @name SpaceControllerGetSpaceCoursesJoined
     * @request GET:/api/spaces/{id}/courses/joined
     */
    spaceControllerGetSpaceCoursesJoined: (
      id: string,
      query: {
        page: number
        perPage: number
      },
      params: RequestParams = {}
    ) =>
      this.request<SpaceCoursesJoinedResponseDto, any>({
        path: `/api/spaces/${id}/courses/joined`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags spaces
     * @name SpaceControllerGetSpaceCourses
     * @request GET:/api/spaces/{id}/courses/explore
     */
    spaceControllerGetSpaceCourses: (
      id: string,
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
        language?: string
        minLevel?: string
        maxLevel?: string
        topics?: string[]
        courseType?: string
        status?: 'draft' | 'published' | 'private' | 'deleted'
      },
      params: RequestParams = {}
    ) =>
      this.request<SpaceCoursesAllResponseDto, any>({
        path: `/api/spaces/${id}/courses/explore`,
        method: 'GET',
        query: query,
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
        /** @example "published" */
        status?: 'draft' | 'published' | 'private' | 'deleted'
        spaceId?: string
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
        /** @example "published" */
        status?: 'draft' | 'published' | 'private' | 'deleted'
        spaceId?: string
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
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerCreate
     * @request POST:/api/vocabularies
     */
    vocabularyControllerCreate: (data: CreateVocabularyDto, params: RequestParams = {}) =>
      this.request<FindOneVocabularyResponseDto, any>({
        path: `/api/vocabularies`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerFindAll
     * @request GET:/api/vocabularies
     */
    vocabularyControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
        tags?: string[]
        dueDate?: boolean
        spaceId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<VocabularyResponse, any>({
        path: `/api/vocabularies`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerFindOne
     * @request GET:/api/vocabularies/{id}
     */
    vocabularyControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneVocabularyResponseDto, any>({
        path: `/api/vocabularies/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerUpdate
     * @request PATCH:/api/vocabularies/{id}
     */
    vocabularyControllerUpdate: (id: string, data: UpdateVocabularyDto, params: RequestParams = {}) =>
      this.request<FindOneVocabularyResponseDto, any>({
        path: `/api/vocabularies/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerDelete
     * @request DELETE:/api/vocabularies/{id}
     */
    vocabularyControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<FindOneVocabularyResponseDto, any>({
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
     * @tags stats
     * @name StatsControllerGetUserActivityStreak
     * @request GET:/api/stats/user/activity-streak
     */
    statsControllerGetUserActivityStreak: (
      query?: {
        /** @example "2024-01-01" */
        startDate?: string
        /** @example "2024-12-31" */
        endDate?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ActivityStreakResponseDto, any>({
        path: `/api/stats/user/activity-streak`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags stats
     * @name StatsControllerGetUserOverview
     * @request GET:/api/stats/user/overview
     */
    statsControllerGetUserOverview: (params: RequestParams = {}) =>
      this.request<UserOverviewDto, any>({
        path: `/api/stats/user/overview`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags stats
     * @name StatsControllerGetStatsOverview
     * @request GET:/api/stats/admin/overview
     */
    statsControllerGetStatsOverview: (params: RequestParams = {}) =>
      this.request<AdminStatsOverviewDto, any>({
        path: `/api/stats/admin/overview`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags stats
     * @name StatsControllerGetUserGrowth
     * @request GET:/api/stats/admin/users/growth
     */
    statsControllerGetUserGrowth: (params: RequestParams = {}) =>
      this.request<GrowthDataDto, any>({
        path: `/api/stats/admin/users/growth`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags stats
     * @name StatsControllerGetRevenueGrowth
     * @request GET:/api/stats/admin/revenue/growth
     */
    statsControllerGetRevenueGrowth: (params: RequestParams = {}) =>
      this.request<GrowthDataDto, any>({
        path: `/api/stats/admin/revenue/growth`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerCreateCourse
     * @request POST:/api/courses
     */
    courseControllerCreateCourse: (data: CreateCourseDto, params: RequestParams = {}) =>
      this.request<CourseResponseDto, any>({
        path: `/api/courses`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerGetCourses
     * @request GET:/api/courses
     */
    courseControllerGetCourses: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<CourseListResponseDto, any>({
        path: `/api/courses`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerUpdate
     * @request PATCH:/api/courses/{id}
     */
    courseControllerUpdate: (id: string, data: UpdateCourseDto, params: RequestParams = {}) =>
      this.request<CourseResponseDto, any>({
        path: `/api/courses/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerDelete
     * @request DELETE:/api/courses/{id}
     */
    courseControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<CourseResponseDto, any>({
        path: `/api/courses/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerGetCourseById
     * @request GET:/api/courses/{id}
     */
    courseControllerGetCourseById: (id: string, params: RequestParams = {}) =>
      this.request<CourseResponseDto, any>({
        path: `/api/courses/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerGetCourseUnits
     * @request GET:/api/courses/{id}/units
     */
    courseControllerGetCourseUnits: (
      id: string,
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<CourseUnitResponseDto, any>({
        path: `/api/courses/${id}/units`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerJoinCourse
     * @request PATCH:/api/courses/{id}/join
     */
    courseControllerJoinCourse: (id: string, data: JoinCourseRequestDto, params: RequestParams = {}) =>
      this.request<JoinCourseResponseDto, any>({
        path: `/api/courses/${id}/join`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerLearnCourse
     * @request GET:/api/courses/{id}/learn
     */
    courseControllerLearnCourse: (id: string, params: RequestParams = {}) =>
      this.request<CourseLearnResponseDto, any>({
        path: `/api/courses/${id}/learn`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerCheckJoin
     * @request GET:/api/courses/{id}/check-join/{spaceId}
     */
    courseControllerCheckJoin: (id: string, spaceId: string, params: RequestParams = {}) =>
      this.request<CheckJoinedCourseResponseDto, any>({
        path: `/api/courses/${id}/check-join/${spaceId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerGetCourseProgress
     * @request GET:/api/courses/{id}/progress
     */
    courseControllerGetCourseProgress: (id: string, params: RequestParams = {}) =>
      this.request<CourseProgressResponseDto, any>({
        path: `/api/courses/${id}/progress`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerUpdateCourseProgress
     * @request PATCH:/api/courses/{id}/progress
     */
    courseControllerUpdateCourseProgress: (id: string, data: UpdateCourseProgressDto, params: RequestParams = {}) =>
      this.request<CourseProgressResponseDto, any>({
        path: `/api/courses/${id}/progress`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerCreateUnit
     * @request POST:/api/units
     */
    unitControllerCreateUnit: (data: CreateUnitDto, params: RequestParams = {}) =>
      this.request<GetUnitResponseDto, any>({
        path: `/api/units`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerGetUnit
     * @request GET:/api/units/{id}
     */
    unitControllerGetUnit: (id: string, params: RequestParams = {}) =>
      this.request<GetUnitResponseDto, any>({
        path: `/api/units/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerDeleteUnit
     * @request DELETE:/api/units/{id}
     */
    unitControllerDeleteUnit: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/units/${id}`,
        method: 'DELETE',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerUpdateUnit
     * @request PATCH:/api/units/{id}
     */
    unitControllerUpdateUnit: (id: string, data: UpdateUnitDto, params: RequestParams = {}) =>
      this.request<GetUnitResponseDto, any>({
        path: `/api/units/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerLearnUnit
     * @request GET:/api/units/{id}/learn
     */
    unitControllerLearnUnit: (id: string, params: RequestParams = {}) =>
      this.request<UnitLearnResponseDto, any>({
        path: `/api/units/${id}/learn`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerLearnLesson
     * @request GET:/api/units/{id}/lessons/{lessonId}/learn
     */
    unitControllerLearnLesson: (id: string, lessonId: string, params: RequestParams = {}) =>
      this.request<LessonResponseDto, any>({
        path: `/api/units/${id}/lessons/${lessonId}/learn`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerBulkUpdateUnits
     * @request PUT:/api/units/bulk-update
     */
    unitControllerBulkUpdateUnits: (data: BulkUpdateUnitsDto, params: RequestParams = {}) =>
      this.request<BulkUpdateUnitsResponseDto[], any>({
        path: `/api/units/bulk-update`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerGetLessonNote
     * @request GET:/api/units/{id}/lessons/{lessonId}/note
     */
    unitControllerGetLessonNote: (id: string, lessonId: string, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/units/${id}/lessons/${lessonId}/note`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerGetLesson
     * @request GET:/api/units/{id}/lessons/{lessonId}
     */
    unitControllerGetLesson: (id: string, lessonId: string, params: RequestParams = {}) =>
      this.request<LessonResponseDto, any>({
        path: `/api/units/${id}/lessons/${lessonId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerUpdateLesson
     * @request PATCH:/api/units/{id}/lessons/{lessonId}
     */
    unitControllerUpdateLesson: (id: string, lessonId: string, data: UpdateLessonDto, params: RequestParams = {}) =>
      this.request<LessonResponseDto, any>({
        path: `/api/units/${id}/lessons/${lessonId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerDeleteLesson
     * @request DELETE:/api/units/{id}/lessons/{lessonId}
     */
    unitControllerDeleteLesson: (id: string, lessonId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/units/${id}/lessons/${lessonId}`,
        method: 'DELETE',
        ...params
      }),

    /**
     * No description
     *
     * @tags units
     * @name UnitControllerCreateLesson
     * @request POST:/api/units/{id}/lessons
     */
    unitControllerCreateLesson: (id: string, data: CreateLessonDto, params: RequestParams = {}) =>
      this.request<LessonResponseDto, any>({
        path: `/api/units/${id}/lessons`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerGetLesson
     * @request GET:/api/lessons/{id}
     */
    lessonControllerGetLesson: (id: string, params: RequestParams = {}) =>
      this.request<LessonResponseDto, any>({
        path: `/api/lessons/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerCreate
     * @request POST:/api/notes
     */
    noteControllerCreate: (data: CreateNoteDto, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/notes`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerFindAll
     * @request GET:/api/notes
     */
    noteControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
        tags?: string[]
        isBookmarked?: boolean
        spaceId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<NotesResponse, any>({
        path: `/api/notes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerCreateOrUpdate
     * @request POST:/api/notes/upsert
     */
    noteControllerCreateOrUpdate: (data: CreateNoteDto, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/notes/upsert`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerFindOne
     * @request GET:/api/notes/{id}
     */
    noteControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/notes/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerUpdate
     * @request PATCH:/api/notes/{id}
     */
    noteControllerUpdate: (id: string, data: UpdateNoteDto, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/notes/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags notes
     * @name NoteControllerDelete
     * @request DELETE:/api/notes/{id}
     */
    noteControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<FindOneNoteResponseDto, any>({
        path: `/api/notes/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTranslate
     * @request POST:/api/ai/translate
     */
    aiControllerTranslate: (data: TranslateDto, params: RequestParams = {}) =>
      this.request<TranslateResponseDto, any>({
        path: `/api/ai/translate`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerCheckGrammar
     * @request POST:/api/ai/check-grammar
     */
    aiControllerCheckGrammar: (data: CheckGrammarDto, params: RequestParams = {}) =>
      this.request<CheckGrammarResponseDto, any>({
        path: `/api/ai/check-grammar`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeechTest
     * @request GET:/api/ai/tts/test
     */
    aiControllerTextToSpeechTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/tts/test`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeech
     * @request POST:/api/ai/tts/convert
     */
    aiControllerTextToSpeech: (data: TextToSpeechDto, params: RequestParams = {}) =>
      this.request<TextToSpeechResponseDto, any>({
        path: `/api/ai/tts/convert`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeechAll
     * @request GET:/api/ai/tts/all
     */
    aiControllerTextToSpeechAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/tts/all`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscriptions
     * @name SubscriptionControllerGetStatus
     * @request GET:/api/subscriptions/status
     */
    subscriptionControllerGetStatus: (params: RequestParams = {}) =>
      this.request<FindSubscriptionStatusResponseDto, any>({
        path: `/api/subscriptions/status`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscriptions
     * @name SubscriptionControllerCreatePayment
     * @request POST:/api/subscriptions/payment/{provider}
     */
    subscriptionControllerCreatePayment: (
      provider: 'stripe' | 'momo' | 'zalopay',
      data: CreatePaymentDto,
      params: RequestParams = {}
    ) =>
      this.request<CreatePaymentResponseDto, any>({
        path: `/api/subscriptions/payment/${provider}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscriptions
     * @name SubscriptionControllerCheckPaymentStatus
     * @request POST:/api/subscriptions/payment/{provider}/check-status
     */
    subscriptionControllerCheckPaymentStatus: (
      provider: 'stripe' | 'momo' | 'zalopay',
      data: CheckPaymentStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<CheckPaymentStatusResponseDto, any>({
        path: `/api/subscriptions/payment/${provider}/check-status`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscriptions
     * @name SubscriptionControllerPaymentCallback
     * @request POST:/api/subscriptions/payment/{provider}/callback
     */
    subscriptionControllerPaymentCallback: (provider: 'stripe' | 'momo' | 'zalopay', params: RequestParams = {}) =>
      this.request<CheckPaymentStatusResponseDto, any>({
        path: `/api/subscriptions/payment/${provider}/callback`,
        method: 'POST',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerCreate
     * @request POST:/api/subscription-payments
     */
    subscriptionPaymentControllerCreate: (data: CreateSubscriptionPaymentDto, params: RequestParams = {}) =>
      this.request<FindOneSubscriptionPaymentResponseDto, any>({
        path: `/api/subscription-payments`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerFindAll
     * @request GET:/api/subscription-payments
     */
    subscriptionPaymentControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionPaymentResponse, any>({
        path: `/api/subscription-payments`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerFindAllMyHistory
     * @request GET:/api/subscription-payments/history
     */
    subscriptionPaymentControllerFindAllMyHistory: (
      query?: {
        /** @default 1 */
        page?: number
        /** @default 10 */
        perPage?: number
        search?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionPaymentResponse, any>({
        path: `/api/subscription-payments/history`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerFindOne
     * @request GET:/api/subscription-payments/{id}
     */
    subscriptionPaymentControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FindOneSubscriptionPaymentResponseDto, any>({
        path: `/api/subscription-payments/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerUpdate
     * @request PATCH:/api/subscription-payments/{id}
     */
    subscriptionPaymentControllerUpdate: (id: string, data: UpdateSubscriptionPaymentDto, params: RequestParams = {}) =>
      this.request<FindOneSubscriptionPaymentResponseDto, any>({
        path: `/api/subscription-payments/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags subscription-payments
     * @name SubscriptionPaymentControllerRemove
     * @request DELETE:/api/subscription-payments/{id}
     */
    subscriptionPaymentControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<FindOneSubscriptionPaymentResponseDto, any>({
        path: `/api/subscription-payments/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags dictionary
     * @name DictionaryControllerSearchSentences
     * @request GET:/api/dictionary/search
     */
    dictionaryControllerSearchSentences: (
      query: {
        query: string
      },
      params: RequestParams = {}
    ) =>
      this.request<SearchSentenceResponseDto, any>({
        path: `/api/dictionary/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      })
  }
}
