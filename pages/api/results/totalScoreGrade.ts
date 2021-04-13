import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import url from "utils";
import { User } from "models/schema";
import points from "points";

const totalScoreGrades = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  let allGradesData:{[key: number]: any} = {};

  for (let grade=1; grade<=5; grade++){
    const data: Array<any> = await User.find({ grade : grade }).populate("activities");
    const activities: Array<any> = [];
    data.forEach(user => {
      user.activities.forEach((activity:any) => {
        activities.push(activity);
      })
    });

    let totalBikingDistance = 0;
    let totalRunningDistance = 0;
    let totalWalkingDistance = 0;

    activities.forEach((activity) => {
      const distance = activity.distance;
      switch (activity.type) {
        case "Ride":
          totalBikingDistance += distance;
          break;
        case "Run":
          totalRunningDistance += distance;
          break;
        case "Walk":
          totalWalkingDistance += distance;
          break;
      }
    });

    const gradeData = {
      distance: {
        biking: totalBikingDistance,
        running: totalRunningDistance,
        walking: totalWalkingDistance,
        total: totalBikingDistance + totalRunningDistance + totalWalkingDistance,
      },
      points: {
        biking: totalBikingDistance * points.biking,
        running: totalRunningDistance * points.running,
        walking: totalWalkingDistance * points.walking,
        total:
          totalBikingDistance * points.biking +
          totalRunningDistance * points.running +
          totalWalkingDistance * points.walking,
      },
    };
    allGradesData[grade] = gradeData;
  };

  res.json({
    allGradesData,
  });
};

export default totalScoreGrades;
