import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store/store";

import Layout from "../components/Layout";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
