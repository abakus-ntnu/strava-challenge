export type StravaEventData = {
  object_type: "athlete" | "activity";
  object_id: number;
  aspect_type: "create" | "update" | "delete";
  updates: object;
  owner_id: number;
  subscription_id: number;
  event_time: number;
};

export type Token = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
};

export type ActivityEntity = {
  id: number;
  user: UserEntity;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
};

export type UserEntity = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  grade: number;
  study: string;
  activities: ActivityEntity[];
};

export type ProcessedUserData = {
  username: string,
  firstname: string,
  lastname: string,
  grade: number,
  study: string,
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

export type ProcessedGradeData = {
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
