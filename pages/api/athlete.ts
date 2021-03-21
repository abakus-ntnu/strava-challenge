import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const clientID = 61772;
    const clientSecret = process.env.CLIENT_SECRET;

    const response = await fetch(
      `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${req.body["code"]}&grant_type=authorization_code`,
      {
        method: "POST",
      }
    ).then((response) => response.json());

    res.json(response.athlete);
  }
};
