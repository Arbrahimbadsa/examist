import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "react-feather";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Holder = styled.div`
  flex-grow: 2;
  width: 100%;
  padding: 16px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
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
export default function DashboardContentContainer({ children }) {
  const ref = useRef(null);
  const [showGoTop, setGoTop] = useState(false);
  const isExamStarted = useSelector((state) => state.isExamStarted.value);
  useEffect(() => {
    ref.current.addEventListener("scroll", (e) => {
      if (ref.current.scrollTop > 300) {
        setGoTop(true);
        console.log(showGoTop);
      } else {
        setGoTop(false);
      }
    });
  }, [showGoTop]);
  const handleGotop = () => {
    ref.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Holder ref={ref}>
      <>
        {children}
        {showGoTop && isExamStarted && (
          <GoTopHolder onClick={handleGotop}>
            <ChevronUp size={20} color="#fff" />
          </GoTopHolder>
        )}
      </>
    </Holder>
  );
}
