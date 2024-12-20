export const TEST_IDS = {
  GOOGLE_BTN: 'google-login-btn'
} as const

export const MESSAGES = {
  SUCCESS: 'Successfully logged in with Google',
  ERROR: 'Google login failed. Please try again.',
  DUPLICATE: 'This Google account is already registered'
} as const

export enum RouteNames {
  EMPTY = '',
  Home = '/',
  Dashboard = '/app',
  About = '/about',
  Blog = '/blog',

  Auth = '/auth',
  Register = '/register',
  Login = '/login',
  ME = '/me',
  Logout = '/logout',

  LearningSpace = '/learning-space',
  LearningSpaceDetail = '/learning-space/:id',

  Vocabulary = '/vocabulary',
  VocabularyDetail = '/vocabulary/:id',

  Essay = '/essay',
  EssayCreate = '/essay/create',
  EssayUpdate = '/essay/update/:id',
  EssayDetail = '/essay/:id',

  Note = '/note',
  NoteDetail = '/note/:id',
  NoteCreate = '/note/create',

  MyCourse = '/my-course',
  Course = '/course',
  CourseDetail = '/course/:id',
  CourseLearn = '/course/:id/learn',

  UnitDetail = '/unit/:id',
  UnitCreate = '/unit/admin/create',

  Thanks = '/thanks',
  Pricing = '/pricing',

  Setting = '/setting',

  // Admin
  AdminLogin = '/admin',
  AdminDashboard = '/admin/dashboard',
  AdminUserManager = '/admin/user-manager',
  AdminCourseManager = '/admin/course-manager',
  AdminCourseManagerDetail = '/admin/course-manager/:id',
  AdminCourseManagerCreate = '/admin/course-manager/create',
  AdminUnitManager = '/admin/unit-manager/:id',
  AdminLessonDetail = '/admin/unit/:id/lesson',

  ForgotPassword = '/forgot-password',
  UNAUTHORIZED = '/401',
  SERVER_ERROR = '/500'
}
