import {
  SchemaTypes,
  FieldKind,
  OutputType,
  InputFieldMap,
  FieldRef,
  FieldOptionsFromKind,
  InputFieldsFromShape,
  ShapeFromTypeParam,
  Resolver,
  InputShapeFromFields,
} from '@pothos/core'

import type { PothosListPlugin } from '.'
import { ListResultShape, ListShapeForType } from './types'

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      fuselist: PothosListPlugin<Types>
    }
    export interface UserSchemaTypes {
      ListWrapper: {}
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      listObject: <
        Type extends OutputType<Types>,
        NodeNullable extends boolean,
      >(listOptions: {
        name: string
        type: Type
        nullable: NodeNullable
      }) => ObjectRef<ListShapeForType<Types, Type, NodeNullable>>
    }

    export interface ListFieldOptions<
      Types extends SchemaTypes,
      ParentShape,
      Type extends OutputType<Types>,
      Nullable extends boolean,
      NodeNullability extends boolean,
      Args extends InputFieldMap,
      ResolveReturnShape,
      ConnectionResult extends ListResultShape<
        ShapeFromTypeParam<Types, Type, NodeNullability>
      > = ListResultShape<ShapeFromTypeParam<Types, Type, NodeNullability>>,
    > {
      type: Type
      args?: Args
      nullable?: Nullable
      nodeNullable?: NodeNullability
      resolve: Resolver<
        ParentShape,
        InputShapeFromFields<Args>,
        Types['Context'],
        ListShapeForType<Types, Type, NodeNullability, ConnectionResult>,
        ResolveReturnShape
      >
    }

    export interface RootFieldBuilder<
      Types extends SchemaTypes,
      ParentShape,
      Kind extends FieldKind = FieldKind,
    > {
      list: <
        Type extends OutputType<Types>,
        Args extends InputFieldMap,
        Nullable extends boolean,
        NodeNullable extends boolean,
        ResolveShape,
        ResolveReturnShape,
        ConnectionResult extends ListResultShape<
          ShapeFromTypeParam<Types, Type, NodeNullable>
        > = ListResultShape<ShapeFromTypeParam<Types, Type, NodeNullable>>,
      >(
        options: FieldOptionsFromKind<
          Types,
          ParentShape,
          Type,
          Nullable,
          InputFieldsFromShape<InputFieldMap extends Args ? {} : Args>,
          Kind,
          ResolveShape,
          ResolveReturnShape
        > extends infer FieldOptions
          ? ListFieldOptions<
              Types,
              FieldOptions extends {
                resolve?: (parent: infer P, ...args: any[]) => unknown
              }
                ? P
                : unknown extends ResolveShape
                  ? ParentShape
                  : ResolveShape,
              Type,
              Nullable,
              NodeNullable,
              Args,
              ResolveReturnShape,
              ConnectionResult
            > &
              Omit<FieldOptions, 'args' | 'resolve' | 'type'>
          : never,
      ) => FieldRef<ListShapeForType<Types, Type, Nullable>>
    }
  }
}
