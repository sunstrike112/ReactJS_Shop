import { Prisma } from "@prisma/client";
import { GeneratedGlobalSettingType } from "./global-setting-type.enum";

export class GeneratedGlobalSettingEntity {
  id: number;
  setting?: Prisma.JsonValue;
  settingType: GeneratedGlobalSettingType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
