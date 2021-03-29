import type { NextApiRequest, NextApiResponse } from "next";
import { StravaEventData } from "../../lib/Types";
import { createActivity, updateActivity, deleteActivity } from "lib/mongoUtils";
import mongoose from "mongoose";
import url from "utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  if (
    req.method === "POST" &&
    req.body.subscription_id === Number(process.env.STRAVA_SUBSCRIPTION_ID)
  ) {
    const data: StravaEventData = req.body;
    if (data.object_type === "activity") {
      if (data.aspect_type === "create") {
        await createActivity(data.object_id, data.owner_id);
      } else if (data.aspect_type === "update") {
        await updateActivity(data.object_id, data.updates);
      } else {
        await deleteActivity(data.object_id, data.owner_id);
      }
    }
    res.status(200).json("Success");
  } else {
    res.status(403).json("Access denied");
  }
};
