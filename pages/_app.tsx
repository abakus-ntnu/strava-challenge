import "../styles/global.css";
import type { AppProps } from "next/app";
import Container from "@material-ui/core/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container className="bg-red-100 h-screen">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
