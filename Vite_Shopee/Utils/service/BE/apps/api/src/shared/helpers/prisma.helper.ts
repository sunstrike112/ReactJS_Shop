import { Prisma } from '@prisma/client'
import { map } from 'rxjs/operators';

interface FieldSchema {
  name: string;
  kind: string;
  isList?: boolean;
  isRequired: boolean;
  isUnique?: boolean;
  isId: boolean;
  isReadOnly?: boolean;
  type: string;
  hasDefaultValue?: boolean;
  default?: any;
  relationName?: string;
  relationFromFields?: any[];
  relationToFields?: any[];
  relationOnDelete?: string;
  isGenerated?: boolean;
  isUpdatedAt?: boolean;
}

interface TransformFieldSchema {
  name: string;
  kind: string;
  isRequired: boolean;
  isUnique?: boolean;
  isId: boolean;
  isReadOnly?: boolean;
  type: string;
  hasDefaultValue?: boolean;
  default?: any;
  isList?: boolean;
  relationName?: string;
  relationFromFields?: any[];
  relationToFields?: any[];
  relationOnDelete?: string;
  isGenerated?: boolean;
}

export const transformField = (fieldSchema: FieldSchema): TransformFieldSchema => {
  return {
    name: fieldSchema.name,
    kind: fieldSchema.kind,
    isRequired: fieldSchema.isRequired,
    isUnique: fieldSchema.isUnique,
    isId: fieldSchema.isId,
    isReadOnly: fieldSchema.isReadOnly,
    type: fieldSchema.type,
    isList: fieldSchema.isList,
    relationName: fieldSchema.relationName,
    isGenerated: fieldSchema.isGenerated
  }
}

export const modelSchema = (modelName: string) => {
  let fieldsShema = Prisma.dmmf.datamodel.models.find((item: any) => item.name === modelName) ?? null;
  if (!fieldsShema) return fieldsShema;
  return fieldsShema.fields.map((fieldSchema: FieldSchema) => {
    return transformField(fieldSchema);
  })
}

export const listRelations = (modelName: string) => {
  const items = modelSchema(modelName);
  return items.filter((item) => item.relationName !== undefined)
    .map((item: any) => item.name)
}
