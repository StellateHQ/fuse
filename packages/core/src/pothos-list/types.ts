import {
  SchemaTypes,
  FieldNullability,
  MaybePromise,
  ShapeFromTypeParam,
  OutputType,
} from '@pothos/core'

export interface ListResultShape<T> {
  totalCount?: number | null
  nodes: MaybePromise<T>[]
}

export type ListShape<
  Types extends SchemaTypes,
  T,
  Nullable,
  ListResult extends ListResultShape<T> = ListResultShape<T>,
> =
  | (Nullable extends false ? never : null | undefined)
  | (ListResult & Types['ListWrapper'])

export type ListShapeFromBaseShape<
  Types extends SchemaTypes,
  Shape,
  Nullable extends boolean,
> = ListShape<Types, Shape, Nullable>

export type ListShapeForType<
  Types extends SchemaTypes,
  Type extends OutputType<Types>,
  Nullable extends boolean,
  ListResult extends ListResultShape<
    ShapeFromTypeParam<Types, Type, false>
  > = ListResultShape<ShapeFromTypeParam<Types, Type, false>>,
> = ListShape<
  Types,
  ShapeFromTypeParam<Types, Type, false>,
  Nullable,
  ListResult
>

export type ListShapeFromResolve<
  Types extends SchemaTypes,
  Type extends OutputType<Types>,
  Nullable extends boolean,
  Resolved,
  ListResult extends ListResultShape<
    ShapeFromTypeParam<Types, Type, false>
  > = ListResultShape<ShapeFromTypeParam<Types, Type, false>>,
> = Resolved extends Promise<infer T>
  ? NonNullable<T> extends ListShapeForType<Types, Type, Nullable>
    ? NonNullable<T>
    : ListShapeForType<Types, Type, Nullable, ListResult> & NonNullable<T>
  : Resolved extends ListShapeForType<Types, Type, Nullable, ListResult>
    ? NonNullable<Resolved>
    : ListShapeForType<Types, Type, Nullable, ListResult> &
        NonNullable<Resolved>
