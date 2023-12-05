import { addObjectFields, node } from 'fuse'
import { CategoryObject } from './Category'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

export const ProductNode = node<Product, number>({
  name: 'Product',
  async load(ids) {
    const result = await Promise.allSettled(
      ids.map((id) =>
        fetch(`https://fakestoreapi.com/products/` + id).then((x) => x.json()),
      ),
    )
    return result.map((x) =>
      x.status === 'fulfilled' ? x.value : new Error(x.reason),
    )
  },
  fields: (t) => ({
    name: t.exposeString('title', { nullable: false }),
    price: t.exposeFloat('price', { nullable: false }),
    description: t.exposeString('description'),
    image: t.exposeString('image', { nullable: false }),
  }),
})

addObjectFields(CategoryObject, (t) => ({
  products: t.loadableList({
    nullable: false,
    type: ProductNode,
    resolve: (parent) => {
      return parent.name
    },
    load: async (keys) => {
      const result = await Promise.allSettled(
        keys.map((key) =>
          fetch(`https://fakestoreapi.com/products/category/` + key).then((x) =>
            x.json(),
          ),
        ),
      )
      return result.map((x) =>
        x.status === 'fulfilled' ? x.value : new Error(x.reason),
      )
    },
  }),
}))
