import { Activity, User, StravaToken, AuthorizedUser } from "models/schema";
import { Token, ActivityEntity, UserEntity } from "./Types.d";
import { getNewToken, getActivity, hasExpired } from "./stravaUtils";

export const getToken = async (userId: number) => {
  const token = await StravaToken.findOne({ userId: userId });
  if (token && hasExpired(token)) {
    const newToken = await getNewToken(token.refreshToken);
    await updateToken(newToken, userId);
    return newToken;
  }
  return token;
};

export const createActivity = async (activityId: number, userId: number) => {
  const stravaToken = await getToken(userId);
  const activityData = stravaToken
    ? await getActivity(activityId, stravaToken.accessToken)
    : {};

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

export const isAuthorized = async (
  userId: number,
  authCode: string
): Promise<boolean> =>
  (await AuthorizedUser.findOne({ userId: userId, authCode: authCode }))
    ? true
    : false;

export const fetchActivityDetails = async (userId: number) => {
  const user = await User.findOne({ id: userId });
  const activities = await Activity.find({ athlete: user });
  const stravaToken = await getToken(userId);

  for (const activity of activities) {
    const activityData = stravaToken
      ? await getActivity(activity.id, stravaToken.accessToken)
      : {};
    await updateActivity(activity.id, {
      ...activityData,
      athlete: activity.athlete,
    });
  }
};
