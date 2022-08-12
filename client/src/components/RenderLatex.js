import { useEffect, useState } from "react";
import Katex from "./Katex";
import styled from "styled-components";
const Text = styled.span``;
export default function RenderLatex({ latex }) {
  const [textArray, setTextArray] = useState([]);
  useEffect(() => {
    const texts = String(latex).split("$");
    setTextArray(texts);
  }, [latex]);
  return (
    <>
      {textArray &&
        textArray.map((text, i) =>
          text.indexOf("*") > -1 ? (
            <Katex key={i} latex={text} />
          ) : (
            <Text key={i}>{text}</Text>
          )
        )}
    </>
  );
}
