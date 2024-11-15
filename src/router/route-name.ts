export enum RouteNames {
  EMPTY = '',
  Home = '/',
  Dashboard = '/app',

  Auth = '/auth',
  Register = '/register',
  Login = '/login',
  ME = '/me',
  Logout = '/logout',

  LearningSpace = '/learning-space',
  LearningSpaceDetail = '/learning-space/:id',

  Vocabulary = '/vocabulary',
  VocabularyDetail = '/vocabulary/:id',

  // Feed = '/feed',
  // FeedDetail = '/feed/:id',

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

  Setting = '/setting',

  ForgotPassword = '/forgot-password',
  UNAUTHORIZED = '/401',
  SERVER_ERROR = '/500'
}
