import { FragmentType, graphql, useFragment } from '@/gql'

const ProductFields = graphql(`
  fragment Product_ProductFields on Product {
    id
    name
    image
  }
`)

export const Product = (props: {
  product: FragmentType<typeof ProductFields>
}) => {
  const product = useFragment(ProductFields, props.product)
  return (
    <li>
      <img width={32} height={32} src={product.image} alt={product.name} />
    </li>
  )
}
