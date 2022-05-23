import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
const useUser = () => {
  const user = useSelector(selectUser);
};

export default useUser;
