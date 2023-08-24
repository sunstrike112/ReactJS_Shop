import { UserRole } from './roleUser';

const { SuperAdmin, Admin, SpecialUser, VIPUser, User } = UserRole;

const permissions = {
  [Admin]: {
    read: 'all',
    delete: 'all',
    create: 'all',
  },
  [User]: {
    read: ['path1', 'path2'],
    delete: ['path1'],
    create: [],
  },
  [SpecialUser]: {
    read: ['path1', 'path2'],
    delete: ['path1'],
    create: [],
  },
  [VIPUser]: {
    read: ['path1', 'path2'],
    delete: ['path1'],
    create: [],
  },
  [SuperAdmin]: {
    read: 'all',
    delete: 'all',
    create: 'all',
  },
};

export { permissions };
