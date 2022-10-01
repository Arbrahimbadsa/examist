import styled from "styled-components";
const Grey = styled.p`
  color: grey;
  font-size: 13px;
`;
export default function GreyText({ children, ...rest }) {
  return <Grey {...rest}>{children}</Grey>;
}
