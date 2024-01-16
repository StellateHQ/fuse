type HeadMetaProps = {
  description?: string
  title?: string
  url: string
}

const imageUrl = 'https://fusedata.dev/images/og-image.png'
const imageWidth = (1200).toString()
const imageHeight = (630).toString()
const imageType = 'image/jpeg'
const imageAlt = 'Fuse: Build and query great APIs with TypeScript'

export function getHeadMetaContent({ title, description, url }: HeadMetaProps) {
  const metaTitle = title ? `${title} – Fuse` : 'Fuse: TypeScript API Framework'
  const metaDescription =
    description ||
    'Aggregate all your data sources and transform them into a great GraphQL API for your clients with many best practices built-in for you—fully typesafe.'

  let keyIndex = 0
  const getKey = () => {
    return `head-meta-${url}-${title}-${description}-${keyIndex++}`
  }

  return [
    <title key={getKey()}>{metaTitle}</title>,

    <meta
      key={getKey()}
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />,

    <meta key={getKey()} property="og:url" content={url} />,
    <meta key={getKey()} property="og:title" content={metaTitle} />,
    <meta key={getKey()} property="og:description" content={metaDescription} />,
    <meta key={getKey()} property="og:image" content={imageUrl} />,
    <meta key={getKey()} property="og:image:type" content={imageType} />,
    <meta key={getKey()} property="og:image:width" content={imageWidth} />,
    <meta key={getKey()} property="og:image:height" content={imageHeight} />,
    <meta key={getKey()} property="og:image:alt" content={imageAlt} />,

    <meta key={getKey()} name="twitter:title" content={metaTitle} />,
    <meta
      key={getKey()}
      name="twitter:description"
      content={metaDescription}
    />,
    <meta key={getKey()} name="twitter:site" content="@stellate" />,
    <meta
      key={getKey()}
      property="twitter:card"
      content="summary_large_image"
    />,
    <meta key={getKey()} property="twitter:image" content={imageUrl} />,
    <meta key={getKey()} property="twitter:image:type" content={imageType} />,
    <meta key={getKey()} property="twitter:image:width" content={imageWidth} />,
    <meta
      key={getKey()}
      property="twitter:image:height"
      content={imageHeight}
    />,
    <meta key={getKey()} property="twitter:image:alt" content={imageAlt} />,
  ]
}
