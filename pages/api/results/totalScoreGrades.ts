import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import url from "lib/dbUrl";
import { User } from "models/schema";
import processGradeData from "lib/endpointfunctions/processGradeData";
import { UserEntity, ProcessedGradeData } from "lib/Types";

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
  grade: number,
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
}
*/

const totalScoreGrades = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  let allGradesData: ProcessedGradeData[] = [];

  for (let grade: number = 1; grade <= 5; grade++) {
    const users: UserEntity[] = await User.find({ grade: grade }).populate(
      "activities"
    );
    const gradeData: ProcessedGradeData = processGradeData(users, grade);
    allGradesData.push(gradeData);
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json(allGradesData);
};

export default totalScoreGrades;
