import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components";
const SelectHolder = styled.div`
  margin: ${(props) => props.margin};
`;
const StyledSelect = styled.div`
  background: #fff;
  width: 300px;
  border: solid #eee 2px;
  height: 40px;
  border-radius: 5px;
  display: block;
  cursor: pointer;
  position: relative;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const DefaultTextHolder = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  justify-content: space-between;
  height: 100%;
  padding: 0 10px;
  color: grey;
  font-size: 12px;
`;
const Label = styled.label`
  color: "#101727";
  margin-bottom: 5px;
  display: block;
`;
const OptionsHolder = styled.div`
  position: absolute;
  border-radius: 8px;
  top: 100%;
  width: 100%;
  background: #fff;
  padding: 16px;
  margin: 10px 0;
  max-height: 120px;
  overflow-y: scroll;
  z-index: 9999999999;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
`;
const Option = styled.div`
  padding: 8px 0;
  color: grey;
  font-size: 14.5px;
  &:hover {
    opacity: 0.5;
  }
  border-bottom: 1px solid #eee;
`;
const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 230;
  cursor: default;
`;

export default function Select({ label, options, ...rest }) {
  const [selectedOption, setSelectedOption] = useState("Select one");
  const [showOptions, setShowOptions] = useState(false);
  const handleOptionsShow = () => setShowOptions(!showOptions);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <SelectHolder {...rest}>
      <Label>{label}</Label>
      <StyledSelect onClick={handleOptionsShow}>
        <DefaultTextHolder>
          <p>{selectedOption}</p>
          {showOptions ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </DefaultTextHolder>
        {showOptions && <Backdrop onClick={() => setShowOptions(false)} />}
        {showOptions && options && (
          <OptionsHolder>
            {options &&
              options.map((option, i) => (
                <Option key={i} onClick={() => handleOptionSelect(option)}>
                  {option}
                </Option>
              ))}
          </OptionsHolder>
        )}
      </StyledSelect>
    </SelectHolder>
  );
}
