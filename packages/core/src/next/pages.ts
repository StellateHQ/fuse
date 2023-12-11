import * as React from 'react'
import {
  Client,
  ClientOptions,
  Provider,
  SSRData,
  SSRExchange,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from 'urql'
import type { ReactNode, ReactElement } from 'react'
import type { NextComponentType, NextPage, NextPageContext } from 'next'
import type NextApp from 'next/app'
import type { AppContext } from 'next/app'

export * from 'urql'
export { cacheExchange } from './exchanges'

let ssr: SSRExchange
let client: Client | null = null

export function initGraphQLClient(clientOptions: ClientOptions): Client {
  // @ts-ignore
  const isServer = typeof window === 'undefined'
  if (isServer || !client) {
    client = createClient(clientOptions)
    ;(client as any).toJSON = () => null
  }

  return client
}

export function withGraphQLClient(getClientConfig: NextGraphQLClientConfig) {
  return <C extends NextPage<any> | typeof NextApp>(
    AppOrPage: C,
  ): NextComponentType<NextUrqlContext, {}, WithGraphQLClientProps> => {
    const WithUrql = ({
      pageProps,
      urqlClient,
      graphqlState,
      ...rest
    }: WithGraphQLClientProps) => {
      const urqlServerState =
        (pageProps && pageProps.graphqlState) || graphqlState
      const client = React.useMemo(() => {
        if (urqlClient) {
          return urqlClient
        }

        // @ts-ignore
        if (!ssr || typeof window === 'undefined') {
          // We want to force the cache to hydrate, we do this by setting the isClient flag to true
          ssr = ssrExchange({
            initialState: urqlServerState,
            isClient: true,
          })
          // @ts-ignore
        } else if (typeof window === 'undefined') {
          ssr.restoreData(urqlServerState)
        }

        const clientConfig = getClientConfig(ssr)

        return initGraphQLClient({
          ...clientConfig,
          exchanges: clientConfig.exchanges || [
            cacheExchange,
            ssr,
            fetchExchange,
          ],
        })!
      }, [urqlClient, urqlServerState])

      return React.createElement(
        Provider,
        { value: client },
        React.createElement(AppOrPage, {
          ...rest,
          pageProps,
          urqlClient: client,
        }),
      )
    }

    // Set the displayName to indicate use of withUrqlClient.
    const displayName =
      (AppOrPage as any).displayName || AppOrPage.name || 'Component'
    WithUrql.displayName = `withUrqlClient(${displayName})`

    if ((AppOrPage as NextPageWithLayout).getLayout) {
      WithUrql.getLayout = (AppOrPage as NextPageWithLayout).getLayout
    }

    return WithUrql
  }
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type NextGraphQLClientConfig = (
  ssrExchange: SSRExchange,
  ctx?: NextPageContext,
) => Optional<ClientOptions, 'exchanges'>

export interface WithGraphQLClientProps {
  urqlClient?: Client
  pageProps: any
  graphqlState?: SSRData
  [key: string]: any
}

export interface NextGraphQLPageContext extends NextPageContext {
  urqlClient: Client
}

export interface NextGraphQLAppContext extends AppContext {
  urqlClient: Client
}

export type NextUrqlContext = NextGraphQLAppContext | NextGraphQLPageContext
