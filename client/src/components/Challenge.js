import { Card, CardHeader } from "./Card";
import IconButton from "./IconButton";
import styled from "styled-components";
import { Plus } from "react-feather";
import { Dialog } from "./Dialog";
import { useState } from "react";
import userImage from "../assets/user-11.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import { setPlayer1, setPlayer2 } from "../redux/reducers/liveChallengeSlice";
import GreyText from "./GreyText";

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  color: grey;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const UsersHolder = styled.div`
  padding: 0 120px;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const User = styled.div`
  height: auto;
  width: 100%;
  padding: 5px 10px;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  margin-bottom: 12px;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    opacity: 0.5;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    cursor: default;
  }
  display: flex;
`;
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
  padding-right: 10px;
`;
const Circle = styled.div`
  height: 10px;
  width: 10px;
  background: green;
  border-radius: 50%;
`;
const Info = styled.p`
  font-size: 12px;
  color: grey;
  margin-bottom: 20px;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
`;

export default function Challenge() {
  const socket = useSelector((state) => state.socket.value);
  const [newChallenge, setNewChallenge] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const currentUser = useUser();
  const dispatcher = useDispatch();

  useEffect(() => {
    socket?.emit("get-users");
  }, [socket]);

  useEffect(() => {
    socket?.on("users", (users) => {
      console.log(users);
      setOnlineUsers(Object.values(users));
    });
    return () => {
      socket?.off("users");
    };
  }, [socket]);

  const handleUserClick = (user) => {
    if (socket)
      socket.emit("send-challenge", {
        from: {
          name: currentUser.name,
          id: currentUser.id,
          username: currentUser.username,
        },
        to: user,
      });
    dispatcher(
      setPlayer1({
        name: currentUser.name,
        id: currentUser.id,
        username: currentUser.username,
      })
    ); // save player one
    dispatcher(setPlayer2(user));
    setNewChallenge(false);
    dispatcher(setContentIndex(3)); // live challenge page
  };

  return (
    <>
      <Dialog
        style={{ background: "#fff" }}
        show={newChallenge}
        onClose={() => {
          setNewChallenge(false);
        }}
        title="Challenge a friend"
      >
        <Info>
          {onlineUsers && onlineUsers.length - 1 === 0
            ? "Currently no users online."
            : `Online users (${
                onlineUsers.length - 1 < 0 ? "0" : onlineUsers.length - 1
              })`}
        </Info>
        <UsersHolder>
          {onlineUsers &&
            onlineUsers.map((user, i) => (
              <div key={i}>
                {user?.username !== currentUser?.username && (
                  <User
                    key={user.id}
                    onClick={() => {
                      handleUserClick(user);
                    }}
                  >
                    <Left>
                      <Avatar alt="" src={userImage} />
                      <p style={{ marginLeft: "10px" }}>{user.name}</p>
                    </Left>
                    <Right>
                      <Circle />
                    </Right>
                  </User>
                )}
              </div>
            ))}
        </UsersHolder>
      </Dialog>
      <Card centered={true}>
        <CardHeader
          title="Challenges"
          actions={
            <Flex onClick={() => setNewChallenge(true)}>
              <IconButton margin="0">
                <Plus size={20} />
              </IconButton>
              New
            </Flex>
          }
        />
        <GreyText>No recent challenges.</GreyText>
      </Card>
    </>
  );
}
