import points from "lib/points";

// Takes a user (where activities are populated), and returns userData
// TODO: add types
const processUserData = (user: any) => {
  const activities: Array<any> = user.activities;

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

  const userData = {
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
