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
  EssayDetail = '/essay/:id',

  Quiz = '/quiz',
  QuizDetail = '/quiz/:id',
  QuizCreate = '/quiz/create',

  Setting = '/setting',

  ForgotPassword = '/forgot-password',
  UNAUTHORIZED = '/401',
  SERVER_ERROR = '/500'
}
