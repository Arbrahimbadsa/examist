import { Home } from "react-feather";
import styled from "styled-components";
import { CardHeader, Card, CardContent } from "./Card";
import DashboardAnalytics from "./DashboardAnalytics";
import QuickPractice from "./QuickPractice";
const MainContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
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

export default function DashboardMainContent() {
  return (
    <>
      <PageTitle>
        <PageIconHolder>
          <Home size={15} />
        </PageIconHolder>
        <p>Dashboard</p>
      </PageTitle>
      <MainContent>
        <QuickPractice />
        <Card centered={true}>
          <CardHeader title="Analytics" />
          <CardContent>
            <DashboardAnalytics />
          </CardContent>
        </Card>
        <Card centered={true}>
          <CardHeader title="Challenges" />
          <DashboardAnalytics />
        </Card>
      </MainContent>
    </>
  );
}
