import {
  SchemaTypes,
  FieldKind,
  OutputType,
  InputFieldMap,
  FieldRef,
  FieldOptionsFromKind,
} from '@pothos/core'

import type { PothosSimpleObjectsPlugin } from '.'
import { ConnectionShapeForType } from './types'

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      fuselist: PothosSimpleObjectsPlugin<Types>
    }
    export interface UserSchemaTypes {
      ListWrapper: {}
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      listObject: <
        Type extends OutputType<Types>,
        ResolveReturnShape,
        NodeNullability extends boolean,
      >(connectionOptions: {
        name: string
        type: Type
      }) => ObjectRef<
        ConnectionShapeForType<Types, Type, false, NodeNullability>
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
      >(
        options: FieldOptionsFromKind<
          Types,
          ParentShape,
          Type,
          Nullable,
          InputFieldMap extends Args ? {} : Args,
          Kind,
          ResolveShape,
          ResolveReturnShape
        >,
      ) => FieldRef<ConnectionShapeForType<Types, Type, Nullable, Nullable>>
    }
  }
}
