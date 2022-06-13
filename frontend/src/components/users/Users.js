import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../socket/socket";
const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("getUsers");
      const data = await response.json();
      console.log("users", data.users);
      dispatch(setUsers(data.users));
    }
  });
};
