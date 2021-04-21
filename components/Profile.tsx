import useSWR from "swr";
import StateSWR from "components/Layout/StateSWR";
import { useGlobalState } from "components/StateManagement/GlobalStateProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Profile = () => {


  const { state } = useGlobalState();
  const userId = 11385085;
  const { data, error } = useSWR(`/api/results/user/${11385085}`, fetcher);

  if (!data) return <StateSWR />;
  if (error) return <StateSWR error={true} />;

  console.log(data);

  return (
    <div className="mb-5 text-center h-72 bg-red-100">
      <p>
        {data.username}
      </p>

    </div>);
};

export default Profile;
