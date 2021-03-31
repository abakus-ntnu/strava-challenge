import type { NextApiRequest, NextApiResponse } from "next";
import {
  findOrCreateUser,
  updateToken,
  authorizeUser,
} from "../../lib/mongoUtils";
import { getAuthenticatedUser } from "../../lib/stravaUtils";
import mongoose from "mongoose";
import url from "utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  if (req.method === "POST") {
    const response = await getAuthenticatedUser(req.body["code"]);
    if (response && response.athlete) {
      await authorizeUser(response.athlete.id, req.body["code"]);
      const token = {
        refreshToken: response.refresh_token,
        accessToken: response.access_token,
        expiresAt: Number(response.expires_at + "000"),
      };

      await updateToken(token, response.athlete.id);

      const user = await findOrCreateUser(response.athlete);

      res.json(user);
    }
  }
};
