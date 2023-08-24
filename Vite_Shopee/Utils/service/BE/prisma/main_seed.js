/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashValue(value, rounds = 10) {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(value, salt);
}

async function main() {
  const company = await prisma.organization.create({
    data: {
      name: 'Global',
      type: 'company',
      isActive: true,
    },
  });

  const systemRoles = [
    {
      name: 'Super Admin',
      code: 'administrator',
      level: 1,
      isGlobal: true,
      isDefault: true,
      isActive: true,
      permissions: [{ action: 'manage', resource: 'all' }],
    },
    {
      name: 'Store Manager',
      code: 'store-manager',
      level: 1,
      isGlobal: false,
      isDefault: true,
      isActive: true,
      permissions: [],
    },
    {
      name: 'Service Advisor',
      code: 'service-advisor',
      level: 1,
      isGlobal: false,
      isDefault: true,
      isActive: true,
      permissions: [],
    },
    {
      name: 'Foreman',
      code: 'foreman',
      level: 1,
      isGlobal: false,
      isDefault: true,
      isActive: true,
      permissions: [],
    },
    {
      name: 'Technician',
      code: 'technician',
      level: 1,
      isGlobal: false,
      isDefault: true,
      isActive: true,
      permissions: [],
    },
    {
      name: 'Apprentice',
      code: 'apprentice',
      level: 1,
      isGlobal: false,
      isDefault: true,
      isActive: true,
      permissions: [],
    },
  ];

  let adminRole = null;

  await Promise.all(
    systemRoles.map(async (systemRole) => {
      const systemRoleDto = {
        name: systemRole.name,
        code: systemRole.code,
        level: systemRole.level,
        isGlobal: systemRole.isGlobal,
        isDefault: systemRole.isDefault,
        isActive: systemRole.isActive,
      };

      const role = await prisma.role.upsert({
        where: { code: systemRole.code },
        update: systemRoleDto,
        create: systemRoleDto,
      });

      if (systemRole.permissions) {
        await prisma.rolePermission.upsert({
          where: { roleId: role.id },
          update: {
            roleId: role.id,
            permissions: systemRole.permissions,
          },
          create: {
            roleId: role.id,
            permissions: systemRole.permissions,
          },
        });
      }

      if (systemRoleDto.code === 'administrator') {
        adminRole = role;
      }
    })
  );

  const userDTO = {
    email: 'admin@example.com',
    firstName: 'Administrator',
    lastName: 'Mr.',
    password: await hashValue('12345678'),
    roles: {
      connect: [{ id: adminRole.id }],
    },
    organizations: {
      connect: [{ id: company.id }],
    },
    news: {
      create: {
        title: 'Admin News',
        content: 'Admin news description',
        organizationId: company.id,
        published: true,
      },
    },
  };

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    create: userDTO,
    update: userDTO,
    include: {
      roles: true,
      news: true,
    },
  });

  await prisma.userPermission.create({
    data: {
      userId: user.id,
      organizationId: company.id,
      roleId: adminRole.id,
    }
  });

  await prisma.userDefaultPermission.create({
    data: {
      userId: user.id,
      organizationId: company.id,
      permissions: [{
        action: "manage",
        resource: "Organization",
      }],
    }
  });

  const resources = [
    {
      name: 'Dashboard',
      code: 'Dashboard',
      groupName: null,
      order: 1,
      disabledActions: ['create', 'update', 'delete'],
    },
    { name: 'Booking Management', code: 'Booking', groupName: null, order: 2 },
    {
      name: 'Customer Management',
      code: 'Customer',
      groupName: null,
      order: 3,
    },
    { name: 'User Management', code: 'User', groupName: null, order: 4 },
    {
      name: 'Operating Hours',
      code: 'OperatingHour',
      groupName: 'Store Management',
      order: 5,
    },
    {
      name: 'Promotion Codes',
      code: 'PromotionCode',
      groupName: 'Store Management',
      order: 6,
    },
    {
      name: 'Package Categories',
      code: 'Package',
      groupName: 'Store Management',
      order: 7,
    },
    {
      name: 'Store Capacity',
      code: 'Capacity',
      groupName: 'Store Management',
      order: 8,
    },
    {
      name: 'Roles & Permissions',
      code: 'UserPermission',
      groupName: null,
      order: 9,
    },
    {
      name: 'Operating Hours',
      code: 'GlobalSetting',
      groupName: 'General Settings',
      isGlobal: true,
      order: 10,
    },
    {
      name: 'Promotion Codes',
      code: 'GlobalPromotionCode',
      groupName: 'General Settings',
      isGlobal: true,
      order: 11,
    },
    {
      name: 'Package Categories',
      code: 'GlobalPackage',
      groupName: 'General Settings',
      isGlobal: true,
      order: 12,
    },
    {
      name: 'Store Capacity',
      code: 'GlobalCapacity',
      groupName: 'General Settings',
      isGlobal: true,
      order: 13,
    },
    {
      name: 'Manage Roles',
      code: 'Role',
      groupName: 'General Settings',
      isGlobal: true,
      order: 14,
    },
  ];

  await Promise.all(
    resources.map(async (resourceItem) => {
      const resourceItemDto = {
        name: resourceItem.name,
        code: resourceItem.code,
        groupName: resourceItem.groupName,
        order: resourceItem.order,
        disabledActions: resourceItem.disabledActions && resourceItem.disabledActions.length ? resourceItem.disabledActions : [],
        isGlobal: resourceItem.isGlobal !== undefined ? resourceItem.isGlobal : false,
      };

      await prisma.resource.upsert({
        where: { code: resourceItem.code },
        create: resourceItemDto,
        update: resourceItemDto,
      });
    })
  );
}

let isSuccess = true;

main()
  .catch((e) => {
    isSuccess = false;
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(isSuccess ? 0 : 1);
  });
