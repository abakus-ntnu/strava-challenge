import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import url from "lib/dbUrl";
import { User } from "models/schema";
import processGradeData from "lib/endpointfunctions/processGradeData";

/*
Returns data for each grade as a total

The data will be on the format:
data = [
  grade1Data,
  grade2Data,
  ...
  grade5Data
]
where grade?Data is on the format:
grade?Data = {
  grade: Number,
  distance: {
    biking: Number,
    running: Number,
    walking: Number,
    total: Number,
  },
  points: {
    biking: Number,
    running: Number,
    walking: Number,
    total: Number,
  }
}
*/

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

  res.json(allGradesData);
};

export default totalScoreGrades;
