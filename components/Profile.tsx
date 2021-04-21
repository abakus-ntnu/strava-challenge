import useSWR from "swr";
import StateSWR from "components/Layout/StateSWR";
import { useGlobalState } from "components/StateManagement/GlobalStateProvider";
import { CodeSharp } from "@material-ui/icons";
import { getUserId } from "../lib/mongoUtils";
import React, { useState, useEffect } from "react";


const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Profile = () => {
  const [userMe, setUserMe] = useState(0);
  const authCode = localStorage.getItem("authCode") || "";
  //useEffect(() => { setUserMe( getUserId(authCode)) });

  // const getter = async (authCode) => {
  //  return await getUserId(authCode);
  // }

  //console.log(authCode);
  //const me = getUserId(authCode);

  const userId = 11385085;
  const { data, error } = useSWR(`/api/results/user/${11385085}`, fetcher);

  if (!data) return <StateSWR />;
  if (error) return <StateSWR error={true} />;

  //console.log(data);

  return (
    <div className="mb-5 text-center h-72 bg-red-100">
      <p>
        {data.username}
      </p>

    </div>);
};

export default Profile;