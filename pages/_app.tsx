import "../styles/global.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Container from "@material-ui/core/Container";
import { Button, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LoginButton from "../components/LoginButton";
import { GlobalStateProvider } from "../components/StateManagement/GlobalStateProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <GlobalStateProvider>
        <Head>
          <title>Strava Challenge</title>
        </Head>
        <AppBar style={{ backgroundColor: "#fc4c02" }} position="static">
          <Toolbar>
            <Link href="/">
              <Button color="inherit">
                <Typography variant="h4">Strava Challenge</Typography>
              </Button>
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            <LoginButton />
          </Toolbar>
        </AppBar>
        <Container className="mt-5 flex-grow">
          <Component {...pageProps} />
        </Container>
        <footer
          style={{ backgroundColor: "#fc4c02" }}
          className="w-full mt-5 pt-5 pb-1"
        >
          <Container className="text-center">
            <Typography>Laget av</Typography>
            <div>
              <Link href="https://github.com/webkom">
                <Button>Webkom</Button>
              </Link>
            </div>
            <Link href="https://github.com/abakus-ntnu/strava-challenge">
              <Button>
                Strava Challenge
                <GitHubIcon className="ml-1" />
              </Button>
            </Link>
          </Container>
        </footer>
      </GlobalStateProvider>
    </div>
  );
}

export default MyApp;
