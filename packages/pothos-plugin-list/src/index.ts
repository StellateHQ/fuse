import './global-types'
import SchemaBuilder, {
  BasePlugin,
  FieldKind,
  FieldMap,
  FieldNullability,
  InputFieldMap,
  InterfaceFieldsShape,
  InterfaceParam,
  InterfaceRef,
  Normalize,
  ObjectFieldsShape,
  ObjectRef,
  ParentShape,
  SchemaTypes,
} from '@pothos/core'
import { OutputShapeFromFields } from './types'

const pluginName = 'fuse-list' as const

export default pluginName

export class PothosSimpleObjectsPlugin<
  Types extends SchemaTypes,
> extends BasePlugin<Types> {}

SchemaBuilder.registerPlugin(pluginName, PothosSimpleObjectsPlugin)

const proto = SchemaBuilder.prototype as PothosSchemaTypes.FieldBuilder<
  SchemaTypes,
  unknown,
  FieldKind
>

proto.simpleList = function simpleList(
  { type, edgesNullable, nodeNullable, ...fieldOptions },
  connectionOptionsOrRef = {} as never,
  edgeOptionsOrRef = {} as never,
) {
  const connectionRef =
    connectionOptionsOrRef instanceof ObjectRef
      ? connectionOptionsOrRef
      : this.builder.objectRef<ConnectionShape<SchemaTypes, unknown, boolean>>(
          'Unnamed connection',
        )
  const fieldRef = this.field({
    ...fieldOptions,
    type: connectionRef,
    args: {
      ...fieldOptions.args,
    },
    resolve: fieldOptions.resolve as never,
  } as never)

  // eslint-disable-next-line no-param-reassign
  options.fields = (t) => {
    const fields = originalFields(t)

    Object.keys(fields).forEach((key) => {
      this.configStore.onFieldUse(fields[key], (config) => {
        if (config.kind === 'Object') {
          // eslint-disable-next-line no-param-reassign
          config.resolve = (parent) =>
            (parent as Record<string, unknown>)[key] as Readonly<unknown>
        }
      })
    })

    return fields
  }

  this.objectType(ref, options as PothosSchemaTypes.ObjectTypeOptions)

  if (extraFields) {
    this.objectFields(ref, extraFields)
  }

  return ref
}
