import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "models/schema";
import url from "lib/dbUrl";
import processUserData from "lib/endpointfunctions/processUserData";
import { UserEntity, ProcessedUserData } from "lib/Types";

/*
Returns data for the given user

The data will be on the format:
data = {
  username: string,
  firstname: string,
  lastname: string,
  grade: number,
  study: string,
  distance: {
    biking: number,
    running: number,
    walking: number,
    total: number,
  },
  points: {
    biking: number,
    running: number,
    walking: number,
    total: number,
  }
*/

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const id: number = Number(req.query.id);

  const user: UserEntity = await User.findOne({ id: id }).populate("activities");
  const userData: ProcessedUserData = processUserData(user);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json(userData);
};
export default user;
