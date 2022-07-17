import styled from "styled-components";
import useContentIndex from "../hooks/useContentIndex";
import useTheme from "../hooks/useTheme";
import HeaderTop from "./HeaderTop";
import DashboardContantContainer from "./DashboardContentContainer";
import DashboardMainContent from "./DashboardMainContent";
const DashboardContentHolder = styled.div`
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.mainBg};
  display: flex;
  flex-direction: column;
`;
export default function DashboardContent() {
  const contentIndex = useContentIndex();
  const theme = useTheme();
  return (
    <DashboardContentHolder theme={theme}>
      <HeaderTop />
      <DashboardContantContainer>
        {contentIndex === 0 && <DashboardMainContent />}
        {contentIndex === 1 && <h1>Hello I am exams.</h1>}
        {contentIndex === 2 && <h1>Hello I am performance.</h1>}
      </DashboardContantContainer>
    </DashboardContentHolder>
  );
}
