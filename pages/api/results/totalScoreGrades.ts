import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import url from "lib/dbUrl";
import { User } from "models/schema";
import processGradeData from "lib/endpointfunctions/processGradeData";

const totalScoreGrades = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  let allGradesData: Array<any> = [];

  for (let grade = 1; grade <= 5; grade++) {
    const users: Array<any> = await User.find({ grade: grade }).populate(
      "activities"
    );
    const gradeData = processGradeData(users, grade);
    allGradesData.push(gradeData);
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    allGradesData,
  });
};

export default totalScoreGrades;
