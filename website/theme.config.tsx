import { type DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { FuseLogoWithName } from './src/components/icons'

const themeConfig: DocsThemeConfig = {
  logo: <FuseLogoWithName />,
  primaryHue: 88,
  primarySaturation: {
    light: 50,
    dark: 99,
  },
  docsRepositoryBase: 'https://github.com/StellateHQ/fuse.js/tree/main/website',

  // banner: {
  //   key: 'initial-release',
  //   text: (
  //     <a href="http://stellate.co/blog/introducing-fuse-js" target="_blank">
  //       🎉 Fuse 1.0 is released. Read more →
  //     </a>
  //   ),
  // },

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Fuse.js',
    }
  },

  head: () => {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Fuse.js" />
        <meta property="og:description" content="The Data Layer for Next.js" />
      </>
    )
  },

  footer: {
    text: (
      <span>
        © {new Date().getFullYear()}{' '}
        <a href="https://stellate.co" target="_blank">
          Stellate, Inc
        </a>
      </span>
    ),
  },

  gitTimestamp: null,
}

export default themeConfig
