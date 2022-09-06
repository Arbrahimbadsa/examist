import styled from "styled-components";
import userImage from "../assets/user-11.jpg";
import GreyText from "./GreyText";
import {
  ChevronDown,
  Info,
  Moon,
  PieChart,
  Plus,
  Settings,
  Sun,
  Menu as Humbarger,
  Users,
} from "react-feather";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../redux/reducers/themeSlice";
import { Menu, MenuItem } from "./Menu";
import { logout } from "../redux/reducers/userSlice";
import Logo from "./Logo";
import { setShowSidebar } from "../redux/reducers/sidebarSlice";
import IconButton from "./IconButton";
import { Dialog, DialogBody } from "./Dialog";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setQuestions } from "../redux/reducers/examSlice";
import { genQuestion } from "../utils/questions";
const HeaderTopHolder = styled.div`
  background: #fff;
  display: flex;
  user-select: none;
  min-height: 55px;
  padding: 0 25px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  font-family: "Poppins", sans-serif;
  position: relative;
  @media only screen and (max-width: 600px) {
    padding: 0;
    padding-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
const HeaderHider = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999999;
`;
const HeaderTopLeft = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
const HeaderTopRight = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Avatar = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: 15px;
`;
const MetaHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const UserName = styled.span`
  font-size: 14.5px;
`;
const RankText = styled.span`
  font-size: 10px;
`;
const ChevronHolder = styled.div`
  margin: 0 0 0 10px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const HeaderUserInfoHolder = styled.div`
  display: flex;
  align-items: center;
  ${(props) => (props.clickable ? `cursor: pointer;` : null)}
  &:hover {
    ${(props) => (props.clickable ? `opacity: 0.5;` : null)}
  }
`;
const CategoryHolder = styled.div`
  color: ${(props) => (props.active ? "#13b2ec" : "")};
  font-size: ${(props) => (props.active ? "" : "15px")};
  transition: 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  ${(props) =>
    !props.active &&
    `cursor: pointer;
  &:hover {
    opacity: 0.5;
  }`}
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const CategoryLabel = styled.p`
  margin: 0 10px;
  display: flex;
  align-items: center;
`;
const HeaderOnPhoneHolder = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    align-items: center;
  }
`;
const MetaHolderOnPhone = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const TitleOnPhone = styled.p`
  font-size: 20px;
`;
const IconHolder = styled.div`
  ${(props) => (props.clickable ? `cursor: pointer;` : ``)}
  display: flex;
`;

const Category = ({ label, icon, active, onClick }) => {
  return (
    <CategoryHolder onClick={onClick} active={active}>
      <IconButton margin="0">{icon}</IconButton>
      <CategoryLabel>{label}</CategoryLabel>
    </CategoryHolder>
  );
};

const Switcher = () => {
  const mode = useSelector((state) => state.theme.value);
  const isExamStarted = useSelector((state) => state.isExamStarted.value);
  const dispatcher = useDispatch();
  return (
    <IconButton onClick={() => !isExamStarted && dispatcher(switchTheme())}>
      {mode === "light" && <Moon size={20} />}
      {mode === "dark" && <Sun size={20} />}
    </IconButton>
  );
};

export default function HeaderTop() {
  const dispatcher = useDispatch();
  const isExamStarted = useSelector((state) => state.isExamStarted.value);
  const [categories] = useState([
    {
      label: "New",
      icon: <Plus size={15} />,
    },
    {
      label: "Leaderboard",
      icon: <Users size={15} />,
    },
    {
      label: "Analytics",
      icon: <PieChart size={15} />,
    },
    {
      label: "Settings",
      icon: <Settings size={15} />,
    },
    {
      label: "Info",
      icon: <Info size={15} />,
    },
  ]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [userMenu, setUserMenu] = useState(false);
  const [newExam, setNewExam] = useState(false);
  const handleNewExam = () => !isExamStarted && setNewExam(!newExam);
  return (
    <>
      {/* Category dialogues */}
      {activeCategory === 0 && (
        <Dialog show={newExam} title="Start a new exam" onClose={handleNewExam}>
          <DialogBody>
            <button
              onClick={() => {
                dispatcher(setContentIndex(50));
                setNewExam(false);
                dispatcher(disableContent(true));
                dispatcher(setQuestions(genQuestion(10)));
              }}
            >
              Start a quick exam
            </button>
          </DialogBody>
        </Dialog>
      )}
      {/* ------------------- */}
      <HeaderTopHolder>
        {isExamStarted && <HeaderHider />}
        <HeaderTopLeft>
          <HeaderOnPhoneHolder>
            <MetaHolderOnPhone>
              <IconHolder
                clickable={!isExamStarted}
                onClick={() =>
                  !isExamStarted && dispatcher(setShowSidebar(true))
                }
              >
                <Humbarger size={25} />
              </IconHolder>
              <Logo dim={35} phone />
              <TitleOnPhone>Flame</TitleOnPhone>
            </MetaHolderOnPhone>
          </HeaderOnPhoneHolder>
          {categories &&
            categories.map((category, i) => (
              <Category
                key={i}
                active={i === activeCategory}
                icon={category.icon}
                label={category.label}
                onClick={() => {
                  if (!isExamStarted) {
                    setActiveCategory(i);
                    if (i === 0) setNewExam(!newExam);
                  }
                }}
              />
            ))}
        </HeaderTopLeft>
        <HeaderTopRight>
          <IconButton onClick={handleNewExam} margin="0">
            <Plus color="black" size={20} />
          </IconButton>
          <Switcher />
          <HeaderUserInfoHolder
            clickable={!isExamStarted}
            onClick={() => !isExamStarted && setUserMenu(true)}
          >
            <Avatar alt="user" src={userImage} />
            <MetaHolder>
              <UserName>Arb Rahim Badsa</UserName>
              <RankText>
                <GreyText>Rank: 320</GreyText>
              </RankText>
            </MetaHolder>
            <ChevronHolder>
              <ChevronDown size={20} />
            </ChevronHolder>
          </HeaderUserInfoHolder>
          <Menu
            top={58}
            width={200}
            show={userMenu}
            onClose={() => setUserMenu(false)}
          >
            <MenuItem>Points</MenuItem>
            <MenuItem>Upgrade</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem
              onItemClick={() => {
                setUserMenu(false);
                dispatcher(logout());
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </HeaderTopRight>
      </HeaderTopHolder>
    </>
  );
}
