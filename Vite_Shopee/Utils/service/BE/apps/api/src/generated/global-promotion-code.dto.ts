import { GeneratedPromotionCodeEntity } from "./promotion-code.dto";

export class GeneratedGlobalPromotionCodeEntity {
  id: number;
  name: string;
  description?: string;
  promoCode: string;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  promotionCodes: GeneratedPromotionCodeEntity[];
}
