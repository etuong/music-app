import "../styles/global.scss";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import createEmotionCache from "../config/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { MusicProvider } from "../providers/MusicProvider";

const emotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Ethan&apos;s Music Player</title>
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

export default MyApp;
