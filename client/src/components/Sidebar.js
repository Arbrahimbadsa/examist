import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { Grid, Edit2, BarChart } from "react-feather";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setContentIndex,
  updateContentIndex,
} from "../redux/reducers/contentIndexSlice";
import Logo from "./Logo";
import { useEffect } from "react";
import useContentIndex from "../hooks/useContentIndex";

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
const SidebarHeaderText = styled.p`
  margin: 20px 0 10px 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
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
  const contentIndex = useContentIndex();
  const dispatcher = useDispatch();
  const [items] = useState([
    { label: "Dashboard", icon: <Grid size={20} /> },
    { label: "Exams", icon: <Edit2 size={20} /> },
    { label: "Performance", icon: <BarChart size={18} /> },
  ]);
  const handleItemClick = (id) => {
    dispatcher(setContentIndex(id));
  };
  useEffect(() => {
    dispatcher(updateContentIndex());
  }, [dispatcher]);
  return (
    <SidebarHolder theme={theme}>
      <SidebarHeader>
        <SidebarHeaderText>
          <Logo dim={40} />
          Flame
        </SidebarHeaderText>
      </SidebarHeader>
      <SidebarItemsHolder>
        {items &&
          items.map((item, i) => (
            <SidebarItem
              label={item.label}
              icon={item.icon}
              key={i}
              active={i === contentIndex}
              onClick={() => handleItemClick(i)}
            />
          ))}
      </SidebarItemsHolder>
    </SidebarHolder>
  );
}
