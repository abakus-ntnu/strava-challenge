
import { ProcessedUserData } from "../lib/Types";

type PropType = {
    user: ProcessedUserData,
    placement: number,
}
const LeaderboardEntry = (props:PropType) => {
  const { user, placement } = props;

  const CLASS_ICONS = {
    data: "💻",
    komtek: "💩",
  };

  return (
    <div className="w-100 flex space-x-4">
      <p className="flex-1">{placement}</p>
      <p className="flex-1">
        {user.firstname} {user.lastname}
      </p>
      <p className="flex-1">{user.points.total}</p>
      <p className="flex-1">
        {user.grade}. {CLASS_ICONS.data}
      </p>
    </div>
  );
};

export default LeaderboardEntry;
