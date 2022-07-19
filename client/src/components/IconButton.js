import styled from "styled-components";
const IconButtonHolder = styled.div`
  height: auto;
  width: auto;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.margin ? props.margin : "0 15px")};
  &:hover {
    opacity: 0.5;
  }
`;

export default function IconButton({ children, margin, ...rest }) {
  return (
    <IconButtonHolder margin={margin} {...rest}>
      {children}
    </IconButtonHolder>
  );
}
