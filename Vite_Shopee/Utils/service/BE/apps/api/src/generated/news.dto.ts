import { GeneratedUserEntity } from "./user.dto";
import { GeneratedOrganizationEntity } from "./organization.dto";

export class GeneratedNewsEntity {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  authorId?: number;
  published?: boolean;
  author?: GeneratedUserEntity;
  organizationId?: number;
  organization?: GeneratedOrganizationEntity;
  price?: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
