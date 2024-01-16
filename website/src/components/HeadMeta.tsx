type HeadMetaProps = {
  description?: string
  title?: string
  url: string
}

const imageUrl = 'https://fusedata.dev/images/fuse-og-image.jpg'
const imageWidth = (1200).toString()
const imageHeight = (630).toString()
const imageType = 'image/jpeg'
const imageAlt =
  'Fuse, the opinionated framework for easily creating typesafe data layers'

export function getHeadMetaContent({ title, description, url }: HeadMetaProps) {
  const metaTitle = title
    ? `${title} – Fuse`
    : 'Fuse: The opinionated framework for easily creating typesafe data layers'
  const metaDescription =
    description ||
    'Data layers enable frontend teams to transform backend APIs for their UIs. Fuse is tailor-made to make it simple to build data layers, starting with first-class support for Next.js.'

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
