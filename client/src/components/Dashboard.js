import Sidebar from "./Sidebar";
import styled from "styled-components";
import DashboardContent from "./DashboardContent";
const DashboardHolder = styled.div`
  display: flex;
`;
export default function Dashboard() {
  return (
    <DashboardHolder>
      <Sidebar />
      <DashboardContent />
    </DashboardHolder>
  );
}
