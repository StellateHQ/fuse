type HeadMetaProps = {
  description?: string
  title?: string
  url: string
}

const imageUrl = 'https://fusejs.org/images/fuse-og-image.jpg'
const imageWidth = (1200).toString()
const imageHeight = (630).toString()
const imageType = 'image/jpeg'
const imageAlt = 'Fuse.js., the Data Layer for Next.js'

export function HeadMeta({ title, description, url }: HeadMetaProps) {
  const metaTitle = title ? `${title} – Fuse.js` : 'Fuse.js'
  const metaDescription = description || 'The Data Layer for Next.js'

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{metaTitle}</title>

      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:site" content="@stellate" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:type" content={imageType} />
      <meta property="twitter:image:width" content={imageWidth} />
      <meta property="twitter:image:height" content={imageHeight} />
      <meta property="twitter:image:alt" content={imageAlt} />
    </>
  )
}
