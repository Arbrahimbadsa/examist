import styled from "styled-components";
const CardHolder = styled.div`
  padding: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  ${(props) => props.minHeight && `min-hieght: ${(props) => props.minHeight}`}
`;
const CardHeaderHolder = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin};
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
const CardActionsHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
const CardTitleText = styled.span`
  display: block;
`;
const CardContentHolder = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export function CardContent({ children }) {
  return <CardContentHolder>{children}</CardContentHolder>;
}
export function CardActions({ children }) {
  return <CardActionsHolder>{children}</CardActionsHolder>;
}
export function CardDotLine({ beforeDot, afterDot }) {
  return (
    <DotLineHolder>
      <p>{beforeDot}</p>
      <DotHolder>.</DotHolder>
      <p>{afterDot}</p>
    </DotLineHolder>
  );
}
export function CardHeader({ title, actions, margin }) {
  return (
    <CardHeaderHolder margin={margin}>
      <CardTitleText>{title}</CardTitleText>
      <CardActions>{actions}</CardActions>
    </CardHeaderHolder>
  );
}
export function Card({ children, ...rest }) {
  return <CardHolder {...rest}>{children}</CardHolder>;
}
