import { ProcessedUserData } from "lib/Types";

// Takes an array of userData and returns the 30 with the highest score
const getTop30 = (usersData: ProcessedUserData[]) => {
  return usersData
    .sort((a: ProcessedUserData, b: ProcessedUserData) => b.points.total - a.points.total)
    .slice(0, 30);
};
export default getTop30;
