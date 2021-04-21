import useSWR from "swr";
import LeaderboardEntry from "./LeaderboardEntry";
import { ProcessedUserData } from "../lib/Types";
import Dropdown from "./Dropdown";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Leaderboard = () => {
  const { data, error } = useSWR("/api/results/top30all", fetcher);

  return (
    <div className="text-center h-96 bg-green-100">
      <Dropdown/>
      <div className="w-100 flex space-x-4">
        <p className="flex-1">
          <b>Plassering</b>
        </p>
        <p className="flex-1">
          <b>Navn</b>
        </p>
        <p className="flex-1">
          <b>Poeng totalt</b>
        </p>
        <p className="flex-1">
          <b>Klasse</b>
        </p>
      </div>
      {data &&
        data.map((user: ProcessedUserData, key: number) => (
          <LeaderboardEntry user={user} placement={key + 1} />
        ))}
    </div>
  );
};

export default Leaderboard;
