import styled from "styled-components";
import useTheme from "../hooks/useTheme";
const StyledInput = styled.input`
  background: #fff;
  width: 300px;
  border: solid #eee 2px;
  height: 40px;
  border-radius: 5px;
  padding: 5px 8px;
  display: block;
  &::placeholder {
    color: grey;
  }
  &:focus {
    outline: none;
  }
`;
const InputHolder = styled.div`
  margin: 20px 0;
`;
const Label = styled.label`
  color: ${(props) => props.theme.loginPage.text};
  margin-bottom: 5px;
  display: block;
`;
export default function Input({ label, ...rest }) {
  const theme = useTheme();
  return (
    <InputHolder>
      <Label theme={theme} for={"examist-" + rest.id}>
        {label}
      </Label>
      <StyledInput {...rest} id={"examist-" + rest.id} />
    </InputHolder>
  );
}
