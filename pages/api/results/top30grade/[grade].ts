import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/schema";
import mongoose from "mongoose";
import url from "lib/dbUrl";
import processUserData from "lib/endpointfunctions/processUserData";
import getTop30 from "lib/endpointfunctions/getTop30";
import { UserEntity, ProcessedUserData } from "lib/Types";

/*
Returns data for the top 30 users in the given grade

The data will be on the format:
data = [
  user1Data,
  user2Data,
  ...
  user30Data
]
where user?Data is on the same format as data for a single user (se api/results/user/[id])
*/

const grade30grade = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const grade: number = Number(req.query.grade);

  const users: UserEntity[] = await User.find({ grade: grade }).populate(
    "activities"
  );
  let usersData: ProcessedUserData[]  = [];

  users.forEach((user: UserEntity) => {
    const userData: ProcessedUserData = processUserData(user);
    usersData.push(userData);
  });

  const top30usersData: ProcessedUserData[] = getTop30(usersData);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json(top30usersData);
};
export default grade30grade;
