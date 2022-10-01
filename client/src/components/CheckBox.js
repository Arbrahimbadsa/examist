import styled from "styled-components";
const CheckBoxHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
const Check = styled.input`
  margin-right: 10px;
`;
const Label = styled.label`
  color: grey;
  font-size: 14px;
`;
export default function CheckBox({ label }) {
  return (
    <CheckBoxHolder>
      <Check type="checkbox" />
      <Label>{label}</Label>
    </CheckBoxHolder>
  );
}
