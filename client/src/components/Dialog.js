import { X } from "react-feather";
import styled from "styled-components";
const DialogBoxContainer = styled.div`
  height: ${(props) => (props.small ? "auto" : "50vh")};
  width: ${(props) => (props.small ? "400px" : "50vw")};
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 999999999999999;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 600px) {
    height: ${(props) => (props.small ? "auto" : "100vh")};
    width: ${(props) => (props.small ? "300px" : "100vw")};
    top: 0;
    left: 0;
    transform: none;
    border-radius: 0;
    ${(props) =>
      props.small &&
      ` left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
  `}
  }
`;
const DialogHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999999999;
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
`;
const DialogBodyContainer = styled.div`
  padding: 5px 0;
`;
export function DialogHeader({ children }) {
  return <DialogHeaderContainer>{children}</DialogHeaderContainer>;
}
export function DialogBody({ children }) {
  return <DialogBodyContainer>{children}</DialogBodyContainer>;
}
export function Dialog({ children, show, title, onClose, small }) {
  return (
    <>
      {show && <Backdrop onClick={onClose} />}
      <DialogBoxContainer show={show} small={small}>
        <DialogHeader>
          <div>{title}</div>
          <div style={{ cursor: "pointer" }} onClick={onClose}>
            <X color="black" size={20} />
          </div>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
      </DialogBoxContainer>
    </>
  );
}
