import { Home } from "react-feather";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import useUser from "../hooks/useUser";
import { CardHeader, Card, CardContent } from "./Card";
import Challenge from "./Challenge";
import DashboardAnalytics from "./DashboardAnalytics";

import QuickPractice from "./QuickPractice";
const MainContent = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  @media only screen and (max-width: 600px) {
    display: block;
  }
  font-family: "Poppins", sans-serif;
  padding-bottom: 65px;
`;
const PageTitle = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;
const PageIconHolder = styled.div`
  margin-right: 5px;
`;
const FlexChild = styled.div`
  width: 100%;
`;

export default function DashboardMainContent() {
  const user = useUser();
  const theme = useTheme();
  return (
    <>
      <PageTitle>
        <PageIconHolder>
          <Home size={15} color={theme.iconColor} />
        </PageIconHolder>
        <h3 style={{ color: theme.textColor }}>Hello, {user?.name}!</h3>
      </PageTitle>
      <MainContent>
        <FlexChild>
          <QuickPractice />
          <Card style={{ maxWidth: "auto", marginTop: "16px" }} centered={true}>
            <CardHeader title="Analytics" />
            <CardContent>
              <DashboardAnalytics />
            </CardContent>
          </Card>
        </FlexChild>
        <FlexChild>
          <Challenge />
        </FlexChild>
      </MainContent>
    </>
  );
}
