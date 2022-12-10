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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import {
  setAnswerSheet,
  setExamId,
  setExamTime,
  setIsCompleted,
  setIsLiveChallenge,
  setMarks,
  setName,
  setOnlyResult,
  setQuestions,
  setRetake,
  setShowExamPage,
  setTotalQuestions,
} from "../redux/reducers/examSlice";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { removePastExam, setPastExams } from "../redux/reducers/pastExamSlice";
import {
  setCustomExamCountD,
  setExamPrefix,
  setQuickExamCountD,
} from "../redux/reducers/examCountSlice";
import axios from "../api/axios";
import useHeader from "../hooks/useHeader";
import useUser from "../hooks/useUser";
import convertToQM from "../utils/convertToQM";
import PageTitle from "./PageTitle";
import { showToast } from "../redux/reducers/toastSlice";
import useTheme from "../hooks/useTheme";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PastExamsHolder = styled.div`
  font-family: "Poppins", sans-serif;
  overflow-y: scroll;
  padding-bottom: 20px;
  @media only screen and (max-width: 600px) {
    padding-bottom: 100px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const ExamsCardHolder = styled.div`
  height: auto;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  color: grey;
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
  padding: 2px 10px;
  margin-right: 10px;
  border-radius: 4px;
  color: ${(props) => (props.disabled ? "grey" : "#187fe7")};
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
const Info = styled.p`
  font-size: 14px;
  color: grey;
`;

const PastExamCard = ({ exam }) => {
  const [actionsMenu, setActionsMenu] = useState(false);

  const dispatcher = useDispatch();
  const { headers } = useHeader();
  const user = useUser();
  const theme = useTheme();

  const handleViewResult = () => {
    dispatcher(setContentIndex(50));
    dispatcher(setShowExamPage(false));
    dispatcher(setOnlyResult(true));
    dispatcher(setAnswerSheet(exam.answerSheet));
    dispatcher(disableContent(false));
    dispatcher(setMarks(exam.marks));
    dispatcher(setName(exam.name));
    dispatcher(setQuestions(exam.questions));
    dispatcher(setIsLiveChallenge(exam.isLiveChallenge));
  };

  // retake past exam
  const handleRetake = () => {
    dispatcher(setContentIndex(50));
    dispatcher(setExamId(exam._id));
    dispatcher(setExamTime(parseInt(exam.time.is)));
    dispatcher(setQuestions(exam.questions));
    dispatcher(setIsCompleted(exam.isCompleted));
    const prefix = exam.prefix.replace("-", "");
    dispatcher(setExamPrefix(prefix));
    dispatcher(setName(exam.name));
    dispatcher(setTotalQuestions(exam.questionsCount));
    dispatcher(setRetake("retake"));
    // if any of the questions are touched, simply make them touchable again.
  };

  // delete past exam
  const handleDelete = async () => {
    await axios.post(
      `/api/past-exam/delete`,
      {
        id: exam._id,
        user: user?.id,
      },
      { headers }
    );
    dispatcher(removePastExam(exam._id));
    if (exam.prefix === "Quick Exam") {
      dispatcher(setQuickExamCountD());
    } else {
      dispatcher(setCustomExamCountD());
    }
  };

  return (
    <Card
      style={{
        minHeight: "345px",
        height: "auto",
        position: "relative",
        marginBottom: "20px",
        marginRight: "20px",
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
              <MenuItem
                onItemClick={() => {
                  handleRetake();
                  setActionsMenu(false);
                }}
              >
                <Flex style={{ color: "black" }}>
                  <Edit2 style={{ marginRight: "5px" }} size={15} />
                  Retake
                </Flex>
              </MenuItem>
              <MenuItem
                onItemClick={() => {
                  handleDelete();
                  setActionsMenu(false);
                }}
              >
                <Flex style={{ color: "black" }}>
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
          <CardSubtitle style={{ color: theme.textColor }}>
            <Clock style={{ marginRight: "5px" }} size={15} />
            Date & Time
          </CardSubtitle>
          <CardSubtitleText style={{ color: "grey" }}>
            On <b>{exam.time.on}</b> from <b>{exam.time.from}</b> to{" "}
            <b>{exam.time.to}</b>
          </CardSubtitleText>
        </SubContent>
        <SubContent>
          <CardSubtitle style={{ color: theme.textColor }}>
            <Clock style={{ marginRight: "5px" }} size={15} />
            Duration
          </CardSubtitle>
          <CardSubtitleText style={{ color: "grey" }}>
            {exam.time.is}
          </CardSubtitleText>
        </SubContent>
        <SubContent>
          <CardSubtitle style={{ color: theme.textColor }}>
            <List style={{ marginRight: "5px" }} size={15} />
            Questions
          </CardSubtitle>
          <CardSubtitleText style={{ color: "grey" }}>
            {exam.questionsCount}
          </CardSubtitleText>
        </SubContent>
        <SubContent style={{ marginBottom: "10px" }}>
          <ChipsHolder>
            {exam.subjects &&
              exam.subjects.map((sub, i) => <Chip key={i}># {sub}</Chip>)}
          </ChipsHolder>
        </SubContent>
        <CardButtons>
          {exam.isCompleted && (
            <Button onClick={handleViewResult}>Result</Button>
          )}
        </CardButtons>
      </CardContent>
    </Card>
  );
};
export default function PastExams() {
  const pastExams = useSelector((state) => state.pastExams.value);
  const totalPastExams = pastExams.length;
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const dispatcher = useDispatch();

  // hooks
  const { headers } = useHeader();

  // fetch past exams
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      //dispatcher(setPastExams([]));
      const { data } = await axios.post(
        `/api/past-exam/all`,
        { id: user?.id },
        {
          headers,
        }
      );
      const newDataArr = [];
      data?.forEach((_data) => {
        const sheet = convertToQM(_data?.answerSheet, "full");
        const qs = convertToQM(_data?.questions, "half");
        _data.answerSheet = sheet;
        _data.questions = qs;
        newDataArr.push(_data);
      });
      setTimeout(() => {
        dispatcher(setPastExams(data));
        setIsLoading(false);
      }, 500);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAll = async () => {
    await axios.post(
      `/api/past-exam/deleteAll`,
      { id: user?.id },
      {
        headers,
      }
    );
    dispatcher(showToast("Past exam cleared."));
    dispatcher(setPastExams([]));
  };

  return (
    <PastExamsHolder>
      <PageTitle
        icon={<Edit2 color={theme.iconColor} size={15} />}
        title={`Past Exmas (${isLoading ? "..." : totalPastExams})`}
        actions={
          <>
            <Button
              disabled={isLoading || pastExams?.length === 0}
              onClick={handleDeleteAll}
            >
              Delete All
            </Button>
          </>
        }
      />
      {pastExams && pastExams.length !== 0 && !isLoading && (
        <ExamsCardHolder>
          {pastExams &&
            pastExams.map((exam, i) => <PastExamCard key={i} exam={exam} />)}
        </ExamsCardHolder>
      )}
      {isLoading && (
        <ExamsCardHolder style={{ gap: "30px" }}>
          {pastExams.map((exam, i) => (
            <Skeleton height="345px" width="350px" />
          ))}
        </ExamsCardHolder>
      )}
      {!isLoading && pastExams && pastExams.length === 0 && (
        <Info>Take an exam. Past exams are to be shown here.</Info>
      )}
    </PastExamsHolder>
  );
}
