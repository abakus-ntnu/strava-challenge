import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { UserEntity } from "../lib/Types";
import { clientID } from "../lib/stravaUtils";
import { useEffect } from "react";
import { useGlobalState } from "./StateManagement/GlobalStateProvider";

const LoginButton = () => {
  const router = useRouter();
  const { state, setState } = useGlobalState();

  useEffect(() => {
    setState({
      ...state,
      isAuthenticated: localStorage.getItem("authCode") ? true : false,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authorizeUser = async (code: string): Promise<UserEntity> =>
    await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }).then((r) => r.json());

  const authorizeStrava = () => {
    router.push({
      pathname: "https://www.strava.com/oauth/authorize",
      query: {
        client_id: clientID,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
        response_type: "code",
        approval_prompt: "auto",
      },
    });
  };

  const deAuthorize = async () => {
    setState({ ...state, isAuthenticated: false });
    const authCode = localStorage.getItem("authCode");
    localStorage.clear();
    await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL + "/api/logout", {
      body: JSON.stringify({
        authCode: authCode,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const login = async () => {
    if (router.query.code && !state.isAuthenticated) {
      setState({ ...state, isAuthenticated: true });
      const authCode = String(router.query.code);
      router.push("/");

      const user = await authorizeUser(authCode);

      localStorage.setItem("authCode", authCode);

      if (user.grade) {
        // TODO Display personal page
      } else {
        // TODO Display signup page and use registerUser() when the signup form is submitted...
        await registerUser(user.id, 1, "komtek");
      }
    }
  };

  const registerUser = async (userId: number, grade: number, study: string) => {
    return await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, grade: grade, study: study }),
    });
    // TODO Display personal page
  };

  login();
  return (
    <Button
      variant="outlined"
      onClick={() =>
        state.isAuthenticated ? deAuthorize() : authorizeStrava()
      }
    >
      {state.isAuthenticated ? "Logg ut" : "Logg inn med Strava"}
    </Button>
  );
};
export default LoginButton;
