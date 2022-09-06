import styled from "styled-components";

const FlexDivContainer = styled.div`
  display: flex;
  ${(props) =>
    props.dir === "row"
      ? `
    justify-content: ${(props) => props.hor};
    align-items: ${(props) => props.ver};
  `
      : `justify-content: ${(props) => props.ver};
    align-items: ${(props) => props.hor};`}
`;
export default function FlexDiv({ children, hor, ver, dir = "row" }) {
  return (
    <FlexDivContainer hor={hor} ver={ver} dir={dir}>
      {children}
    </FlexDivContainer>
  );
}
