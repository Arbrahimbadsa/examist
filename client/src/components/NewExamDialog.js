import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setIsGeneratingQuestion } from "../redux/reducers/loadingSlice";
import { Dialog, DialogBody } from "./Dialog";
import { genQuestion, set_two } from "../utils/questions";
import {
  clearNewExamInputs,
  setChapters,
  setExamId,
  setExamTime,
  setIsNegAllowed,
  setQuestions,
  setSubjects,
  setTotalQuestions,
} from "../redux/reducers/examSlice";
import Input from "./Input";
import Select from "./Select";
import CheckBox from "./CheckBox";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GreyText from "./GreyText";
import { Info } from "react-feather";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const InputHolder = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;

export default function NewExamDialog({ show, onClose, setNewExam }) {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  // inputs
  // const examId = useSelector((state) => state.exam.examId);
  // const totalQuestions = useSelector((state) => state.exam.totalQuestions);
  // const isNegAllowed = useSelector((state) => state.exam.isNegAllowed);
  // const examTime = useSelector((state) => state.exam.examTime);
  // const subjects = useSelector((state) => state.exam.subjects);
  // const chapters = useSelector((state) => state.exam.chapters);
  const [totalQuestions, _setTotalQuestions] = useState("");
  const [isNegAllowed, _setIsNegAllowed] = useState(false);
  const [examTime, _setExamTime] = useState("");
  const [subjects, _setSubjects] = useState([]);
  const [chapters, _setChapters] = useState([]);

  const clearInputs = () => {
    _setTotalQuestions("");
    _setIsNegAllowed(false);
    _setExamTime("");
    _setSubjects([]);
    _setChapters([]);
  };

  const handleStartQuickExam = async () => {
    dispatcher(setContentIndex(50));
    setNewExam(false);
    dispatcher(disableContent(true));
    dispatcher(setIsGeneratingQuestion(true));
    //const { data } = await axios.get(
    //"https://6318e3896b4c78d91b31ae8b.mockapi.io/api/v1/questions"
    //);
    //const qs = data.map(
    //(d) => new QuestionModel(d.id, null, d.label, d.options, d.correctAnswer)
    //);
    // fetch the question
    const s = set_two; // generate "totalQuestions" number of questions

    // set the exam inputs
    const examId = uuidv4();
    dispatcher(setExamId(examId));
    dispatcher(setTotalQuestions(15));
    dispatcher(setExamTime(1));
    dispatcher(setIsNegAllowed(true));
    dispatcher(setQuestions(s));
    navigate("quick-exams/" + examId); // show fake route

    dispatcher(setIsGeneratingQuestion(false)); // hide loader
    clearInputs(); // clear all inputs after the exam is created
  };
  const handleStartExam = (e) => {
    e.preventDefault();
    dispatcher(setContentIndex(50)); // go to exam page
    setNewExam(false); // hide the new exam dialog
    dispatcher(disableContent(true)); // disable sidebar and header when a new exam's started
    dispatcher(setIsGeneratingQuestion(true)); // show the generating exam loader

    // fetch the question
    const s = genQuestion(+totalQuestions); // generate "totalQuestions" number of questions

    // set the exam inputs
    const examId = uuidv4();
    dispatcher(setExamId(examId));
    dispatcher(setTotalQuestions(totalQuestions));
    dispatcher(setExamTime(examTime));
    dispatcher(setIsNegAllowed(isNegAllowed));
    dispatcher(setSubjects(subjects));
    dispatcher(setChapters(chapters));
    dispatcher(setQuestions(s));
    navigate("quick-exams/" + examId); // show fake route

    dispatcher(setIsGeneratingQuestion(false)); // hide loader
    clearInputs(); // clear all inputs after the exam is created
  };
  const onDialogClose = () => {
    onClose();
    clearInputs();
  };
  return (
    <Dialog show={show} title="Start a new exam" onClose={onDialogClose}>
      <form onSubmit={handleStartExam}>
        <DialogBody padding="20px 50px" center={true}>
          <InputHolder>
            <Select
              label="Subjects"
              margin="10px 15px"
              selected={subjects}
              multipleChoice
              onChange={(sub) => _setSubjects(sub)}
              options={[
                "Math 1st Paper",
                "Math 2nd Paper",
                "Physics 1st Paper",
                "Physics 2nd Paper",
                "Chemistry 1st Paper",
                "Chemistry 2nd Paper",
              ]}
            />
            <Select
              options={[
                "Work, Power and Energy",
                "Integration",
                "Combination",
                "Probability",
              ]}
              selected={chapters}
              multipleChoice
              onChange={(chap) => _setChapters(chap)}
              label="Chapters"
              margin="10px 15px"
            />
          </InputHolder>
          <InputHolder>
            <Input
              type="number"
              margin="10px 15px"
              label="Total questions"
              max="100"
              required
              placeholder="15"
              value={totalQuestions}
              onChange={(e) => _setTotalQuestions(e.target.value)}
            />
            <Input
              type="number"
              max="60"
              margin="10px 15px"
              label="Time"
              required
              placeholder="15 min"
              value={examTime}
              onChange={(e) => _setExamTime(e.target.value)}
            />
          </InputHolder>
          <InputHolder>
            <CheckBox
              checked={isNegAllowed}
              onClick={() => _setIsNegAllowed(!isNegAllowed)}
              label="Allow negative markings (0.25)"
            />
          </InputHolder>
          <Button type="submit" style={{ marginTop: "20px" }}>
            Start Exam
          </Button>
          <Flex>
            <GreyText onClick={handleStartQuickExam}>
              Start a quick exam.
            </GreyText>
            <Info style={{ marginLeft: "5px" }} size="15" color="grey" />
          </Flex>
        </DialogBody>
      </form>
    </Dialog>
  );
}
