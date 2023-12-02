import { FragmentType, graphql, useFragment } from '@/gql'
import { Product } from './Product'

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
    <section>
      <h2>{category.name}</h2>
      <ul>
        {category.products.map((product, i) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}
