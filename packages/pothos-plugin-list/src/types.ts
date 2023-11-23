import {
  SchemaTypes,
  FieldNullability,
  MaybePromise,
  ShapeFromTypeParam,
  OutputType,
} from '@pothos/core'

export interface ListResultShape<
  Types extends SchemaTypes,
  T,
  NodeNullable extends FieldNullability<
    [unknown]
  > = Types['DefaultFieldNullability'],
> {
  totalCount?: number | null
  nodes: MaybePromise<NodeNullable extends false ? T : T | null | undefined>[]
}

export type ListShape<
  Types extends SchemaTypes,
  T,
  Nullable,
  NodeNullable extends boolean = Types['DefaultFieldNullability'],
  ListResult extends ListResultShape<Types, T, NodeNullable> = ListResultShape<
    Types,
    T,
    NodeNullable
  >,
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
  NodeNullability extends boolean,
  ListResult extends ListResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  > = ListResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  >,
> = ListShape<
  Types,
  ShapeFromTypeParam<Types, Type, false>,
  Nullable,
  NodeNullability,
  ListResult
>

export type ListShapeFromResolve<
  Types extends SchemaTypes,
  Type extends OutputType<Types>,
  Nullable extends boolean,
  EdgeNullability extends FieldNullability<[unknown]>,
  NodeNullability extends boolean,
  Resolved,
  ListResult extends ListResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  > = ListResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  >,
> = Resolved extends Promise<infer T>
  ? NonNullable<T> extends ListShapeForType<
      Types,
      Type,
      Nullable,
      NodeNullability
    >
    ? NonNullable<T>
    : ListShapeForType<Types, Type, Nullable, NodeNullability, ListResult> &
        NonNullable<T>
  : Resolved extends ListShapeForType<
        Types,
        Type,
        Nullable,
        NodeNullability,
        ListResult
      >
    ? NonNullable<Resolved>
    : ListShapeForType<Types, Type, Nullable, NodeNullability, ListResult> &
        NonNullable<Resolved>
