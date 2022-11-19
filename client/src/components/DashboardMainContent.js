import { Home } from "react-feather";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import { CardHeader, Card, CardContent } from "./Card";
import Challenge from "./Challenge";
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
  const user = useUser();
  return (
    <>
      <PageTitle>
        <PageIconHolder>
          <Home size={15} />
        </PageIconHolder>
        <h3>Hello, {user?.name}!</h3>
      </PageTitle>
      <MainContent>
        <QuickPractice />
        <Challenge />
        <Card centered={true}>
          <CardHeader title="Analytics" />
          <CardContent>
            <DashboardAnalytics />
          </CardContent>
        </Card>
      </MainContent>
    </>
  );
}
