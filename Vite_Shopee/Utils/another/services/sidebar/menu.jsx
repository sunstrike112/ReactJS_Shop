import { FiSettings } from 'react-icons/fi';
import { MdDashboard, MdGroups2 } from 'react-icons/md';
import { BiImport } from 'react-icons/bi';
import { FaHourglassHalf } from 'react-icons/fa';
import { BsCloudArrowUp } from 'react-icons/bs';
import { TbChartDots } from 'react-icons/tb';
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';
import { UserRole } from '../permission/roleUser';

const { Admin, HR, Staff, Anonymous } = UserRole;
const trans = (value) => transOutHook(value, 'sidebar');

const LinkItems = [
  {
    name: trans('dashboard'),
    icon: MdDashboard,
    id: 1,
    subMenu: [
      {
        name: `${trans('dashboard1')}`,
        url: `${ROUTES.dashboard}/alert_confirmation`,
        id: 1.1,
      },
      {
        name: `${trans('dashboard2')}`,
        url: `${ROUTES.dashboard}/es_interview`,
        id: 1.2,
      },
      {
        name: `${trans('dashboard3')}`,
        url: `${ROUTES.dashboard}/interview_record`,
        id: 1.3,
      },
    ],
  },
  // {
  //   name: trans('summary'),
  //   icon: BsPieChartFill,
  //   id: 6,
  //   subMenu: [
  //     { name: 'サマリ1', url: `${ROUTES.summary}/coming-soon_1`, id: 6.1 },
  //     { name: 'サマリ2', url: `${ROUTES.summary}/coming-soon_2`, id: 6.2 },
  //     { name: 'サマリ3', url: `${ROUTES.summary}/coming-soon_3`, id: 6.3 },
  //     { name: 'サマリ4', url: `${ROUTES.summary}/coming-soon_4`, id: 6.4 },
  //   ],
  // },
  { name: trans('basic_info'), icon: MdGroups2, url: ROUTES.basic_info, id: 5 },
  {
    name: trans('management'),
    icon: TbChartDots,
    id: 3,
    subMenu: [
      { name: trans('code_master'), url: `${ROUTES.master}/${ROUTES.code_master}/history`, id: 3.1 },
      // { name: trans('training_master'), url: `${ROUTES.master}/${ROUTES.training_master}`, id: 3.2 },
      // {
      //   name: trans('company_policy'),
      //   url: `${ROUTES.master}/${ROUTES.company_policy}`,
      //   id: 3.3,
      // },
      {
        name: trans('es_manager'),
        url: `${ROUTES.master}/es_master`,
        id: 3.4,
      },
    ],
  },
  {
    name: trans('import'),
    icon: BiImport,
    id: 5,
    subMenu: [
      {
        name: trans('import1'),
        url: `${ROUTES.import}/all`,
      },
      {
        name: trans('import2'),
        url: `${ROUTES.import}/overtime`,
      },
    ],
  },
  {
    name: trans('file_upload'),
    icon: BsCloudArrowUp,
    id: 7,
    url: ROUTES.file_upload,
  },
  {
    name: trans('work_flow'),
    icon: FaHourglassHalf,
    id: 8,
    subMenu: [
      {
        name: trans('process_list'),
        url: `${ROUTES.work_flow}/process_list`,
      },
      {
        name: trans('import_process_list'),
        url: `${ROUTES.work_flow}/import_process_list`,
      },
    ],
  },
  {
    name: trans('setting'),
    icon: FiSettings,
    id: 4,
    subMenu: [
      // {
      //   name: trans('create_account'),
      //   url: `${ROUTES.setting}/${ROUTES.create_account}`,
      //   id: 4.1,
      //   title: 'Create account',
      // },
      { name: trans('user_manage'), url: `${ROUTES.setting}/${ROUTES.user}`, id: 4.1 },
      { name: trans('role_settings'), url: `${ROUTES.setting}/${ROUTES.roles}`, id: 4.2 },
    ],
  },
];
const RoleItems = {
  [Admin]: 'All',
  [HR]: 'All',
  [Staff]: 'All',
  [Anonymous]: [1],
  VIEWER: 'All',
  ADMIN: 'All',
};

export { LinkItems, RoleItems };
