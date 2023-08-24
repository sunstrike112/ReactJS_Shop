/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashValue(value, rounds = 10) {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(value, salt);
}

async function main() {
  // Technician User
  const technicianDTO = {
    email: 'technician@example.com',
    firstName: 'Technician',
    lastName: 'Mr.',
    password: await hashValue('12345678'),
    roles: {
      connect: [{ id: 1 }],
    },
    organizations: {
      connect: [{ id: 2 }],
    }
  }

  const technicianUser = await prisma.user.upsert({
    where: { email: 'technician@example.com' },
    create: technicianDTO,
    update: technicianDTO,
    include: {
      roles: true,
      news: true,
    },
  });

  await prisma.userPermission.create({
    data: {
      userId: technicianUser.id,
      organizationId: 2,
      roleId: 1,
    }
  });

  //Global Capacity
  const globalCapacity = [
    {
      name: 'Preset 1',
      availableTime: [
        {
          dayOfWeek: 1, // Monday
          startTime: '9:00',
          endTime: '18:00',
        },
        {
          dayOfWeek: 2, // Tuesday
          startTime: '9:00',
          endTime: '18:00',
        },
        {
          dayOfWeek: 3, // Wednesday
          startTime: '9:00',
          endTime: '18:00',
        },
        {
          dayOfWeek: 4, // Thursday
          startTime: '9:00',
          endTime: '18:00',
        },
        {
          dayOfWeek: 5, // Friday
          startTime: '9:00',
          endTime: '18:00',
        },
        {
          dayOfWeek: 6, // Saturday
          startTime: '9:00',
          endTime: '18:00',
        },
      ],
      breakTime: [
        {
          dayOfWeek: 1, // Monday
          startTime: '12:00',
          endTime: '13:15',
        },
        {
          dayOfWeek: 2, // Tuesday
          startTime: '12:00',
          endTime: '13:15',
        },
        {
          dayOfWeek: 3, // Wednesday
          startTime: '12:00',
          endTime: '13:15',
        },
        {
          dayOfWeek: 4, // Thursday
          startTime: '12:00',
          endTime: '13:15',
        },
        {
          dayOfWeek: 5, // Friday
          startTime: '12:00',
          endTime: '13:15',
        },
        {
          dayOfWeek: 6, // Saturday
          startTime: '12:00',
          endTime: '13:15',
        },
      ],
    },
  ];

  await Promise.all(
    globalCapacity.map(async (preset) => {
      await prisma.globalCapacity.create({
        data: preset,
      });
    }),
  );

  // Store Capacity
  const capacity = [
    {
      globalCapacityId: 1,
      technicianId: 2, // User ID with technician role
      organizationId: 2,
      exception: [
        {
          startDate: '2021-08-24 10:00:00',
          endDate: '2021-08-25 15:30:00',
          note: '',
        },
      ],
    },
  ];

  await Promise.all(
    capacity.map(async (setting) => {
      await prisma.capacity.create({
        data: setting,
      });
    }),
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
