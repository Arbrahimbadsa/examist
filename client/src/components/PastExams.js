import styled from "styled-components";
import {
  Clock,
  Trash,
  Edit2,
  List,
  MoreVertical,
  Check,
  Slash,
  X,
} from "react-feather";
import { Card, CardContent, CardHeader } from "./Card";
import IconButton from "./IconButton";
import { Menu, MenuItem } from "./Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
const PastExamsHolder = styled.div`
  font-family: "Poppins", sans-serif;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 20px;
  @media only screen and (max-width: 600px) {
    padding-bottom: 100px;
  }
`;
const PageTitle = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;
const PageIconHolder = styled.div`
  margin-right: 5px;
`;
const ExamsCardHolder = styled.div`
  height: auto;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  @media only screen and (max-width: 600px) {
    align-items: center;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TitleChip = styled.div`
  height: 20px;
  padding: 0 15px;
  background: ${(props) => props.color};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: normal;
  font-size: 12px;
  align-items: center;
  margin-left: 10px;
`;
const CardSubtitle = styled.div`
  font-size: 13.5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CardSubtitleText = styled.p`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  margin-top: 5px;
`;
const SubContent = styled.div`
  margin-bottom: 20px;
`;
const ExamInfoHolder = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
const ExamInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  border-right: 1px solid grey;
  padding: 0 10px;
  &:last-child {
    border: none;
  }
  font-size: 15px;
`;
const Button = styled.div`
  text-transform: uppercase;
  width: auto;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  color: #187fe7;
  padding: 2px 10px;
  margin-right: 10px;
  border-radius: 4px;
  &:hover {
    background: rgba(0, 0, 255, 0.1);
  }
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
const CardButtons = styled.div`
  position: relative;
  left: -10px;
`;
const ChipsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Chip = styled.div`
  display: inline-block;
  background: rgba(0, 0, 255, 0.1);
  padding: 2px 10px;
  color: #187fe7;
  font-size: 12px;
  margin: 0 10px 10px 0;
  border-radius: 4px;
`;
const PastExamCard = ({ exam }) => {
  const [actionsMenu, setActionsMenu] = useState(false);
  return (
    <Card
      style={{
        minHeight: "200px",
        height: "auto",
        position: "relative",
        marginBottom: "20px",
        minWidth: "350px",
      }}
      extraCss={`
        @media only screen and (max-width: 600px) {
          width: 100%;
          background: "red";
          min-width: 0;
        }
      `}
      key={exam.id}
    >
      <CardHeader
        style={{
          borderBottom: "1px solid #dae0e6",
          paddingBottom: "5px",
        }}
        title={
          <Flex>
            <span>{exam.name}</span>
            <TitleChip color={exam.isCompleted ? "#26d95f" : "#FF0400"}>
              {exam.isCompleted ? exam.marks.secured : "Incompleted"}
            </TitleChip>
          </Flex>
        }
        actions={
          <>
            <IconButton onClick={() => setActionsMenu(true)} margin="0">
              <MoreVertical size={20} />
            </IconButton>
            <Menu
              top={50}
              show={actionsMenu}
              onClose={() => setActionsMenu(false)}
            >
              <MenuItem>
                <Flex>
                  <Edit2 style={{ marginRight: "5px" }} size={15} />
                  Retake
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex>
                  <Trash style={{ marginRight: "5px" }} size={15} />
                  Delete
                </Flex>
              </MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent style={{ padding: "10px 10px 0 10px" }}>
        {exam.isCompleted && (
          <ExamInfoHolder>
            <ExamInfo>
              <Check color="#26D95F" style={{ marginRight: "8px" }} size={20} />
              <p style={{ color: "#26D95F" }}>{exam.marks.correct}</p>
            </ExamInfo>
            <ExamInfo>
              <X color="red" style={{ marginRight: "8px" }} size={20} />
              <p style={{ color: "red" }}>{exam.marks.incorrect}</p>
            </ExamInfo>
            <ExamInfo>
              <Slash style={{ marginRight: "8px" }} size={16} />
              <p>{exam.marks.skipped}</p>
            </ExamInfo>
          </ExamInfoHolder>
        )}
        <SubContent>
          <CardSubtitle>
            <Clock style={{ marginRight: "5px" }} size={15} />
            Date & Time
          </CardSubtitle>
          <CardSubtitleText>
            On <b>{exam.time.on}</b> from <b>{exam.time.from}</b> to{" "}
            <b>{exam.time.to}</b>
          </CardSubtitleText>
        </SubContent>
        <SubContent>
          <CardSubtitle>
            <Clock style={{ marginRight: "5px" }} size={15} />
            Duration
          </CardSubtitle>
          <CardSubtitleText>{exam.time.is}</CardSubtitleText>
        </SubContent>
        <SubContent>
          <CardSubtitle>
            <List style={{ marginRight: "5px" }} size={15} />
            Questions
          </CardSubtitle>
          <CardSubtitleText>{exam.questionsCount}</CardSubtitleText>
        </SubContent>
        <SubContent style={{ marginBottom: "10px" }}>
          <ChipsHolder>
            {exam.subjects &&
              exam.subjects.map((sub, i) => <Chip key={i}># {sub}</Chip>)}
          </ChipsHolder>
        </SubContent>
        <CardButtons>
          {exam.isCompleted && <Button>Result</Button>}
          <Button>View Question</Button>
        </CardButtons>
      </CardContent>
    </Card>
  );
};
export default function PastExams() {
  const pastExams = useSelector((state) => state.pastExams.value);
  const totalPastExams = pastExams.length;
  return (
    <PastExamsHolder>
      <PageTitle>
        <PageIconHolder>
          <Edit2 size={15} />
        </PageIconHolder>
        <h3>Past Exams ({totalPastExams})</h3>
      </PageTitle>
      <ExamsCardHolder>
        {pastExams &&
          pastExams.map((exam, i) => <PastExamCard key={i} exam={exam} />)}
      </ExamsCardHolder>
    </PastExamsHolder>
  );
}
