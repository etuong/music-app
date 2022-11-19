import "../styles/global.scss";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import createEmotionCache from "../config/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { MusicProvider } from "../providers/MusicProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Ethan's Music Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <CssBaseline />

      <MusicProvider>
        <Component {...pageProps} />
      </MusicProvider>
    </CacheProvider>
  );
}
