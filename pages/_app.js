import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import theme from "../lib/theme";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence mode='wait' initial={true}>
        <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
      <Analytics />
      <SpeedInsights />
    </ChakraProvider>
  );
}

export default Website;