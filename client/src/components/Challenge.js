import { CardDotLine, CardHeader } from "./Card";
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
import useTheme from "../hooks/useTheme";
import axios from "../api/axios";
import { setPastLiveChallenges } from "../redux/reducers/liveChallengeSlice";
import Skeleton from "react-loading-skeleton";

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
const ChallengeHolder = styled.div`
  padding: 15px 0;
`;
const ExamHeaderHolder = styled.div`
  height: auto;
  width: 100%;
  background: #fff;
  padding: 15px 10px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  background: ${(props) => (props.secured < 0 ? "white" : "white")};
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.showCursor ? "pointer" : "default")};
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const UserInfoHolder = styled.div`
  flex-grow: 1;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
`;
const UserName = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
`;

const ChallengesHolder = styled.div`
  @media only screen and (max-width: 600px) {
    padding-top: 16px;
  }
`;
const ChallengesHolderHeader = styled.div`
  background: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  padding: 16px;
`;

export default function Challenge() {
  const socket = useSelector((state) => state.socket.value);
  const [newChallenge, setNewChallenge] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const currentUser = useUser();
  const dispatcher = useDispatch();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(null);

  // states (redux)
  const pastLiveChallenges = useSelector(
    (state) => state.liveChallenge.pastLiveChallenges
  );

  const theme = useTheme();

  const getEasyName = (str) => {
    let result = "";
    if (str) {
      const arr = str.split(" ");
      if (arr.length > 1) {
        result = arr[0] + " " + arr[1][0] + ".";
      } else {
        result = str + ".";
      }
    } else {
      result = str;
    }
    return result;
  };

  useEffect(() => {
    if (user?.id) {
      const getData = async () => {
        setIsLoading(true);
        const resultArray = [];
        const { data: challenges } = await axios.get(
          `/api/live-challenge/all/${user.id}`
        );
        console.log(challenges);
        challenges &&
          challenges.forEach((c) => {
            const p1 = c.players[0];
            const p2 = c.players[1];
            let player1, player2;
            if (p1.examInfo.marks.secured > p2.examInfo.marks.secured) {
              if (p1.id === user.id) {
                player1 = {
                  name: p1.name,
                  username: p1.username,
                  id: p1.id,
                  winner: true,
                  marks: p1.examInfo.marks,
                  answerSheet: p1.examInfo.answerSheet,
                  status: "submitted",
                };
                player2 = {
                  name: p2.name,
                  username: p2.username,
                  id: p2.id,
                  winner: false,
                  marks: p2.examInfo.marks,
                  answerSheet: p2.examInfo.answerSheet,
                  status: "submitted",
                };
              } else {
                player2 = {
                  name: p1.name,
                  username: p1.username,
                  id: p1.id,
                  winner: true,
                  marks: p1.examInfo.marks,
                  answerSheet: p1.examInfo.answerSheet,
                  status: "submitted",
                };
                player1 = {
                  name: p2.name,
                  username: p2.username,
                  id: p2.id,
                  winner: false,
                  marks: p2.examInfo.marks,
                  answerSheet: p2.examInfo.answerSheet,
                  status: "submitted",
                };
              }
            } else {
              if (p2.id === user.id) {
                player1 = {
                  name: p2.name,
                  username: p2.username,
                  id: p2.id,
                  winner: true,
                  marks: p2.examInfo.marks,
                  answerSheet: p2.examInfo.answerSheet,
                  status: "submitted",
                };
                player2 = {
                  name: p1.name,
                  username: p1.username,
                  id: p1.id,
                  winner: false,
                  marks: p1.examInfo.marks,
                  answerSheet: p1.examInfo.answerSheet,
                  status: "submitted",
                };
              } else {
                player2 = {
                  name: p1.name,
                  username: p1.username,
                  id: p1.id,
                  winner: true,
                  marks: p1.examInfo.marks,
                  answerSheet: p1.examInfo.answerSheet,
                  status: "submitted",
                };
                player1 = {
                  name: p2.name,
                  username: p2.username,
                  id: p2.id,
                  winner: false,
                  marks: p2.examInfo.marks,
                  answerSheet: p2.examInfo.answerSheet,
                  status: "submitted",
                };
              }
            }
            if (challenges) resultArray.push({ player1, player2 });
          });
        setTimeout(() => {
          if (challenges.length !== 0)
            dispatcher(setPastLiveChallenges(resultArray));
          setIsLoading(false);
        }, 0);
      };
      getData();
    }
  }, [user, dispatcher]);

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
        <GreyText style={{ marginBottom: "10px" }}>
          {onlineUsers && onlineUsers.length - 1 === 0
            ? "Currently no users online."
            : `Online users (${
                onlineUsers.length - 1 < 0 ? "0" : onlineUsers.length - 1
              })`}
        </GreyText>
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
      <ChallengesHolder>
        <ChallengesHolderHeader style={{ background: theme.cardBg }}>
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
          <CardDotLine
            beforeDot="Total"
            afterDot={pastLiveChallenges && pastLiveChallenges.length}
          />
        </ChallengesHolderHeader>
        {isLoading === false &&
          pastLiveChallenges &&
          pastLiveChallenges.length === 0 && (
            <ChallengesHolderHeader
              style={{ marginTop: "16px", background: theme.cardBg }}
            >
              <GreyText>No recent challenges.</GreyText>
            </ChallengesHolderHeader>
          )}
        <ChallengeHolder>
          {isLoading && (
            <>
              <Skeleton style={{ marginTop: "16px" }} height={100} />
              <Skeleton style={{ marginTop: "16px" }} height={100} />
              <Skeleton style={{ marginTop: "16px" }} height={100} />
            </>
          )}
          {!isLoading &&
            pastLiveChallenges &&
            pastLiveChallenges.map((plc, i) => (
              <ExamHeaderHolder
                key={i}
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "10px",
                  background: theme.cardBg,
                }}
              >
                <UserInfoHolder>
                  <Avatar
                    style={{
                      border: plc.player1?.winner
                        ? "3.5px solid #26d95f"
                        : plc.player1?.status !== "submitted"
                        ? "3.5px solid grey"
                        : "3.5px solid #FF0400",
                      padding: "3px",
                    }}
                    src={userImage}
                    alt=""
                  />
                  <UserName
                    style={{
                      color: plc.player1?.winner
                        ? "#26d95f"
                        : plc.player1?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                  >
                    {getEasyName(plc.player1?.name)}
                  </UserName>

                  {plc.player2?.status !== "left" && (
                    <GreyText
                      style={{
                        color: plc.player1?.winner
                          ? "#26d95f"
                          : plc.player1?.status !== "submitted"
                          ? "grey"
                          : "#FF0400",
                      }}
                    >
                      {plc.player1?.status === "submitted" ? (
                        <>
                          {plc.player1?.winner === "draw"
                            ? "It's a draw"
                            : plc.player1?.winner
                            ? "Winner"
                            : "Work hard"}{" "}
                          <b>
                            ({plc.player1?.marks.secured} /{" "}
                            {plc.player1?.answerSheet.length})
                          </b>
                        </>
                      ) : plc.player1?.status === "left" ? (
                        "left"
                      ) : (
                        "Waiting..."
                      )}
                    </GreyText>
                  )}

                  {plc.player2?.status === "left" && (
                    <GreyText>
                      You got: <b>5/6</b>
                    </GreyText>
                  )}

                  <Flex>
                    {/* <ViewResultButton
                      style={{
                        background: plc.player1?.winner
                          ? "#26d95f"
                          : plc.player1?.status !== "submitted"
                          ? "grey"
                          : "#FF0400",
                      }}
                    >
                      View Result
                    </ViewResultButton> */}
                  </Flex>
                </UserInfoHolder>

                <UserInfoHolder style={{ color: theme.textColor }}>
                  <b>VS</b>
                </UserInfoHolder>

                <UserInfoHolder>
                  <Avatar
                    style={{
                      border: plc.player2?.winner
                        ? "3.5px solid #26d95f"
                        : plc.player2?.status !== "submitted"
                        ? "3.5px solid grey"
                        : "3.5px solid #FF0400",
                      padding: "3px",
                    }}
                    src={userImage}
                    alt=""
                  />
                  <UserName
                    style={{
                      color: plc.player2?.winner
                        ? "#26d95f"
                        : plc.player2?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                  >
                    {getEasyName(plc.player2?.name)}
                  </UserName>

                  <GreyText
                    style={{
                      color: plc.player2?.winner
                        ? "#26d95f"
                        : plc.player2?.status !== "submitted"
                        ? "grey"
                        : "#FF0400",
                    }}
                  >
                    {plc.player2?.status === "submitted" ? (
                      <>
                        {plc.player2?.winner === "draw"
                          ? "It's a draw"
                          : plc.player2?.winner
                          ? "Winner"
                          : "Work hard"}{" "}
                        <b>
                          ({plc.player2?.marks.secured} /{" "}
                          {plc.player2?.answerSheet.length})
                        </b>
                      </>
                    ) : plc.player2?.status === "left" ? (
                      "left"
                    ) : (
                      "Waiting..."
                    )}
                  </GreyText>

                  <Flex>
                    {/* <ViewResultButton
                      style={{
                        background: plc.player2?.winner
                          ? "#26d95f"
                          : plc.player2?.status !== "submitted"
                          ? "grey"
                          : "#FF0400",
                      }}
                    >
                      View Result
                    </ViewResultButton> */}
                  </Flex>
                </UserInfoHolder>
              </ExamHeaderHolder>
            ))}
        </ChallengeHolder>
      </ChallengesHolder>
    </>
  );
}
