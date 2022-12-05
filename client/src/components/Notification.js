import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./IconButton";
import { Bell, X } from "react-feather";
import styled from "styled-components";
import userImage from "../assets/user-11.jpg";
import { setIsNewNotiFound } from "../redux/reducers/notificationSlice";
import GreyText from "./GreyText";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import useUser from "../hooks/useUser";
import {
  setIsAccepted,
  setPlayer1,
  setPlayer2,
} from "../redux/reducers/liveChallengeSlice";
import useTheme from "../hooks/useTheme";

const RedDot = styled.div`
  height: 12px;
  width: 12px;
  background: red;
  position: absolute;
  right: 5px;
  top: 1.5px;
  border-radius: 50%;
  border: 2px solid #fff;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const NotificationsHolder = styled.div`
  height: 642px;
  width: 480px;
  box-shadow: 0 4px 32px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: fixed;
  backdrop-filter: blur(8px);
  z-index: 9999999999;
  top: 20px;
  right: 380px;
  @media only screen and (max-width: 600px) {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
`;
const NotiHolder = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  overflow: scroll;
  padding-bottom: 100px;
  @media only screen and (max-width: 600px) {
    border-radius: 0;
  }
`;
const NotificationHeader = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NotificationBody = styled.div``;
const Noti = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
const NotiText = styled.p`
  font-size: 13.5px;
  margin-left: 10px;
  color: grey;
  display: flex;
  flex-direction: column;
`;
const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 9999999999999999999999 !important;
`;

export default function Notification() {
  const [show, setShow] = useState(false);
  const isNewFound = useSelector((state) => state.notification.isNewFound);
  const notis = useSelector((state) => state.notification.values);
  const dispatcher = useDispatch();
  const currentUser = useUser();
  const socket = useSelector((state) => state.socket.value);
  const theme = useTheme();

  const handleNotiClick = (noti) => {
    // handle challenge notis
    if (noti.type === "challenge") {
      dispatcher(setContentIndex(3));
      dispatcher(setPlayer1(currentUser));
      dispatcher(setPlayer2(noti.sender));
      setShow(false);
      dispatcher(setIsAccepted(true));
      socket &&
        socket.emit("confirm-challenge", { from: noti.to, to: noti.sender });
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setShow(!show);
          dispatcher(setIsNewNotiFound(false));
        }}
        style={{ position: "relative" }}
      >
        <Bell color={theme.iconColor} size={20} />
        <RedDot show={isNewFound} />
      </IconButton>
      {show && <Backdrop onClick={() => setShow(false)} />}
      {show && (
        <NotificationsHolder>
          <NotiHolder>
            <NotificationHeader>
              <p>Notifications</p>
              <IconButton onClick={() => setShow(false)} margin="0">
                <X size={20} />
              </IconButton>
            </NotificationHeader>
            <NotificationBody>
              {notis && notis.length === 0 && (
                <GreyText style={{ margin: "10px" }}>
                  No notifications yet.
                </GreyText>
              )}
              {notis &&
                notis.map((noti, i) => (
                  <Noti key={i} onClick={() => handleNotiClick(noti)}>
                    <Avatar src={userImage} alt="" />
                    <NotiText>
                      <span>
                        <b>{noti.sender.name}</b> has challenged you. Tap to
                        accept.
                      </span>
                      <span style={{ fontSize: "12px" }}>at {noti.at}</span>
                    </NotiText>
                  </Noti>
                ))}
            </NotificationBody>
          </NotiHolder>
        </NotificationsHolder>
      )}
    </>
  );
}
