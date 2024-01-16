import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { FuseLogoWithName } from './src/components/icons'
import { getHeadMetaContent } from './src/components/HeadMeta'

function HeadMeta() {
  const { asPath } = useRouter()
  const { frontMatter, title } = useConfig()
  const url = 'https://fusedata.dev' + asPath

  return getHeadMetaContent({
    title,
    url,
    description: frontMatter.description,
  })
}

const themeConfig: DocsThemeConfig = {
  logo: <FuseLogoWithName />,
  primaryHue: 88,
  primarySaturation: {
    light: 50,
    dark: 99,
  },
  docsRepositoryBase: 'https://github.com/StellateHQ/fuse/tree/main/website',

  banner: {
    key: 'initial-release',
    text: (
      <a href="https://stellate.co/blog/announcing-fuse-js" target="_blank">
        🎉 Announcing Fuse: the opinionated framework for easily creating
        typesafe data layers →
      </a>
    ),
  },

  useNextSeoProps() {
    return {}
  },

  head: HeadMeta,

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
