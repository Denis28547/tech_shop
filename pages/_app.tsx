import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store } from "../store/store";
import { Provider } from "react-redux";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

// export default wrapper.withRedux(MyApp);

// function MyApp({ Component, pageProps }: AppProps) {
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   useEffect(() => {
//     router.isReady && setIsLoading(false);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <>loading...</>
//       ) : (
//         // @ts-ignore
//         <SessionProvider session={pageProps.session}>
//           <Provider store={makeStore()}>
//             <Layout>
//               <Component {...pageProps} />
//             </Layout>
//           </Provider>
//         </SessionProvider>
//       )}
//     </>
//   );
// }

export default MyApp;
