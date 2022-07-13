import styled from "styled-components";
import useContentIndex from "../hooks/useContentIndex";
import useTheme from "../hooks/useTheme";
import HeaderTop from "./HeaderTop";
const DashboardContentHolder = styled.div`
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.mainBg};
`;
export default function DashboardContent() {
  const contentIndex = useContentIndex();
  const theme = useTheme();
  return (
    <DashboardContentHolder theme={theme}>
      <HeaderTop />
      {contentIndex === 0 && <h1>Hello I am main content.</h1>}
      {contentIndex === 1 && <h1>Hello I am exams.</h1>}
      {contentIndex === 2 && <h1>Hello I am performance.</h1>}
    </DashboardContentHolder>
  );
}
