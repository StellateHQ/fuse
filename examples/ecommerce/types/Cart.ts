import { addQueryFields, objectType } from 'fuse'
import { ProductNode } from './Product'

type CartItem = {
  productId: number
  quantity: number
}

interface Cart {
  id: number
  products: Array<CartItem>
}

const CartItemObject = objectType<CartItem>({
  name: 'CartItem',
  fields: (t) => ({
    quantity: t.exposeInt('quantity'),
    product: t.field({
      type: ProductNode,
      // TODO: why does this not accept number
      resolve: (p) => '' + p.productId,
    }),
  }),
})

const CartObject = objectType<Cart>({
  name: 'Cart',
  fields: (t) => ({
    id: t.exposeID('id'),
    items: t.field({
      type: [CartItemObject],
      resolve: (parent) => {
        return parent.products
      },
    }),
  }),
})

addQueryFields((t) => ({
  cart: t.field({
    type: CartObject,
    resolve: () => {
      return fetch('https://fakestoreapi.com/carts/1').then((x) => x.json())
    },
  }),
}))
