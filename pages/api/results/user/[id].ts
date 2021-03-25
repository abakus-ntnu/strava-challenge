import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "models/schema";
import url from "utils";
import points from "points";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const { id } = req.query;

  const data = await User.findOne({ id: id }).populate("activities");
  const activities : Array<any> = data.activities;

  let totalBikingDistance = 0;
  let totalRunningDistance = 0;
  let totalWalkingDistance = 0;

  activities.forEach(activity => {
    const distance = activity.distance;
    switch(activity.type) {
      case "Ride": totalBikingDistance += distance; break;
      case "Run": totalRunningDistance += distance; break;
      case "Walk": totalWalkingDistance += distance; break;
    }
  });

  const userData = {
    "username": data.username,
    "firstname": data.firstname,
    "lastname": data.lastname,
    "grade": data.grade,
    "study": data.study,
    "distance": {
      "biking": totalBikingDistance,
      "running": totalRunningDistance,
      "walking": totalWalkingDistance,
    },
    "points": {
      "biking": totalBikingDistance*points.biking,
      "running": totalRunningDistance*points.running,
      "walking": totalWalkingDistance*points.walking,
      "total": totalBikingDistance*points.biking + totalRunningDistance*points.running + totalWalkingDistance*points.walking,
    },
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.json({
    userData
  });
};
export default user;
