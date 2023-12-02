import { addQueryFields, objectType } from 'fuse'

export const CategoryObject = objectType<{ name: string }>({
  name: 'Category',
  fields: (t) => ({
    name: t.exposeString('name', { nullable: false }),
  }),
})

addQueryFields((t) => ({
  categories: t.field({
    type: [CategoryObject],
    nullable: false,
    resolve: async (_, args) => {
      const categories = await fetch(
        `https://fakestoreapi.com/products/categories`,
      ).then((x) => x.json())

      return categories.map((name: string) => ({ name }))
    },
  }),
}))
