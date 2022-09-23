import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";
import { Clock } from "react-feather";
const TimerHolder = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  width: auto;
  position: relative;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;
const TimerTextHodlder = styled.div`
  height: 45px;
  width: auto;
  padding: 10px 20px;
  background: #13b2ec;
  color: #fff;
  border-radius: 5px;
  position: relative;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
export default function Timer({ expiryTimestamp, onExpire }) {
  const { seconds, minutes, hours } = useTimer({ expiryTimestamp, onExpire });
  const [sec, setSec] = useState(seconds);
  const [min, setMin] = useState(minutes);
  const [hr, setHr] = useState(hours);
  useEffect(() => {
    if (seconds < 10) {
      setSec(`0${seconds}`);
    } else {
      setSec(seconds);
    }
  }, [seconds]);
  useEffect(() => {
    if (minutes < 10) {
      setMin(`0${minutes}`);
    } else {
      setMin(minutes);
    }
  }, [minutes]);
  useEffect(() => {
    if (hours < 10) {
      setHr(`0${hours}`);
    } else {
      setHr(hours);
    }
  }, [hours]);
  return (
    <TimerHolder>
      <TimerTextHodlder>
        <Clock style={{ marginRight: "5px" }} size={20} />
        <p>
          Time left : {hr !== "00" ? hr + ":" : null}
          {min}:{sec}
        </p>
      </TimerTextHodlder>
    </TimerHolder>
  );
}
