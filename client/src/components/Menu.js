import { useEffect } from "react";
import styled from "styled-components";

const MenuHolder = styled.div`
  height: auto;
  width: ${(props) => (props.width ? props.width + "px" : "150px")};
  background: #fff;
  position: absolute;
  top: ${(props) => (props.top ? props.top + "px" : "20px")};
  z-index: 250;
  border-radius: 4px;
  transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 20ms;
  ${(props) =>
    props.show
      ? `
   opacity: 1;
   transform: none;
  `
      : `
       opacity: 0;
       visibility: hidden;
       transform: scale(0.75, 0.5625);
      `}
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 230;
`;

const MenuItemHolder = styled.div`
  height: auto;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  border-bottom: 1px solid #eee;
  &:hover {
    opacity: 0.3;
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export function MenuItem({ onItemClick, children }) {
  return <MenuItemHolder onClick={onItemClick}>{children}</MenuItemHolder>;
}

export function Menu({ show, onClose, children, top, width }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "visible";
    }
  }, [show]);
  return (
    <>
      <MenuHolder top={top} width={width} show={show}>
        {children}
      </MenuHolder>
      {show && (
        <>
          <Backdrop onMouseUp={onClose} onDrag={onClose} onClick={onClose} />
        </>
      )}
    </>
  );
}
