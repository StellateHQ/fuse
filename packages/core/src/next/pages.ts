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

let ssr: SSRExchange
let urqlClient: Client | null = null

export function initUrqlClient(clientOptions: ClientOptions): Client {
  // @ts-ignore
  const isServer = typeof window === 'undefined'
  if (isServer || !urqlClient) {
    urqlClient = createClient(clientOptions)
    ;(urqlClient as any).toJSON = () => null
  }

  return urqlClient
}

export function withUrqlClient(getClientConfig: NextUrqlClientConfig) {
  return <C extends NextPage<any> | typeof NextApp>(
    AppOrPage: C,
  ): NextComponentType<NextUrqlContext, {}, WithUrqlProps> => {
    const WithUrql = ({
      pageProps,
      urqlClient,
      urqlState,
      ...rest
    }: WithUrqlProps) => {
      const urqlServerState = (pageProps && pageProps.urqlState) || urqlState
      const client = React.useMemo(() => {
        if (urqlClient) {
          return urqlClient
        }

        // @ts-ignore
        if (!ssr || typeof window === 'undefined') {
          console.log('restoring', urqlServerState)
          // We want to force the cache to hydrate, we do this by setting the isClient flag to true
          ssr = ssrExchange({
            initialState: urqlServerState,
            isClient: true,
          })
          console.log('restored with', urqlServerState)
          // @ts-ignore
        } else if (typeof window === 'undefined') {
          ssr.restoreData(urqlServerState)
        }

        const clientConfig = getClientConfig(ssr)
        if (!clientConfig.exchanges) {
          // When the user does not provide exchanges we make the default assumption.
          clientConfig.exchanges = [cacheExchange, ssr, fetchExchange]
        }

        return initUrqlClient(clientConfig)!
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

export type NextUrqlClientConfig = (
  ssrExchange: SSRExchange,
  ctx?: NextPageContext,
) => ClientOptions

/** Props that {@link withUrqlClient} components pass on to your component. */
export interface WithUrqlProps {
  urqlClient?: Client
  pageProps: any
  urqlState?: SSRData
  [key: string]: any
}

export interface NextUrqlPageContext extends NextPageContext {
  urqlClient: Client
}

export interface NextUrqlAppContext extends AppContext {
  urqlClient: Client
}

export type NextUrqlContext = NextUrqlPageContext | NextUrqlAppContext
