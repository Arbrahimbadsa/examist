import { useEffect, useRef } from "react";
export default function Latex(props) {
  let node = useRef();
  useEffect(() => {
    renderMath();
  });
  const renderMath = () => {
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, node.current]);
  };
  return <div ref={node}>{props.children}</div>;
}
