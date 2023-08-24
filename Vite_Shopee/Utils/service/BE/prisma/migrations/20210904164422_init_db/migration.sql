-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('local', 'google', 'cognito', 'facebook', 'aad');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('manage', 'create', 'read', 'update', 'delete');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('company', 'servicecentre');

-- CreateEnum
CREATE TYPE "GlobalSettingType" AS ENUM ('operatingHour', 'operatingHourException');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('bookedIn', 'checkedIn', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "SelectType" AS ENUM ('single', 'multiple');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "state" TEXT,
    "suburb" TEXT,
    "postCode" TEXT,
    "password" TEXT,
    "provider" "Provider" DEFAULT E'local',
    "gender" "Gender" DEFAULT E'unknown',
    "currentHashedRefreshToken" TEXT,
    "currentHashedForgotPasswordToken" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "isTwoFactorAuthenticationEnabled" BOOLEAN DEFAULT false,
    "twoFactorAuthenticationSecret" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "state" TEXT,
    "suburb" TEXT,
    "postCode" TEXT,
    "nrma" TEXT,
    "companyName" TEXT,
    "password" TEXT,
    "provider" "Provider" DEFAULT E'local',
    "gender" "Gender" DEFAULT E'unknown',
    "currentHashedRefreshToken" TEXT,
    "currentHashedForgotPasswordToken" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "note" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "isGlobal" BOOLEAN DEFAULT false,
    "isDefault" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,
    "permissions" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDefaultPermission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "organizationId" INTEGER,
    "permissions" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "organizationId" INTEGER,
    "roleId" INTEGER,
    "permissions" JSONB,
    "forbidden" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "content" TEXT,
    "authorId" INTEGER,
    "published" BOOLEAN DEFAULT false,
    "organizationId" INTEGER,
    "price" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suburb" (
    "id" SERIAL NOT NULL,
    "suburb" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "stateSuburbCode" TEXT NOT NULL,
    "stateIsoCode" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "urbanArea" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timezone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abc" TEXT,
    "acn" TEXT,
    "contactFirstName" TEXT,
    "contactLastName" TEXT,
    "contactPhoneNumber" TEXT,
    "contactEmail" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "state" TEXT,
    "postCode" TEXT,
    "suburb" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "timezone" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "parentId" INTEGER,
    "type" "OrganizationType" NOT NULL DEFAULT E'servicecentre',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "groupName" TEXT,
    "disabledActions" "Action"[],
    "isGlobal" BOOLEAN DEFAULT false,
    "order" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalSetting" (
    "id" SERIAL NOT NULL,
    "setting" JSONB,
    "settingType" "GlobalSettingType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingHour" (
    "id" SERIAL NOT NULL,
    "schedule" JSONB,
    "exception" JSONB,
    "organizationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "appointment" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT E'bookedIn',
    "isShuttleServiceRequired" BOOLEAN DEFAULT false,
    "isAfterHoursKeyDropOff" BOOLEAN DEFAULT false,
    "promotionCodeId" INTEGER,
    "note" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingService" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "serviceId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingPackage" (
    "id" SERIAL NOT NULL,
    "bookingServiceId" INTEGER NOT NULL,
    "packageId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "slId" TEXT,
    "rego" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT,
    "year" INTEGER,
    "color" TEXT,
    "transmission" TEXT,
    "cylinder" TEXT,
    "customerId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "selectType" "SelectType" NOT NULL DEFAULT E'single',
    "order" INTEGER,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "selectType" "SelectType" NOT NULL DEFAULT E'single',
    "order" INTEGER,
    "globalServiceId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalPackage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "outlinedImage" TEXT,
    "solidImage" TEXT,
    "description" TEXT,
    "jobCode" TEXT NOT NULL,
    "estHours" DOUBLE PRECISION NOT NULL,
    "estValue" DOUBLE PRECISION NOT NULL,
    "order" INTEGER,
    "globalServiceId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "outlinedImage" TEXT,
    "solidImage" TEXT,
    "description" TEXT,
    "jobCode" TEXT NOT NULL,
    "estHours" DOUBLE PRECISION NOT NULL,
    "estValue" DOUBLE PRECISION NOT NULL,
    "order" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "globalPackageId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalPromotionCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "promoCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "promoCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "globalPromotionCodeId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalCapacity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availableTime" JSONB,
    "breakTime" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacity" (
    "id" SERIAL NOT NULL,
    "exception" JSONB,
    "globalCapacityId" INTEGER NOT NULL,
    "technicianId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "User.firstName_lastName_isActive_index" ON "User"("firstName", "lastName", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer.firstName_lastName_isActive_index" ON "Customer"("firstName", "lastName", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Role.code_unique" ON "Role"("code");

-- CreateIndex
CREATE INDEX "Role.name_isActive_index" ON "Role"("name", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission.roleId_unique" ON "RolePermission"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDefaultPermission.userId_organizationId_unique" ON "UserDefaultPermission"("userId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission.userId_organizationId_roleId_unique" ON "UserPermission"("userId", "organizationId", "roleId");

-- CreateIndex
CREATE INDEX "News.title_index" ON "News"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Suburb.stateSuburbCode_unique" ON "Suburb"("stateSuburbCode");

-- CreateIndex
CREATE INDEX "Suburb.postCode_index" ON "Suburb"("postCode");

-- CreateIndex
CREATE INDEX "Organization.name_parentId_index" ON "Organization"("name", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource.code_unique" ON "Resource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalSetting.settingType_unique" ON "GlobalSetting"("settingType");

-- CreateIndex
CREATE INDEX "GlobalSetting.settingType_index" ON "GlobalSetting"("settingType");

-- CreateIndex
CREATE UNIQUE INDEX "OperatingHour.organizationId_unique" ON "OperatingHour"("organizationId");

-- CreateIndex
CREATE INDEX "OperatingHour.organizationId_index" ON "OperatingHour"("organizationId");

-- CreateIndex
CREATE INDEX "Booking.organizationId_index" ON "Booking"("organizationId");

-- CreateIndex
CREATE INDEX "BookingService.bookingId_index" ON "BookingService"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingService.serviceId_bookingId_unique" ON "BookingService"("serviceId", "bookingId");

-- CreateIndex
CREATE INDEX "BookingPackage.bookingServiceId_index" ON "BookingPackage"("bookingServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingPackage.bookingServiceId_packageId_unique" ON "BookingPackage"("bookingServiceId", "packageId");

-- CreateIndex
CREATE INDEX "Vehicle.customerId_index" ON "Vehicle"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalService.name_unique" ON "GlobalService"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service.name_organizationId_unique" ON "Service"("name", "organizationId");

-- CreateIndex
CREATE INDEX "GlobalPackage.globalServiceId_index" ON "GlobalPackage"("globalServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalPackage.name_globalServiceId_unique" ON "GlobalPackage"("name", "globalServiceId");

-- CreateIndex
CREATE INDEX "Package.serviceId_index" ON "Package"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Package.name_serviceId_unique" ON "Package"("name", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalPromotionCode.promoCode_unique" ON "GlobalPromotionCode"("promoCode");

-- CreateIndex
CREATE INDEX "PromotionCode.organizationId_index" ON "PromotionCode"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionCode.promoCode_organizationId_unique" ON "PromotionCode"("promoCode", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalCapacity.name_unique" ON "GlobalCapacity"("name");

-- CreateIndex
CREATE INDEX "Capacity.organizationId_index" ON "Capacity"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity.globalCapacityId_technicianId_organizationId_unique" ON "Capacity"("globalCapacityId", "technicianId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_technicianId_unique" ON "Capacity"("technicianId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToUser_AB_unique" ON "_OrganizationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToUser_B_index" ON "_OrganizationToUser"("B");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDefaultPermission" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDefaultPermission" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY ("parentId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingHour" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD FOREIGN KEY ("promotionCodeId") REFERENCES "PromotionCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingPackage" ADD FOREIGN KEY ("bookingServiceId") REFERENCES "BookingService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingPackage" ADD FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD FOREIGN KEY ("globalServiceId") REFERENCES "GlobalService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalPackage" ADD FOREIGN KEY ("globalServiceId") REFERENCES "GlobalService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD FOREIGN KEY ("globalPackageId") REFERENCES "GlobalPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCode" ADD FOREIGN KEY ("globalPromotionCodeId") REFERENCES "GlobalPromotionCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionCode" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacity" ADD FOREIGN KEY ("globalCapacityId") REFERENCES "GlobalCapacity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacity" ADD FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capacity" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
