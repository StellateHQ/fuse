import { FragmentType, graphql, useFragment } from '@/fuse'
import { Product } from './Product'
import styles from './Cart.module.css'

const CartFields = graphql(`
  fragment Cart_CartFields on Cart {
    items {
      quantity
      product {
        id
        price
        ...Product_ProductFields
      }
    }
  }
`)

export const Cart = (props: { cart: FragmentType<typeof CartFields> }) => {
  const cart = useFragment(CartFields, props.cart)
  return (
    <section className={styles.cartSection}>
      <h2 className={styles.cartTitle}>
        Cart - Total Price: $
        {cart.items?.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0,
        )}
      </h2>
      <ul className={styles.grid}>
        {cart.items?.map(
          (cartItem, i) =>
            cartItem &&
            cartItem.product && (
              <Product
                key={cartItem.product.id}
                product={cartItem.product}
                noAddToCart
              />
            ),
        )}
      </ul>
    </section>
  )
}
