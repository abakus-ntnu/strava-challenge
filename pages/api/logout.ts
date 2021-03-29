import type { NextApiRequest, NextApiResponse } from "next";
import {
  removeUserTokens,
  getToken,
  deAuthorizeUser,
  isAuthorized,
} from "../../lib/mongoUtils";
import { deAuthorizeStravaToken } from "../../lib/stravaUtils";
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
    const userId = req.body["userId"];

    if (await isAuthorized(userId, req.body["authCode"])) {
      const authToken = await getToken(userId);
      await deAuthorizeStravaToken(authToken.accessToken);
      await removeUserTokens(userId);
      await deAuthorizeUser(userId);
      res.json(200);
    } else {
      res.status(403).json({});
    }
  }
};
