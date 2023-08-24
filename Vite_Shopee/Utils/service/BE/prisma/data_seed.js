/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let organizationsJson = fs.readFileSync(__dirname + '/organizations.json', 'utf8');
  const organizations = JSON.parse(organizationsJson).data;

  // organization - store
  for (let i = 0; i < organizations.length; ++i) {
    const _organization = organizations[i];
    const _operatingHour = _organization.operatingHour;
    const organizationDto = {
      name: _organization.name,
      addressLine1: _organization.addressLine1,
      contactPhoneNumber: _organization.contactPhoneNumber,
      contactEmail: _organization.contactEmail,
      latitude: _organization.latitude,
      longitude: _organization.longitude,
      timezone: _organization.timezone,
      state: _organization.state,
      postCode: _organization.postCode,
      suburb: _organization.suburb
    };
    const newOrganization = await prisma.organization.create({
      data: organizationDto,
    });

    const operatingHourDto = {
      schedule: _operatingHour.schedule,
      organizationId: newOrganization.id,
    }

    await prisma.operatingHour.create({
      data: operatingHourDto,
    });
  }

  // Global Service - Global Package
  const globalServices = [
    {
      name: 'Service',
      image: '/images/services/service/service.svg',
      selectType: 'single',
      description: '',
      order: 1,
    },
    {
      name: 'Repairs',
      image: '/images/services/repairs/repairs.svg',
      selectType: 'multiple',
      description: '',
      order: 2,
    },
    {
      name: 'Inspections',
      image: '/images/services/inspections/inspections.svg',
      selectType: 'multiple',
      description: '',
      order: 3,
    },
    {
      name: 'Others',
      image: '/images/services/others/others.svg',
      selectType: 'multiple',
      description: '',
      order: 4,
    },
  ];

  const globalPackages = {
    Service: [
      {
        name: 'Logbook Service',
        outlinedImage: '/images/services/service/packages/logbook-service_outlined.svg',
        solidImage: '/images/services/service/packages/logbook-service_solid.svg',
        description: 'Completed to manufacturer specifications so that your new car warranty is maintained. Service starts from $217 (RRP)',
        jobCode: 'LBS1',
        estHours: 1.5,
        estValue: 0,
        order: 1,
      },
      {
        name: 'Essential Service',
        outlinedImage: '/images/services/service/packages/essential-service_outlined.svg',
        solidImage: '/images/services/service/packages/essential-service_solid.svg',
        description: 'Our basic Essential Service is suitable for standard vehicles. Service starts from $198 (RRP)',
        jobCode: 'ES1',
        estHours: 1.5,
        estValue: 0,
        order: 2,
      },
      {
        name: 'Essential Service Plus',
        outlinedImage: '/images/services/service/packages/essential-service-plus_outlined.svg',
        solidImage: '/images/services/service/packages/essential-service-plus_solid.svg',
        description: 'Essential Service with a synthetic oil replacement for European vehicles. Service starts from $340 (RRP)',
        jobCode: 'ESP1',
        estHours: 1.5,
        estValue: 0,
        order: 3,
      },
      {
        name: 'Essential Service Synthetic',
        outlinedImage: '/images/services/service/packages/essential-service-synthetic_outlined.svg',
        solidImage: '/images/services/service/packages/essential-service-synthetic_solid.svg',
        description: 'Essential Service with a synthetic oil replacement included. Ideal for high performance vehicles. Service starts from $250 (RRP)',
        jobCode: 'ESS1',
        estHours: 1.5,
        estValue: 0,
        order: 4,
      },
    ],
    Repairs: [
      {
        name: 'Brakes',
        outlinedImage: '/images/services/repairs/packages/brakes_outlined.svg',
        solidImage: '/images/services/repairs/packages/brakes_solid.svg',
        description: '',
        jobCode: 'BS01',
        estHours: 1.0,
        estValue: 0,
        order: 1,
      },
      {
        name: 'Steering & Suspension',
        outlinedImage: '/images/services/repairs/packages/steering-suspension_outlined.svg',
        solidImage: '/images/services/repairs/packages/steering-suspension_solid.svg',
        description: '',
        jobCode: 'SI01',
        estHours: 1.0,
        estValue: 0,
        order: 2,
      },
      {
        name: 'Cluth & Transmission Repair',
        outlinedImage: '/images/services/repairs/packages/cluth-transmission-repair_outlined.svg',
        solidImage: '/images/services/repairs/packages/cluth-transmission-repair_solid.svg',
        description: '',
        jobCode: 'CT01',
        estHours: 1.0,
        estValue: 0,
        order: 3,
      },
      {
        name: 'Tyres',
        outlinedImage: '/images/services/repairs/packages/tyres_outlined.svg',
        solidImage: '/images/services/repairs/packages/tyres_solid.svg',
        description: '',
        jobCode: 'TR1',
        estHours: 1.0,
        estValue: 0,
        order: 4,
      },
      {
        name: 'Auto Electrical',
        outlinedImage: '/images/services/repairs/packages/auto-electrical_outlined.svg',
        solidImage: '/images/services/repairs/packages/auto-electrical_solid.svg',
        description: '',
        jobCode: 'AE01',
        estHours: 1.0,
        estValue: 0,
        order: 5,
      },
      {
        name: 'Battery',
        outlinedImage: '/images/services/repairs/packages/battery_outlined.svg',
        solidImage: '/images/services/repairs/packages/battery_solid.svg',
        description: '',
        jobCode: 'BR1',
        estHours: 1.0,
        estValue: 0,
        order: 6,
      },
      {
        name: 'Exhaust Repairs',
        outlinedImage: '/images/services/repairs/packages/exhaust-repairs_outlined.svg',
        solidImage: '/images/services/repairs/packages/exhaust-repairs_solid.svg',
        description: '',
        jobCode: 'ESI1',
        estHours: 1.0,
        estValue: 0,
        order: 7,
      },
      {
        name: 'Cooling Systems',
        outlinedImage: '/images/services/repairs/packages/cooling-systems_outlined.svg',
        solidImage: '/images/services/repairs/packages/cooling-systems_solid.svg',
        description: '',
        jobCode: 'FS01',
        estHours: 1.0,
        estValue: 0,
        order: 8,
      },
      {
        name: 'Air Conditioning & Re-gas',
        outlinedImage: '/images/services/repairs/packages/air-conditioning-regas_outlined.svg',
        solidImage: '/images/services/repairs/packages/air-conditioning-regas_solid.svg',
        description: '',
        jobCode: 'AC1',
        estHours: 1.0,
        estValue: 0,
        order: 9,
      },
      {
        name: 'Other (Please specify in Notes)',
        outlinedImage: '/images/services/repairs/packages/other-repair_outlined.svg',
        solidImage: '/images/services/repairs/packages/other-repair_solid.svg',
        description: '',
        jobCode: 'OTH',
        estHours: 0.5,
        estValue: 0,
        order: 10,
      },
    ],
    Inspections: [
      {
        name: 'eSafety Inspection (Pink Slip)',
        outlinedImage: '/images/services/inspections/packages/esafety-inspection_outlined.svg',
        solidImage: '/images/services/inspections/packages/esafety-inspection_solid.svg',
        description: 'For renewing your rego. Valid for 6 months. Cars ($42); motorcycles ($23); caravans/trailers ($21 without brakes; $33 with brake)',
        jobCode: 'RI1',
        estHours: 0.5,
        estValue: 0,
        order: 1,
      },
      {
        name: 'Comprehensive Safety Inspection',
        outlinedImage: '/images/services/inspections/packages/comprehensive-safety-inspection_outlined.svg',
        solidImage: '/images/services/inspections/packages/comprehensive-safety-inspection_solid.svg',
        description: 'Includes a 100+ point safety check on your brakes, suspension, tyres, battery and more (RRP $80)',
        jobCode: 'VI1',
        estHours: 2.5,
        estValue: 0,
        order: 2,
      },
      {
        name: 'Vehicle Inspection',
        outlinedImage: '/images/services/inspections/packages/vehicle-inspection_outlined.svg',
        solidImage: '/images/services/inspections/packages/vehicle-inspection_solid.svg',
        description: 'Pre-purchase vehicle inspection for used cars. Prices start from $259 (RRP)',
        jobCode: 'SC01',
        estHours: 0.5,
        estValue: 0,
        order: 3,
      },
      {
        name: 'Diagnostic Inspection (Please specify in Notes)',
        outlinedImage: '/images/services/inspections/packages/diagnostic-inspection_outlined.svg',
        solidImage: '/images/services/inspections/packages/diagnostic-inspection_solid.svg',
        description: '',
        jobCode: 'INSP',
        estHours: 0.5,
        estValue: 0,
        order: 4,
      },
    ],
    Others: [
      {
        name: 'Child Restraint Installation',
        outlinedImage: '/images/services/others/packages/child-restraint-installation_outlined.svg',
        solidImage: '/images/services/others/packages/child-restraint-installation_solid.svg',
        description: 'Accredited child restraint installations (RRP $55)',
        jobCode: 'CR1',
        estHours: 0.5,
        estValue: 0,
        order: 1,
      },
      {
        name: 'Other (Please specify in Notes)',
        outlinedImage: '/images/services/others/packages/other_outlined.svg',
        solidImage: '/images/services/others/packages/other_solid.svg',
        description: '',
        jobCode: 'OTH',
        estHours: 0.5,
        estValue: 0,
        order: 2,
      },
    ],
  };

  await Promise.all(
    globalServices.map(async (service) => {
      const createdService = await prisma.globalService.upsert({
        where: {
          name: service.name,
        },
        create: service,
        update: service,
      });

      const packageList = globalPackages[`${createdService.name}`];
      await Promise.all(
        packageList.map(async (package) => {
          await prisma.globalPackage.upsert({
            where: {
              name_globalServiceId: {
                name: package.name,
                globalServiceId: createdService.id,
              }
            },
            create: {
              ...package,
              globalService: { connect: { id: createdService.id } },
            },
            update: {
              ...package,
              globalService: { connect: { id: createdService.id } },
            },
          });
        })
      );
    })
  );

  // Service
  const allGlobalService = await prisma.globalService.findMany();
  const allOrganization = await prisma.organization.findMany({
    where: { type: 'servicecentre' },
  });
  await Promise.all(
    allOrganization.map(async (organization) => {
      await Promise.all(
        allGlobalService.map(async (gService) => {
          const allGobalPackages = await prisma.globalPackage.findMany({
            where: { globalServiceId: gService.id },
          });
          const serviceDto = {
            name: gService.name,
            image: gService.image,
            description: gService.description,
            selectType: gService.selectType,
            organizationId: organization.id,
            globalServiceId: gService.id,
            order: gService.order,
          };

          const service = await prisma.service.create({
            data: serviceDto,
          });

          await Promise.all(
            allGobalPackages.map(async (gPackage) => {
              const packageDto = {
                name: gPackage.name,
                outlinedImage: gPackage.outlinedImage,
                solidImage: gPackage.solidImage,
                description: gPackage.description,
                jobCode: gPackage.jobCode,
                estHours: gPackage.estHours,
                estValue: gPackage.estValue,
                selectType: gPackage.selectType,
                order: gPackage.order,
              };
    
              await prisma.package.create({
                data: {
                  ...packageDto,
                  service: { connect: { id: service.id } },
                  globalPackage: { connect: { id: gPackage.id } },
                },
              });
            }),
          );
      }))
    }),
  );

  // Global Setting
  const globalSetting = [
    {
      setting: [
        {
          dayOfWeek: 1, // Monday
          startTime: '07:30',
          endTime: '17:30',
          isClose: false,
        },
        {
          dayOfWeek: 2, // Tuesday
          startTime: '07:30',
          endTime: '17:30',
          isClose: false,
        },
        {
          dayOfWeek: 3, // Wednesday
          startTime: '07:30',
          endTime: '17:30',
          isClose: false,
        },
        {
          dayOfWeek: 4, // Thursday
          startTime: '07:30',
          endTime: '17:30',
          isClose: false,
        },
        {
          dayOfWeek: 5, // Friday
          startTime: '07:30',
          endTime: '17:30',
          isClose: false,
        },
        {
          dayOfWeek: 6, // Saturday
          startTime: '08:00',
          endTime: '12:00',
          isClose: false,
        },
        {
          dayOfWeek: 7, // Sunday
          startTime: '00:00',
          endTime: '24:00',
          isClose: true,
        },
      ],
      settingType: 'operatingHour',
    },
    // {
    //   setting: [
    //     {
    //       startDate: '2021-08-24 04:01:31.694',
    //       endDate: '2021-08-25 04:01:31.694',
    //       note: '',
    //       isRepeat: true,
    //       repeatType: 'yearly', // daily - weekly - monthly - yearly
    //     },
    //   ],
    //   settingType: 'operatingHourException',
    // },
  ];

  await Promise.all(
    globalSetting.map(async (setting) => {
      await prisma.globalSetting.create({
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
