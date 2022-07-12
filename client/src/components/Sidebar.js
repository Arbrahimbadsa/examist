import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { Grid, Edit2, CloudLightning } from "react-feather";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
const SidebarHolder = styled.div`
  background: ${(props) => props.theme.sidebarBg};
  width: 220px;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
`;
const SidebarHeader = styled.div`
  display: inline-block;
  height: auto;
  width: 100%;
`;
const SidebarHeaderText = styled.h3`
  margin: 20px 0 10px 20px;
`;
const SidebarItemsHolder = styled.div`
  flex-grow: 2;
`;
const SidebarItemHolder = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 20px;
  margin: 5px 0;
  background: ${(props) => (props.active ? props.theme.sidebarItemActive : "")};
  ${(props) =>
    !props.active &&
    `&:hover {
    background: #888888;
  }`}
`;
const SidebarItemText = styled.p`
  margin-left: 8px;
`;

const SidebarItem = ({ label, icon, active, onClick }) => {
  const theme = useTheme("dashboard");
  return (
    <SidebarItemHolder onClick={onClick} active={active} theme={theme}>
      {icon}
      <SidebarItemText>{label}</SidebarItemText>
    </SidebarItemHolder>
  );
};

export default function Sidebar() {
  const theme = useTheme("dashboard");
  const [activeItem, setActiveItem] = useState(0);
  const dispatcher = useDispatch();
  const [items] = useState([
    { label: "Dashboard", icon: <Grid size={20} /> },
    { label: "Exams", icon: <Edit2 size={20} /> },
    { label: "Performance", icon: <CloudLightning size={18} /> },
  ]);
  const handleItemClick = (id) => {
    setActiveItem(id);
    dispatcher(setContentIndex(id));
  };
  return (
    <SidebarHolder theme={theme}>
      <SidebarHeader>
        <SidebarHeaderText>Flame</SidebarHeaderText>
      </SidebarHeader>
      <SidebarItemsHolder>
        {items &&
          items.map((item, i) => (
            <SidebarItem
              label={item.label}
              icon={item.icon}
              key={i}
              active={i === activeItem}
              onClick={() => handleItemClick(i)}
            />
          ))}
      </SidebarItemsHolder>
    </SidebarHolder>
  );
}
