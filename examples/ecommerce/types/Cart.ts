import { addMutationFields, addQueryFields, node, objectType } from 'fuse'
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
      resolve: (p) => p.productId,
    }),
  }),
})

const CartObject = node<Cart>({
  name: 'Cart',
  load: async (ids, ctx) => {
    // Gets the uesrs own cart
    const carts = await fetch(
      'https://fakestoreapi.com/carts/user/' + ctx.userId,
    ).then((x) => x.json())
    // Return it as an array
    return [carts.find((x: { id: string }) => x.id === ids[0])]
  },
  fields: (t) => ({
    items: t.field({
      type: [CartItemObject],
      resolve: (parent) => {
        return parent.products
      },
    }),
  }),
})

addMutationFields((t) => ({
  addToCart: t.field({
    type: CartObject,
    args: {
      productId: t.arg.id({ required: true }),
      quantity: t.arg.int({ defaultValue: 1 }),
    },
    resolve: async (_, args, ctx) => {
      // This only returns { id: x } without the associated products
      const result = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify({
          userId: ctx.userId,
          date: '2020-01-02',
          products: [{ productId: args.productId, quantity: args.quantity }],
        }),
      }).then((res) => res.json())
      return result.id
    },
  }),
}))

addQueryFields((t) => ({
  myCart: t.field({
    type: CartObject,
    resolve: async (_, __, ctx) => {
      const carts = await fetch(
        'https://fakestoreapi.com/carts/user/' + ctx.userId,
      ).then((x) => x.json())
      return carts[0]
    },
  }),
}))
