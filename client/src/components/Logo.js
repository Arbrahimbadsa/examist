import styled from "styled-components";
import flame from "../assets/flame.png";
const Flame = styled.img`
  height: ${(props) => props.dim}px;
  width: ${(props) => props.dim}px;
  display: ${(props) => (props.desktop ? "block" : "none")};
  @media only screen and (max-width: 600px) {
    display: ${(props) => (props.phone ? "block" : "none")};
  }
  ${(props) =>
    props.phone &&
    `
    position: relative;
    top: -2px;
  `}
`;
export default function Logo({ dim, desktop, phone }) {
  return (
    <Flame
      dim={dim}
      src={flame}
      desktop={desktop}
      phone={phone}
      alt="flame-logo"
    />
  );
}
