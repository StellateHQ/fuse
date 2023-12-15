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

export class PothosListPlugin<
  Types extends SchemaTypes,
> extends BasePlugin<Types> {}

try {
  SchemaBuilder.registerPlugin(pluginName, PothosListPlugin)
} catch (e) {}

const fieldBuilderProto =
  RootFieldBuilder.prototype as PothosSchemaTypes.RootFieldBuilder<
    SchemaTypes,
    unknown,
    FieldKind
  >

fieldBuilderProto.list = function list(fieldOptions) {
  const ref =
    this.builder.objectRef<ListShape<SchemaTypes, unknown, boolean>>(
      'Unnamed list',
    )

  const fieldRef = this.field({
    ...fieldOptions,
    type: ref,
    args: {
      ...fieldOptions.args,
    },
    resolve: fieldOptions.resolve as never,
  } as never)

  this.builder.configStore.onFieldUse(fieldRef, (fieldConfig) => {
    const name = fieldConfig.name[0].toUpperCase() + fieldConfig.name.slice(1)
    const listName = `${this.typename}${name}${
      fieldConfig.name.toLowerCase().endsWith('list') ? '' : 'List'
    }`

    this.builder.listObject({
      type: fieldOptions.type,
      name: listName,
      nullable: fieldOptions.nodeNullable ?? true,
    })

    this.builder.configStore.associateRefWithName(ref, listName)
  })

  return fieldRef
}
