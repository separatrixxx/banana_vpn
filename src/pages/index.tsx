import { MainPage } from "../../page_components/MainPage/MainPage";
import Head from 'next/head';
import { setLocale } from "../../helpers/locale.helper";
import { useSetup } from "../../hooks/useSetup";
import { useEffect } from "react";
import { getUser } from "../../helpers/user.helper";


function Main(): JSX.Element {
  const { router, dispatch, webApp, tgUser } = useSetup();

  useEffect(() => {
    if (tgUser) {
      getUser({
        webApp: webApp,
        dispatch: dispatch,
        tgUser: tgUser,
      });
    }
  }, [router, tgUser, webApp, dispatch]);

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).banana_vpn}</title>
        <meta name='description' content={setLocale(router.locale).banana_vpn} />
        <meta property='og:title' content={setLocale(router.locale).banana_vpn} />
        <meta name='og:description' content={setLocale(router.locale).banana_vpn} />
        <meta charSet="utf-8" />
      </Head>
      <MainPage />
    </>
  );
}

export default Main;
