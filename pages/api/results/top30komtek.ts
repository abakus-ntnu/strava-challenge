import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import url from "lib/dbUrl";

const top30komtek = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({});
};
export default top30komtek;
