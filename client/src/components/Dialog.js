import { X } from "react-feather";
import styled from "styled-components";
const DialogBoxContainer = styled.div`
  height: 50vh;
  width: 50vw;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    transform: none;
    border-radius: 0;
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
  z-index: 9999;
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
export function Dialog({ children, show, title, onClose }) {
  return (
    <>
      {show && <Backdrop onClick={onClose} />}
      <DialogBoxContainer show={show}>
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
