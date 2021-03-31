import { Token } from "./Types";
export const clientID = 61772;
export const clubID = 895463;
export const clientSecret = process.env.CLIENT_SECRET;

const getAuthHeader = (accessToken: string) =>
  new Headers({
    Authorization: "Bearer " + accessToken,
  });

export const hasExpired = (token: Token) => token.expiresAt < Date.now();

export const getNewToken = async (refreshToken: string): Promise<Token> =>
  await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
    {
      method: "POST",
    }
  ).then((response) => response.json());

export const getAuthenticatedUser = async (authorization_code: string) =>
  await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${authorization_code}&grant_type=authorization_code`,
    {
      method: "POST",
    }
  ).then((response) => response.json());

export const deAuthorizeStravaToken = async (accessToken: string) =>
  await fetch("https://www.strava.com/oauth/deauthorize", {
    method: "POST",
    headers: getAuthHeader(accessToken),
  });

export const getClubActivities = async (accessToken: string) => {
  return await fetch(
    `https://www.strava.com/api/v3/clubs/${clubID}/activities`,
    {
      headers: getAuthHeader(accessToken),
    }
  ).then((r) => r.json());
};
