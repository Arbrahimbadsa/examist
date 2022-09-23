import styled from "styled-components";
const Holder = styled.div`
  flex-grow: 2;
  width: 100%;
  padding: 16px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default function DashboardContentContainer({ children }) {
  return <Holder>{children}</Holder>;
}
