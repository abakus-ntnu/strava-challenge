import mongoose from "mongoose";

delete mongoose.connection.models["Activity"];
delete mongoose.connection.models["User"];
delete mongoose.connection.models["StravaToken"];
delete mongoose.connection.models["AuthorizedUser"];

const ActivitySchema = new mongoose.Schema(
  {
    id: { type: Number },
    athlete: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String },
    distance: { type: Number },
    moving_time: { type: Number },
    elapsed_time: { type: Number },
    total_elevation_gain: { type: Number },
    type: { type: String },
    start_date: { type: String },
  },
  { autoCreate: true }
);
export const Activity = mongoose.model("Activity", ActivitySchema);

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number },
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    grade: { type: Number },
    study: { type: String },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  { autoCreate: true }
);

export const User = mongoose.model("User", UserSchema);

const AuthorizedUserSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    authCode: { type: String },
  },
  { autoCreate: true }
);

export const AuthorizedUser = mongoose.model(
  "AuthorizedUser",
  AuthorizedUserSchema
);

const StravaTokenSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    refreshToken: { type: String },
    accessToken: { type: String },
    expiresAt: { type: Number },
  },
  { autoCreate: true }
);

export const StravaToken = mongoose.model("StravaToken", StravaTokenSchema);
