import SchemaBuilder, { ObjectRef, SchemaTypes, verifyRef } from '@pothos/core'
import { ListShape } from './types'

const schemaBuilderProto =
  SchemaBuilder.prototype as PothosSchemaTypes.SchemaBuilder<SchemaTypes>

export const listRefs = new WeakMap<
  PothosSchemaTypes.SchemaBuilder<SchemaTypes>,
  ObjectRef<ListShape<SchemaTypes, unknown, boolean>>[]
>()

export const globalListFieldsMap = new WeakMap<
  PothosSchemaTypes.SchemaBuilder<SchemaTypes>,
  ((ref: ObjectRef<ListShape<SchemaTypes, unknown, boolean>>) => void)[]
>()

schemaBuilderProto.listObject = function listObject({
  type,
  name: listName,
  nullable,
}) {
  verifyRef(type)

  const listRef =
    this.objectRef<ListShape<SchemaTypes, unknown, false>>(listName)

  console.log('node nullability', nullable)

  this.objectType(listRef, {
    fields: (t) => ({
      totalCount: t.int({
        nullable: true,
        resolve: (parent) => parent.totalCount || null,
      }),
      nodes: t.field({
        nullable: {
          items: nullable ?? true,
          list: false,
        },
        type: [type],
        resolve: (parent) => parent.nodes as any,
      }),
    }),
  })

  if (!listRefs.has(this)) {
    listRefs.set(this, [])
  }

  listRefs.get(this)!.push(listRef)

  globalListFieldsMap.get(this)?.forEach((fieldFn) => void fieldFn(listRef))

  return listRef as never
}
