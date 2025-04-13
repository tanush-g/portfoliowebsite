import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/rabbit.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/rabbit.png" />
          <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
          <meta name="theme-color" content="#202023" media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content="#f0e7db" media="(prefers-color-scheme: light)" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Tanush Gautam" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#202023" />
          <meta name="msapplication-tap-highlight" content="no" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}