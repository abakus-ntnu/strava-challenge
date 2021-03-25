
import useSWR from "swr";
import { Button, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const clientID = 61772;
  const { data, error } = useSWR("/api/results/top30grade/1", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const getAthlete = async (code: string) => {
    const athlete = await fetch("http://localhost:3000/api/athlete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }).then((r) => r.json());
    console.log(athlete);
  };

  const getClubActivities = async (code: string) => {
    const club = await fetch("http://localhost:3000/api/club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }).then((r) => r.json());
    console.log(club);
  };

  if (router.query.code && router.query.scope) {
    getAthlete(router.query.code as string);
    getClubActivities(router.query.code as string);
  }

  const getAuthToken = () => {
    router.push({
      pathname: "https://www.strava.com/oauth/authorize",
      query: {
        client_id: clientID,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
        response_type: "code",
        approval_prompt: "auto",
        scope: "activity:read",
      },
    });
  };

  return (
    <div className="h-full text-center">
      <Typography variant="h1">Hello world</Typography>
      <Button onClick={() => getAuthToken()}>Logg inn med Strava</Button>
    </div>
  );
}
export default Home;
