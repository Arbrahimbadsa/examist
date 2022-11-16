import styled from "styled-components";
import useContentIndex from "../hooks/useContentIndex";
import useTheme from "../hooks/useTheme";
import HeaderTop from "./HeaderTop";
import DashboardContantContainer from "./DashboardContentContainer";
import DashboardMainContent from "./DashboardMainContent";
import ExamPage from "./ExamPage";
import PastExams from "./PastExams";
import LiveChallenge from "./LiveChallenge";
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
      {contentIndex === 50 && <ExamPage />}
      {contentIndex !== 50 && (
        <DashboardContantContainer>
          {contentIndex === 0 && <DashboardMainContent />}
          {contentIndex === 1 && <PastExams />}
          {contentIndex === 2 && <h1>Hello I am performance.</h1>}
          {contentIndex === 3 && <LiveChallenge />}
        </DashboardContantContainer>
      )}
    </DashboardContentHolder>
  );
}
