// SVG assets
// MUI Icons
import AccountCircle from '@mui/icons-material/AccountCircle'
import DayNightIcon from '@mui/icons-material/Brightness4'
import CloseIcon from '@mui/icons-material/Close'
import DangerousIcon from '@mui/icons-material/Dangerous'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import MenuIcon from '@mui/icons-material/Menu'
import DefaultIcon from '@mui/icons-material/MoreHoriz'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Moon, Sun } from 'lucide-react/'

import Assignment from '~/components/common/AppIcon/icons/Assignment'
import Chat from '~/components/common/AppIcon/icons/Chat'
import Check from '~/components/common/AppIcon/icons/Check'
import Course from '~/components/common/AppIcon/icons/Course'
import Delete from '~/components/common/AppIcon/icons/Delete'
import Edit from '~/components/common/AppIcon/icons/Edit'
import Essay from '~/components/common/AppIcon/icons/Essay'
import GoogleIcon from '~/components/common/AppIcon/icons/GoogleIcon'
import LearningSpace from '~/components/common/AppIcon/icons/LearningSpace'
import Like from '~/components/common/AppIcon/icons/Like'
import Logo from '~/components/common/AppIcon/icons/Logo'
import Note from '~/components/common/AppIcon/icons/Note'
import Plus from '~/components/common/AppIcon/icons/Plus'
import Quiz from '~/components/common/AppIcon/icons/Quiz'
import Remove from '~/components/common/AppIcon/icons/Remove'
import Save from '~/components/common/AppIcon/icons/Save'
import SearchCorrect from '~/components/common/AppIcon/icons/SearchCorrect'
import Switch from '~/components/common/AppIcon/icons/Switch'
import User from '~/components/common/AppIcon/icons/User'
import Vocabulary from '~/components/common/AppIcon/icons/Vocabulary'

export type IconName = keyof typeof ICONS

/**
 * How to use:
 * 1. Import all required React, MUI or other SVG icons into this file.
 * 2. Add icons with "unique lowercase names" into ICONS object. Lowercase is a must!
 * 3. Use icons everywhere in the App by their names in <Icon icon="xxx" /> component
 * Important: properties of ICONS object MUST be lowercase!
 * Note: You can use camelCase or UPPERCASE in the <Icon icon="someIconByName" /> component
 */
export const ICONS /* Note: Setting type disables property autocomplete :( was - : Record<string, ComponentType> */ = {
  default: DefaultIcon,
  logo: Logo,
  close: CloseIcon,
  menu: MenuIcon,
  settings: SettingsIcon,
  visibilityon: VisibilityIcon,
  visibilityoff: VisibilityOffIcon,
  daynight: DayNightIcon,
  night: Moon,
  day: Sun,
  search: SearchIcon,
  info: InfoIcon,
  home: HomeIcon,
  account: AccountCircle,
  signup: PersonAddIcon,
  login: PersonIcon,
  logout: ExitToAppIcon,
  notifications: NotificationsIcon,
  error: DangerousIcon,
  google: GoogleIcon,
  space: LearningSpace,
  vocabulary: Vocabulary,
  assignment: Assignment,
  essay: Essay,
  quiz: Quiz,
  like: Like,
  chat: Chat,
  plus: Plus,
  delete: Delete,
  edit: Edit,
  searchcorrect: SearchCorrect,
  switch: Switch,
  check: Check,
  remove: Remove,
  save: Save,
  note: Note,
  course: Course,
  user: User
}
