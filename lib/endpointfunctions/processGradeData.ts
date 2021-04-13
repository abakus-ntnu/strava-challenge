import points from "lib/points";


// Takes an array of users in a grade (where activities are populated), and returns gradeData
// TODO: add types
const processGradeData = (users: any, grade: number) => {

  const activities: Array<any> = [];
    users.forEach((user:any) => {
      user.activities.forEach((activity: any) => {
        activities.push(activity);
      });
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
      grade: grade,
      distance: {
        biking: totalBikingDistance,
        running: totalRunningDistance,
        walking: totalWalkingDistance,
        total:
          totalBikingDistance + totalRunningDistance + totalWalkingDistance,
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
}
export default processGradeData;