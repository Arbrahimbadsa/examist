import styled from "styled-components";
const Holder = styled.div`
  flex-grow: 2;
  width: 100%;
  overflow-x: scroll;
  padding: 16px;
`;
export default function DashboardContentContainer({ children }) {
  return <Holder>{children}</Holder>;
}
