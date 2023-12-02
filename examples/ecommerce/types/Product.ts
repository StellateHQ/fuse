import { addObjectFields, node } from 'fuse'
import { CategoryObject } from './Category'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const ProductNode = node<Product>({
  name: 'Product',
  async load(ids) {
    return []
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
      const result = await Promise.all(
        keys.map((key) =>
          fetch(`https://fakestoreapi.com/products/category/` + key).then((x) =>
            x.json(),
          ),
        ),
      )
      return result
    },
  }),
}))
