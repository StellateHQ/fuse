import { addMutationFields, addQueryFields, objectType } from 'fuse'
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
    resolve: async (_, __, ctx) => {
      const carts = await fetch(
        'https://fakestoreapi.com/carts/user/' + ctx.userId,
      ).then((x) => x.json())
      return carts[carts.length - 1]
    },
  }),
}))

addMutationFields((t) => ({
  addToCart: t.field({
    type: CartObject,
    args: {
      productId: t.arg.id({ required: true }),
      quantity: t.arg.int({ defaultValue: 1 }),
    },
    resolve: async (_, args, ctx) => {
      return fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify({
          userId: ctx.userId,
          date: '2023-12-03',
          products: [{ productId: args.productId, quantity: args.quantity }],
        }),
      }).then((res) => res.json())
    },
  }),
}))
