import { Activity, User, StravaToken, AuthorizedUser } from "models/schema";
import { Token, ActivityEntity, UserEntity } from "./Types.d";
import { getNewToken, hasExpired, getClubActivities } from "./stravaUtils";

export const getToken = async () => {
  // Requires at least one authenticated user
  const token = await StravaToken.findOne();
  if (token && hasExpired(token)) {
    const newToken = await getNewToken(token.refreshToken);
    await updateToken(newToken, token.userId);
    return newToken;
  }
  return token;
};

export const createActivity = async (activityId: number, userId: number) => {
  const stravaToken = await getToken();
  const clubActivities = await getClubActivities(stravaToken.accessToken);
  // Might be an issue if two activities are created at the exact same time
  const activityData = clubActivities[0];

  if (!isValidActivity(activityData)) return;

  const user = await findOrCreateUser({ id: userId });
  const activity = await Activity.create({
    ...activityData,
    id: activityId,
    athlete: user,
  });

  await activity.save();
  await user.activities.push(activity);
  await user.save();
};

const isValidActivity = (activityData: any) => {
  const { type, distance, moving_time } = activityData;
  let upperSpeedBound; // measured in m/s
  switch (type){
    case "Ride": 
      upperSpeedBound = 80;
      break;
    case "Run": 
      upperSpeedBound = 10;
      break;
    case "Walk": 
      upperSpeedBound = 5;
      break;
    default: 
      upperSpeedBound = 0;
  };
  if (distance/moving_time > upperSpeedBound) return false;
  return true;
};

export const updateActivity = async (
  activityId: number,
  updates: Partial<ActivityEntity>
) => await Activity.findOneAndUpdate({ id: activityId }, updates);

export const deleteActivity = async (activityId: number, userId: number) => {
  const activity = await Activity.findOne({ id: activityId });
  const user = await findOrCreateUser({ id: userId });
  await user.activities.pull(activity);
  await Activity.deleteOne(activity);
  await user.save();
};

export const findOrCreateUser = async (userObj: Partial<UserEntity>) => {
  let user = await User.findOneAndUpdate({ id: userObj.id }, userObj).populate(
    "activities"
  );

  if (user === null) {
    user = await User.create(userObj);
  }

  return user;
};

export const updateToken = async (token: Token, userId: number) => {
  const stravaToken = await StravaToken.findOne({
    userId: userId,
  });

  if (stravaToken) {
    await StravaToken.findOneAndUpdate({ userId: userId }, token);
  } else {
    await StravaToken.create({ userId: userId, ...token });
  }
};

export const registerUser = async (
  userId: number,
  grade: number,
  study: string
) =>
  await User.findOneAndUpdate({ id: userId }, { grade: grade, study: study });

export const removeUserTokens = async (userId: number) =>
  await StravaToken.deleteMany({ userId: userId });

export const deAuthorizeUser = async (userId: number) =>
  await AuthorizedUser.deleteMany({ userId: userId });

export const authorizeUser = async (userId: number, authCode: string) =>
  await AuthorizedUser.create({ userId: userId, authCode: authCode });

export const getUserId = async (authCode: string): Promise<number> => {
  const user = await AuthorizedUser.findOne({ authCode: authCode });
  return user.userId;
};
