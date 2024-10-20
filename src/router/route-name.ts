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

  Vocabulary = '/learning-space/:id/vocabulary',
  VocabularyDetail = '/learning-space/:id/vocabulary/:subId',

  Feed = '/feed',
  FeedDetail = '/feed/:id',

  Essay = '/learning-space/:id/essay',
  EssayCreate = '/learning-space/:id/essay/create',
  EssayDetail = '/learning-space/:id/essay/:subId',

  Quiz = '/learning-space/:id/quiz',
  QuizDetail = '/learning-space/:id/quiz/:subId',
  QuizCreate = '/learning-space/:id/quiz/create',

  Setting = '/setting',

  ForgotPassword = '/forgot-password',
  UNAUTHORIZED = '/401',
  SERVER_ERROR = '/500'
}
