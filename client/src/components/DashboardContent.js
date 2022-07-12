import styled from "styled-components";
import useContentIndex from "../hooks/useContentIndex";
const DashboardContentHolder = styled.div`
  height: 100vh;
  width: 100%;
`;
export default function DashboardContent() {
  const contentIndex = useContentIndex();
  return (
    <DashboardContentHolder>
      {contentIndex === 0 && <h1>Hello I am main content.</h1>}
      {contentIndex === 1 && <h1>Hello I am exams.</h1>}
      {contentIndex === 2 && <h1>Hello I am performance.</h1>}
    </DashboardContentHolder>
  );
}
