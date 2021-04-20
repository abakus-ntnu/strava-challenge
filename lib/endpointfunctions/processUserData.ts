import points from "lib/points";
import { ActivityEntity, UserEntity, ProcessedUserData } from "lib/Types";


// Takes a user (where activities are populated), and returns userData
// TODO: add types
const processUserData = (user: UserEntity) => {
  const activities: ActivityEntity[] = user.activities;

  let totalBikingDistance: number = 0;
  let totalRunningDistance: number = 0;
  let totalWalkingDistance: number = 0;

  activities.forEach((activity: ActivityEntity) => {
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

  const userData: ProcessedUserData = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    grade: user.grade,
    study: user.study,
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

  return userData;
};
export default processUserData;
