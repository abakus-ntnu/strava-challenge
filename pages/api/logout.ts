import type { NextApiRequest, NextApiResponse } from "next";
import {
  removeUserTokens,
  deAuthorizeUser,
  getUserId,
} from "../../lib/mongoUtils";
import { deAuthorizeStravaToken } from "../../lib/stravaUtils";
import mongoose from "mongoose";
import url from "utils";
import { StravaToken } from "../../models/schema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  if (req.method === "POST") {
    const userId = await getUserId(req.body["authCode"]);
    if (userId) {
      const authToken = await StravaToken.findOne({ userId: userId});
      await deAuthorizeStravaToken(authToken.accessToken);
      await removeUserTokens(userId);
      await deAuthorizeUser(userId);
      res.json(200);
    } else {
      res.status(403).json({});
    }
  }
};
