import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { UserEntity } from "../lib/Types";
import { clientID } from "../lib/stravaUtils";
import { useState } from "react";

const LoginButton = () => {
  const router = useRouter();
  const setCookie = (key: string, value: string) =>
    localStorage.setItem(key, value);
  const getCookie = (key: string) => localStorage.getItem(key);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    getCookie("authCode") ? true : false
  );

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
        scope: "activity:read",
      },
    });
  };

  const deAuthorize = async () => {
    setIsAuthorized(false);
    await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL + "/api/logout", {
      body: JSON.stringify({
        userId: getCookie("userId"),
        authCode: getCookie("authCode"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.clear();
  };

  const login = async () => {
    if (router.query.code && router.query.scope && !isAuthorized) {
      if (!router.query.scope.includes("activity:read")) {
        alert(
          'Du må krysse av på "View data about your activities" for å logge inn.'
        );
        return;
      }
      setIsAuthorized(true);
      const authCode = String(router.query.code);
      router.push("/");

      const user = await authorizeUser(authCode);

      setCookie("authCode", authCode);
      setCookie("userId", String(user.id));

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
      onClick={() => (isAuthorized ? deAuthorize() : authorizeStrava())}
    >
      {isAuthorized ? "Logg ut" : "Logg inn med Strava"}
    </Button>
  );
};
export default LoginButton;
