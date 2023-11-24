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

import type { PothosSimpleObjectsPlugin } from '.'
import { ListResultShape, ListShapeForType } from './types'

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      fuselist: PothosSimpleObjectsPlugin<Types>
    }
    export interface UserSchemaTypes {
      ListWrapper: {}
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      listObject: <Type extends OutputType<Types>>(listOptions: {
        name: string
        type: Type
      }) => ObjectRef<ListShapeForType<Types, Type, false>>
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
        ShapeFromTypeParam<Types, Type, false>
      > = ListResultShape<ShapeFromTypeParam<Types, Type, false>>,
    > {
      type: Type
      args?: Args
      nullable?: NodeNullability
      resolve: Resolver<
        ParentShape,
        InputShapeFromFields<Args>,
        Types['Context'],
        ListShapeForType<Types, Type, Nullable, ConnectionResult>,
        ResolveReturnShape
      >
    }

    export interface RootFieldBuilder<
      Types extends SchemaTypes,
      ParentShape,
      Kind extends FieldKind = FieldKind,
    > {
      simpleList: <
        Type extends OutputType<Types>,
        Args extends InputFieldMap,
        Nullable extends boolean,
        ResolveShape,
        ResolveReturnShape,
        ConnectionResult extends ListResultShape<
          ShapeFromTypeParam<Types, Type, false>
        > = ListResultShape<ShapeFromTypeParam<Types, Type, false>>,
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
              Nullable,
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
