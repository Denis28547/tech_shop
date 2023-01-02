import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store/store";

import Layout from "../components/Layout";

import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>TechShop</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
              rel="stylesheet"
            />
          </Head>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
