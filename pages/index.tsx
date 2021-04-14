import useSWR from "swr";
import StateSWR from "components/Layout/StateSWR";
import Profile from "../components/Profile";
import Leaderboard from "../components/Leaderboard";
import { Typography } from "@material-ui/core";
import { useGlobalState } from "../components/StateManagement/GlobalStateProvider";
import LoginButton from "../components/LoginButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { state } = useGlobalState();
  const { data, error } = useSWR("/api/results/top30grade/1", fetcher);

  if (!data) return <StateSWR />;
  if (error) return <StateSWR error={true} />;

  console.log(data);

  return (
    <>
      <Typography className="text-center" variant="h4">
        Min profil
      </Typography>
      {state.isAuthenticated ? (
        <Profile />
      ) : (
        <div className="mb-5 flex flex-col items-center">
          <p>Du må logge inn for å se profilen din</p>
          <LoginButton />
        </div>
      )}
      <Typography className="text-center" variant="h4">
        Leaderboard
      </Typography>
      <Leaderboard />
    </>
  );
};
export default Home;
