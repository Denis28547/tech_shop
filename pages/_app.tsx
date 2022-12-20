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
