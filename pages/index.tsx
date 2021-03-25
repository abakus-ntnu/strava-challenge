import useSWR from "swr";
import { Typography } from "@material-ui/core";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR("/api/results/top30grade/1", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="h-full text-center">
      <Typography variant="h1">Hello world</Typography>
    </div>
  );
}
export default Home;
