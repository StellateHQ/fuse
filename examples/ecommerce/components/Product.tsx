'use client;'

import { FragmentType, graphql, useFragment } from '@/gql'
import styles from './Product.module.css'

const ProductFields = graphql(`
  fragment Product_ProductFields on Product {
    id
    name
    image
    description
    price
  }
`)

export const Product = (props: {
  product: FragmentType<typeof ProductFields>
}) => {
  const product = useFragment(ProductFields, props.product)
  return (
    <li className={styles.productItem}>
      <img
        className={styles.productImage}
        width={48}
        height={48}
        src={product.image}
        alt={product.name}
      />
      <h3 className={styles.productName}>
        {product.name} - ${product.price}
      </h3>
      <button className={styles.addToCart}>Add to cart</button>
      {product.description && (
        <p className={styles.productDescription}>{product.description}</p>
      )}
    </li>
  )
}
