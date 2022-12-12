import styled from "styled-components";
const Holder = styled.div`
  flex-grow: 2;
  width: 100%;
  padding: 16px;
  overflow-x: scroll;
  @media only screen and (max-width: 600px) {
    &::-webkit-scrollbar {
      display: none;
    }
    padding: 16px 8px 16px 8px;
  }
`;
export default function DashboardContentContainer({ children }) {
  return <Holder>{children}</Holder>;
}
