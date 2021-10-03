import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import LoadingScreen from "components/LoadingScreen";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      {pageLoading && <LoadingScreen />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
