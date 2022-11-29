import styled from "styled-components";
import PageTitle from "./PageTitle";
import { Edit2 } from "react-feather";
import { useEffect, useRef, useState } from "react";
import { MathfieldElement } from "mathlive";

const AddQuestionContainer = styled.div`
  font-family: "Poppins", sans-serif;
  overflow-y: scroll;
`;
const AddQuestionRest = styled.div``;
const InputWrapper = styled.div`
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #d4d4d4;
  margin-top: 10px;
  position: relative;
  &:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
  }
`;
const Placeholder = styled.p`
  position: absolute;
  color: grey;
  font-size: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
  background: transparent;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 15px;
  padding-left: 10px;
`;

export default function AddQuestion() {
  const input = useRef(null);
  const [value, setValue] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [mfe, setMfe] = useState(null);
  useEffect(() => {
    const mfe = new MathfieldElement();
    mfe.setOptions({
      virtualKeyboardMode: "manual",
      defaultMode: "math",
      keypressSound: false,
      onExport: (mf, latex) => `$**${latex}**$`,
    });
    mfe.setAttribute("id", "mfe");
    mfe.style.zIndex = "2";
    input.current.appendChild(mfe);
    mfe.addEventListener("input", () => {
      setValue(mfe.getValue());
    });
    setMfe(mfe);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      input.current?.removeChild(mfe);
    };
  }, []);
  return (
    <AddQuestionContainer>
      <PageTitle icon={<Edit2 size={15} />} title={"Add Question"} />
      <AddQuestionRest>
        <p>Prefix</p>
        <Input placeholder="Enter question suffix" />
        <p>Type your question</p>
        <InputWrapper ref={input}>
          {!value && <Placeholder>Enter your math</Placeholder>}
        </InputWrapper>
      </AddQuestionRest>
    </AddQuestionContainer>
  );
}
