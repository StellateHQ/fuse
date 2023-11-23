import './global-types'
import './schema-builder'
import SchemaBuilder, {
  BasePlugin,
  FieldKind,
  SchemaTypes,
  RootFieldBuilder,
} from '@pothos/core'
import { ListShape } from './types'

const pluginName = 'fuselist' as const

export default pluginName

export class PothosSimpleObjectsPlugin<
  Types extends SchemaTypes,
> extends BasePlugin<Types> {}

SchemaBuilder.registerPlugin(pluginName, PothosSimpleObjectsPlugin)

const fieldBuilderProto =
  RootFieldBuilder.prototype as PothosSchemaTypes.RootFieldBuilder<
    SchemaTypes,
    unknown,
    FieldKind
  >

fieldBuilderProto.simpleList = function simpleList(fieldOptions) {
  const connectionRef =
    this.builder.objectRef<ListShape<SchemaTypes, unknown, boolean>>(
      'Unnamed list',
    )

  const fieldRef = this.field({
    ...fieldOptions,
    type: connectionRef,
    args: {
      ...fieldOptions.args,
    },
    resolve: fieldOptions.resolve as never,
  } as never)

  this.builder.configStore.onFieldUse(fieldRef, (fieldConfig) => {
    const name = fieldConfig.name[0].toUpperCase() + fieldConfig.name.slice(1)
    const connectionName = `${this.typename}${name}${
      fieldConfig.name.toLowerCase().endsWith('connection') ? '' : 'Connection'
    }`

    this.builder.listObject({
      type: fieldOptions.type,
      name: connectionName,
    })

    this.builder.configStore.associateRefWithName(connectionRef, connectionName)
  })

  return fieldRef
}
