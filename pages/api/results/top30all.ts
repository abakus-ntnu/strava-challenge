import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "models/schema";
import url from "lib/dbUrl";
import processUserData from "lib/endpointfunctions/processUserData";
import getTop30 from "lib/endpointfunctions/getTop30";

/* 
Returns data for the top 30 users (out of all users)

The data will be on the format:
data = [
  user1Data,
  user2Data,
  ...
  user30Data
]
where user?Data is on the same format as data for a single user (se api/results/user/[id])
*/

const top30all = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const users = await User.find().populate("activities");
  let usersData: Array<any> = [];

  users.forEach((user: any) => {
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
export default top30all;
