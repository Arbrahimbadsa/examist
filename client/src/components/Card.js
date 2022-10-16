import styled from "styled-components";
const CardHolder = styled.div`
  padding: 16px;
  background: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  ${(props) => props.minHeight && `min-height: ${(props) => props.minHeight}`}
  @media only screen and (max-width: 600px) {
    min-width: 100% !important;
  }
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
const CardTitleText = styled.h4`
  display: block;
`;
const CardContentHolder = styled.div`
  height: 95%;
  width: 100%;
`;
export function CardContent({ children, ...rest }) {
  return <CardContentHolder {...rest}>{children}</CardContentHolder>;
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
export function CardHeader({ title, actions, margin, ...rest }) {
  return (
    <CardHeaderHolder margin={margin} {...rest}>
      <CardTitleText>{title}</CardTitleText>
      <CardActions>{actions}</CardActions>
    </CardHeaderHolder>
  );
}
export function Card({ children, ...rest }) {
  return <CardHolder {...rest}>{children}</CardHolder>;
}
