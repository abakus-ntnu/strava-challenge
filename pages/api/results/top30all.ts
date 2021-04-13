import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "models/schema";
import url from "lib/dbUrl";
import processUserData from "lib/endpointfunctions/processUserData";
import getTop30 from "lib/endpointfunctions/getTop30";

const top30total = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const users = await User.find().populate("activities");
  let usersData: Array<any> = [];

  users.forEach((user:any) => {
    const userData = processUserData(user);
    usersData.push(userData);
  });

  const top30usersData = getTop30(usersData);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    top30usersData,
  });
};
export default top30total;
