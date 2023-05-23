import type { AppProps } from 'next/app'

import '@/styles/normalize.css'
import '@/styles/globals.css'

import '@/utils/init-data'

import Head from 'next/head'
import TokenChecker from '@/components/common/TokenChecker'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>零清单</title>
        <meta
          name="description"
          content="零清单，一款简单的清单应用，用于个人待办或者团体待办。"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Provider store={store}>
        <TokenChecker>
          <Component {...pageProps} />
          <Toaster />
        </TokenChecker>
      </Provider>
    </>
  )
}
