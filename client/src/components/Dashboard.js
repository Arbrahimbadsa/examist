import Sidebar from "./Sidebar";
import styled from "styled-components";
import DashboardContent from "./DashboardContent";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSocket } from "../redux/reducers/socketSlice";
import useUser from "../hooks/useUser";
import Toast from "./Toast";
import useEvents from "../hooks/useEvents";
const DashboardHolder = styled.div`
  display: flex;
`;
// socket initialization
const socket = io("localhost:5000", { autoConnect: false });

export default function Dashboard() {
  const dispatcher = useDispatch();
  const user = useUser();
  useEvents();
  useEffect(() => {
    const connectSocket = () => {
      socket.auth = {
        user: {
          name: user.name,
          id: user.id,
          username: user.username,
        },
      };
      socket.connect();
      dispatcher(setSocket(socket));
      socket.emit("register-key", user);
    };
    if (user && user.name) connectSocket();
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user, dispatcher]);
  return (
    <DashboardHolder>
      <Toast />
      <Sidebar />
      <DashboardContent />
    </DashboardHolder>
  );
}
