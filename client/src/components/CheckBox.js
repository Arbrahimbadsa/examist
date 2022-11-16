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
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
export default function CheckBox({ label, checked, onClick }) {
  return (
    <CheckBoxHolder>
      <Check
        checked={checked}
        onClick={onClick}
        onChange={onClick}
        type="checkbox"
      />
      <Label onClick={onClick}>{label}</Label>
    </CheckBoxHolder>
  );
}
