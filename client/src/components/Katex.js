import * as katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";
import styled from "styled-components";
const KatexHolder = styled.span`
  font-size: 17px;
`;

export default function Katex({ latex }) {
  const holder = useRef(null);
  useEffect(() => {
    const block = String(latex).indexOf("**") > -1;
    if (block) {
      const pureLatex = String(latex).replace(/\*\*/g, "");
      katex.render(String.raw`${pureLatex}`, holder.current, {
        displayMode: true,
      });
    } else {
      const pureLatex = String(latex).replace(/\*/g, "");
      katex.render(String.raw`${pureLatex}`, holder.current, {
        displayMode: false,
      });
    }
  }, [latex]);
  return <KatexHolder ref={holder} />;
}
