import { Prisma } from "@prisma/client";
import { GeneratedCapacityEntity } from "./capacity.dto";

export class GeneratedGlobalCapacityEntity {
  id: number;
  name: string;
  availableTime?: Prisma.JsonValue;
  breakTime?: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  capacities: GeneratedCapacityEntity[];
}
