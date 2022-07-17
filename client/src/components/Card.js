import styled from "styled-components";
const CardHolder = styled.div`
  padding: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;
const CardHeaderHolder = styled.div`
  display: flex;
  align-items: center;
`;
const DotLineHolder = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 12px;
  color: grey;
`;
const DotHolder = styled.p`
  font-weight: bold;
  margin: 0 5px;
  position: relative;
  top: -2px;
  color: grey;
`;
export function CardDotLine({ beforeDot, afterDot }) {
  return (
    <DotLineHolder>
      <p>{beforeDot}</p>
      <DotHolder>.</DotHolder>
      <p>{afterDot}</p>
    </DotLineHolder>
  );
}
export function CardHeader({ children }) {
  return <CardHeaderHolder>{children}</CardHeaderHolder>;
}
export function Card({ children }) {
  return <CardHolder>{children}</CardHolder>;
}
