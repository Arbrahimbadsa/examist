import { Home } from "react-feather";
import styled from "styled-components";
import { CardHeader, Card } from "./Card";
import QuickPractice from "./QuickPractice";
const MainContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const PageTitle = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
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
        <Card>
          <CardHeader title="Analytics" />
        </Card>
      </MainContent>
    </>
  );
}
