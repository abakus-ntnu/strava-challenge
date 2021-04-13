import { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/schema";
import mongoose from "mongoose";
import url from "lib/dbUrl";

const grade = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const grade = req.query.grade;

  const users: Array<any> = await User.find({ grade: grade }).populate(
    "activities"
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    users,
  });
};
export default grade;
