import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { Grid, Edit2, BarChart, ArrowLeft } from "react-feather";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContentIndex,
  updateContentIndex,
} from "../redux/reducers/contentIndexSlice";
import { useEffect } from "react";
import useContentIndex from "../hooks/useContentIndex";
import { useRef } from "react";
import { setPcSidebar, setShowSidebar } from "../redux/reducers/sidebarSlice";
import { useLayoutEffect } from "react";
import useDim from "../hooks/useDim";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";

const SidebarHolder = styled.div`
  background: ${(props) => props.theme.sidebarBg};
  width: 220px;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  position: relative;
  z-index: 9999999;
  @media only screen and (max-width: 600px) {
    transition: 0.2s;
    position: absolute;
    transform: translate(-220px, 0);
    z-index: 9999999999999999999 !important;
  }
`;
const SidebarHider = styled.div`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999999999;
  position: absolute;
`;
const SidebarHeader = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  height: 55px;
  align-items: center;
  padding: 0 16px;
`;
const SidebarHeaderText = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 100%;
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
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const SidebarItemText = styled.p`
  margin-left: 8px;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 998 !important;
`;
const FlameText = styled.span`
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  const sidebarRef = useRef();
  const showSidebar = useSelector((state) => state.showSidebar.value);
  const pcSidebar = useSelector((state) => state.showSidebar.pcSidebar);
  const isExamStarted = useSelector((state) => state.isExamStarted.value);
  const theme = useTheme("dashboard");
  const contentIndex = useContentIndex();
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const isPc = useDim();

  const [items] = useState([
    { label: "Dashboard", icon: <Grid size={20} />, route: "/dashboard" },
    { label: "Past Exams", icon: <Edit2 size={20} />, route: "past-exams" },
    {
      label: "Performance",
      icon: <BarChart size={18} />,
      route: "performance",
    },
  ]);

  const handleItemClick = (id) => {
    if (!isExamStarted) {
      dispatcher(setContentIndex(id));
      dispatcher(setShowSidebar(false));
    }
  };

  useEffect(() => {
    dispatcher(updateContentIndex());
  }, [dispatcher]);

  useLayoutEffect(() => {
    if (!isPc) {
      if (showSidebar !== null) {
        if (showSidebar === true) {
          sidebarRef.current.style.transform = "translate(0px, 0)";
        } else {
          sidebarRef.current.style.transform = "translate(-220px, 0)";
        }
      }
    }
  }, [showSidebar, isPc]);

  useLayoutEffect(() => {
    if (isPc) {
      if (pcSidebar) {
        sidebarRef.current.style.transform = "translate(-220px, 0px)";
        sidebarRef.current.style.display = "none";
      } else {
        sidebarRef.current.style.transform = "translate(0px, 0px)";
        sidebarRef.current.style.display = "block";
      }
    }
  }, [pcSidebar, isPc]);

  const handleBackClick = () => {
    dispatcher(setPcSidebar(!pcSidebar));
  };

  return (
    <>
      <Backdrop
        show={showSidebar}
        onClick={() => dispatcher(setShowSidebar(false))}
      />
      <SidebarHolder ref={sidebarRef} theme={theme}>
        {isExamStarted && <SidebarHider />}
        <SidebarHeader>
          <SidebarHeaderText>
            <Flex>
              <FlameText onClick={() => navigate("/dashboard")}>
                Flame
              </FlameText>
              {isPc && (
                <IconButton margin="0" onClick={handleBackClick}>
                  <ArrowLeft color="white" size={20} />
                </IconButton>
              )}
            </Flex>
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
                onClick={() => {
                  handleItemClick(i);
                  navigate(item.route);
                }}
              />
            ))}
        </SidebarItemsHolder>
      </SidebarHolder>
    </>
  );
}
