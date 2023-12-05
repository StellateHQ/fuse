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
    quantity: t.exposeInt('quantity', { nullable: false }),
    product: t.field({
      nullable: false,
      type: ProductNode,
      // We only return the product id here and let the ProductNode
      // automatically resolve everything
      resolve: (p) => p.productId,
    }),
  }),
})

const CartObject = objectType<Cart>({
  name: 'Cart',
  fields: (t) => ({
    id: t.exposeID('id'),
    items: t.field({
      type: [CartItemObject],
      resolve: (parent) => parent.products,
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
      const result = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify({
          userId: ctx.userId,
          date: '2020-01-02',
          products: [{ productId: args.productId, quantity: args.quantity }],
        }),
      }).then((res) => res.json())

      return {
        ...result,
        products: [{ productId: args.productId, quantity: args.quantity }],
      }
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
