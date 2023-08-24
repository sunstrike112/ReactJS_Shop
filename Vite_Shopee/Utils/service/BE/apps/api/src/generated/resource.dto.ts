import { GeneratedAction } from "./action.enum";

export class GeneratedResourceEntity {
  id: number;
  name: string;
  code: string;
  groupName?: string;
  disabledActions: GeneratedAction[];
  isGlobal?: boolean;
  order?: number;
}
