import {
  FieldMap,
  FieldRef,
  NullableToOptional,
  SchemaTypes,
} from '@pothos/core'

export type SimpleObjectFieldsShape<
  Types extends SchemaTypes,
  Fields extends FieldMap,
> = (
  t: PothosSchemaTypes.RootFieldBuilder<Types, unknown, 'SimpleObject'>,
) => Fields

export type SimpleInterfaceFieldsShape<
  Types extends SchemaTypes,
  Fields extends FieldMap,
> = (
  t: PothosSchemaTypes.RootFieldBuilder<Types, unknown, 'SimpleInterface'>,
) => Fields

export type OutputShapeFromFields<Fields extends FieldMap> =
  NullableToOptional<{
    [K in keyof Fields]: Fields[K] extends FieldRef<infer T> ? T : never
  }>
