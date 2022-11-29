import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import userImage from "../assets/user-11.jpg";
import { v4 as uuidv4 } from "uuid";
import axios from "../api/axios";
import useHeader from "../hooks/useHeader";

const LiveChallengeHolder = styled.div`
  font-family: "Poppins", sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const UsersHolder = styled.div`
  height: 50%;
  width: 50%;
  background: #fff;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Avatar = styled.img`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border: 3px solid #13b2ec;
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.3;
  `}
`;
const Vs = styled.h1``;
const GreyText = styled.p`
  color: grey;
  position: relative;
  top: -65px;
  font-size: 13.5px;
`;
const CountDownHolder = styled.div`
  height: 100%;
  width: 90%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
export default function LiveChallenge() {
  const player1 = useSelector((state) => state.liveChallenge.player1);
  const player2 = useSelector((state) => state.liveChallenge.player2);
  const isAccepted = useSelector((state) => state.liveChallenge.isAccepted);
  const [countDown, setCountDown] = useState(5);
  const isStarted = useSelector((state) => state.liveChallenge.isStarted);
  const socket = useSelector((state) => state.socket.value);
  const { headers } = useHeader();

  useEffect(() => {
    const t = setInterval(async () => {
      if (countDown !== 0 && isAccepted) {
        setCountDown(countDown - 1);
      } else {
        // if the count down is 0
        if (isAccepted && isStarted) {
          if (socket) {
            clearInterval(t);
            const url = `/api/question/get-filtered-questions`;
            const { data } = await axios.post(
              url,
              { count: 5 },
              {
                headers,
              }
            );
            console.log(data);
            const s = data;
            const exam = {
              name: "Live Challenge",
              player1,
              player2,
              questions: s,
              examId: uuidv4(),
              totalQuestions: s?.length,
              examTime: 60,
              isNegAllowed: true,
            };
            socket.emit("start-exam", exam);
            // go to useEvents.js for socket.on()
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, isAccepted, isStarted, socket, player1, player2]);

  return (
    <LiveChallengeHolder>
      {countDown !== 0 && isAccepted && (
        <CountDownHolder>
          <h1>{countDown}</h1>
        </CountDownHolder>
      )}
      <UsersHolder>
        <User>
          <Avatar alt="" src={userImage} />
          <p>{player1?.name}</p>
        </User>
        <Vs>VS</Vs>
        <User disabled={!isAccepted}>
          <Avatar alt="" src={userImage} />
          <p>{player2?.name}</p>
        </User>
      </UsersHolder>
      {!isAccepted && <GreyText>Waiting for user acceptance...</GreyText>}
    </LiveChallengeHolder>
  );
}
