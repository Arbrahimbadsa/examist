import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const PageTitleHolder = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;
const PageIconHolder = styled.div`
  margin-right: 5px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function PageTitle({ icon, title, actions }) {
  const theme = useTheme();
  return (
    <PageTitleHolder>
      <PageIconHolder>{icon}</PageIconHolder>
      <Flex>
        <h3 style={{ flexGrow: 1, color: theme.textColor }}>{title}</h3>
        {actions}
      </Flex>
    </PageTitleHolder>
  );
}
