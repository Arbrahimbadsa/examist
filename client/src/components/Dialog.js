import { X } from "react-feather";
import styled from "styled-components";
const DialogBoxContainer = styled.div`
  height: ${(props) => (props.small ? "auto" : "400px")};
  width: ${(props) => (props.small ? "400px" : "900px")};
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 999999999999999;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 0 24px 12px
    var(--paper-dialog-shadow-color, rgba(0, 0, 0, 0.15));
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
  background: #000;
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
`;
const DialogBodyContainer = styled.div`
  ${(props) =>
    props.center &&
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    
  `}
`;
export function DialogHeader({ children }) {
  return <DialogHeaderContainer>{children}</DialogHeaderContainer>;
}
export function DialogBody({ children, ...rest }) {
  return <DialogBodyContainer {...rest}>{children}</DialogBodyContainer>;
}
export function Dialog({ children, show, title, onClose, small, ...rest }) {
  return (
    <>
      {show && <Backdrop onClick={onClose} />}
      <DialogBoxContainer show={show} small={small} {...rest}>
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
