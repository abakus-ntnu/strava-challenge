import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Activity, User } from "models/schema";
import url from "utils";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const activities = await Activity.find({});
  const users = await User.find({});

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    activities,
    users,
  });
};
export default test;
