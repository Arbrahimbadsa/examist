import { useEffect } from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
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
  margin: 10px 0;
  max-height: 120px;
  overflow-y: scroll;
  z-index: 9999999999;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
`;
const Option = styled.div`
  padding: 12px 0 12px 16px;
  color: grey;
  font-size: 14.5px;
  &:hover {
    opacity: 0.5;
  }
  border-bottom: 1px solid #e8e8e8;
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
const OptionChipsHolder = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin-right: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OptionChipsHolderMain = styled.div`
  width: ${(props) => props.width && props.width};
  display: flex;
`;
const Chip = styled.div`
  padding: 0 5px;
  background: grey;
  color: #fff;
  width: auto;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer !important;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export default function Select({
  label,
  options,
  onChange,
  selected,
  multipleChoice,
  ...rest
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionsShow = () => setShowOptions(!showOptions);
  const theme = useTheme();
  const handleOptionClick = (option) => {
    if (!multipleChoice) {
      onChange(option);
    } else {
      const found = selectedOptions.indexOf(option) > -1;
      if (found) {
        const copy = [...selectedOptions];
        const index = selectedOptions.indexOf(option);
        copy.splice(index, 1);
        setSelectedOptions(copy);
        onChange(copy);
      } else {
        setSelectedOptions([...selectedOptions, option]);
        onChange([...selectedOptions, option]);
      }
    }
  };
  useEffect(() => {
    if (selected.length === 0) setSelectedOptions([]);
  }, [selected]);
  return (
    <SelectHolder {...rest}>
      <Label style={{ color: theme.textColor }}>{label}</Label>
      <StyledSelect onClick={handleOptionsShow}>
        <DefaultTextHolder>
          {multipleChoice ? (
            <OptionChipsHolder>
              <OptionChipsHolderMain
                width={`calc(180px * ${options && options.length})`}
              >
                <p>
                  {selected.length === 0 &&
                    (rest.loading ? "Loading..." : "Select One")}
                </p>
                {selected.map((item, i) => (
                  <Chip key={i}>{item}</Chip>
                ))}
              </OptionChipsHolderMain>
            </OptionChipsHolder>
          ) : (
            <p>
              {selected ? selected : rest.loading ? "Loading..." : "Select One"}
            </p>
          )}
          {showOptions ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </DefaultTextHolder>
        {showOptions && <Backdrop onClick={() => setShowOptions(false)} />}
        {showOptions && options && (
          <OptionsHolder>
            {options &&
              options.map((option, i) => (
                <Option key={i} onClick={() => handleOptionClick(option)}>
                  {option}
                </Option>
              ))}
          </OptionsHolder>
        )}
      </StyledSelect>
    </SelectHolder>
  );
}
