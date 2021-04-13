import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../lib/mongoUtils";
import mongoose from "mongoose";
import url from "lib/dbUrl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  if (req.method === "POST") {
    await registerUser(req.body.userId, req.body.grade, req.body.study);
    res.json(200);
  }
};
