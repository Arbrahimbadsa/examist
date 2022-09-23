import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronUp } from "react-feather";
const GoTopHolder = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #13b2ec;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export default function GoTop({ elem }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (elem.current) {
      elem.current.addEventListener("scroll", () => {
        if (elem.current.scrollTop > 300) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
    }
  }, [elem]);
  const handleClick = () =>
    elem.current.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <>
      {show && (
        <GoTopHolder onClick={handleClick}>
          <ChevronUp size={20} color="#fff" />
        </GoTopHolder>
      )}
    </>
  );
}
