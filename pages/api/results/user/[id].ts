import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "models/schema";
import url from "lib/dbUrl";
import processUserData from "lib/endpointfunctions/processUserData";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const { id } = req.query;

  const user = await User.findOne({ id: id }).populate("activities");
  const userData = processUserData(user);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    userData,
  });
};
export default user;
