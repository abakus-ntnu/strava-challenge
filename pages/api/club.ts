import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientID = 61772;
  const clubID = 895463;
  const clientSecret = process.env.CLIENT_SECRET;

  const response = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${req.body["code"]}&grant_type=authorization_code`,
    {
      method: "POST",
    }
  ).then((response) => response.json());

  const authHeader = new Headers({
    Authorization: "Bearer " + response.access_token,
  });

  const clubActivities = await fetch(
    `https://www.strava.com/api/v3/clubs/${clubID}/activities`,
    {
      headers: authHeader,
    }
  ).then((r) => r.json());

  res.json(clubActivities);
};
