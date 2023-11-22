import {
  SchemaTypes,
  FieldNullability,
  MaybePromise,
  ObjectRef,
  ShapeFromTypeParam,
  OutputType,
} from '@pothos/core'

export interface ConnectionResultShape<
  Types extends SchemaTypes,
  T,
  NodeNullable extends FieldNullability<
    [unknown]
  > = Types['DefaultFieldNullability'],
> {
  nodes: MaybePromise<
    ObjectRef<{
      cursor: string
      node: NodeNullable extends false ? T : T | null | undefined
    }>
  >
}

export type ConnectionShape<
  Types extends SchemaTypes,
  T,
  Nullable,
  NodeNullable extends boolean = Types['DefaultFieldNullability'],
  ConnectionResult extends ConnectionResultShape<
    Types,
    T,
    NodeNullable
  > = ConnectionResultShape<Types, T, NodeNullable>,
> =
  | (Nullable extends false ? never : null | undefined)
  | (ConnectionResult & Types['ListWrapper'])

export type ConnectionShapeFromBaseShape<
  Types extends SchemaTypes,
  Shape,
  Nullable extends boolean,
> = ConnectionShape<Types, Shape, Nullable>

export type ConnectionShapeForType<
  Types extends SchemaTypes,
  Type extends OutputType<Types>,
  Nullable extends boolean,
  NodeNullability extends boolean,
  ConnectionResult extends ConnectionResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  > = ConnectionResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  >,
> = ConnectionShape<
  Types,
  ShapeFromTypeParam<Types, Type, false>,
  Nullable,
  NodeNullability,
  ConnectionResult
>

export type ConnectionShapeFromResolve<
  Types extends SchemaTypes,
  Type extends OutputType<Types>,
  Nullable extends boolean,
  EdgeNullability extends FieldNullability<[unknown]>,
  NodeNullability extends boolean,
  Resolved,
  ConnectionResult extends ConnectionResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  > = ConnectionResultShape<
    Types,
    ShapeFromTypeParam<Types, Type, false>,
    NodeNullability
  >,
> = Resolved extends Promise<infer T>
  ? NonNullable<T> extends ConnectionShapeForType<
      Types,
      Type,
      Nullable,
      NodeNullability
    >
    ? NonNullable<T>
    : ConnectionShapeForType<
        Types,
        Type,
        Nullable,
        NodeNullability,
        ConnectionResult
      > &
        NonNullable<T>
  : Resolved extends ConnectionShapeForType<
        Types,
        Type,
        Nullable,
        NodeNullability,
        ConnectionResult
      >
    ? NonNullable<Resolved>
    : ConnectionShapeForType<
        Types,
        Type,
        Nullable,
        NodeNullability,
        ConnectionResult
      > &
        NonNullable<Resolved>
