import useSWR from "swr";
import StateSWR from "components/Layout/StateSWR";
import { useGlobalState } from "components/StateManagement/GlobalStateProvider";
import points from "lib/points";

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
        Brukernavn: {data.username} 
      </p>
      <p>
        Navn: {data.firstname} {data.lastname}
      </p>
      <p>
       Linje: {data.grade}. {data.study}
      </p>
      <p>
       Sykling: {points.biking} km
      </p>
      <p>
       Løping: {points.running} km
      </p>
      <p>
       Gåing: {points.walking} km
      </p>
      <p>
      Total: {points.walking + points.running + points.biking} km
      </p>



    </div>);
};

export default Profile;
