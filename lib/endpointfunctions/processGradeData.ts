import points from "lib/points";
import { ActivityEntity, UserEntity, ProcessedGradeData } from "lib/Types";


// Takes an array of users in a grade (where activities are populated), and returns gradeData
// TODO: add types
const processGradeData = (users: UserEntity[], grade: number) => {
  const activities: ActivityEntity[] = [];
  users.forEach((user: UserEntity) => {
    user.activities.forEach((activity: ActivityEntity) => {
      activities.push(activity);
    });
  });

  let totalBikingDistance: number = 0;
  let totalRunningDistance: number = 0;
  let totalWalkingDistance: number = 0;

  activities.forEach((activity) => {
    const distance: number = activity.distance;
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

  const gradeData: ProcessedGradeData = {
    grade: grade,
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
  return gradeData;
};
export default processGradeData;
