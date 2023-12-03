import { FragmentType, graphql, useFragment } from '@/fuse'
import { Product } from './Product'
import styles from './Category.module.css'

const CategoryFields = graphql(`
  fragment Category_CategoryFields on Category {
    name
    products {
      id
      ...Product_ProductFields
    }
  }
`)

export const Category = (props: {
  category: FragmentType<typeof CategoryFields>
}) => {
  const category = useFragment(CategoryFields, props.category)
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{category.name}</h2>
      <ul className={styles.grid}>
        {category.products.map((product, i) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}
