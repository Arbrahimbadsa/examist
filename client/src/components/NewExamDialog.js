import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setContentIndex } from "../redux/reducers/contentIndexSlice";
import { disableContent } from "../redux/reducers/disableContentSlice";
import { setIsGeneratingQuestion } from "../redux/reducers/loadingSlice";
import { Dialog, DialogBody } from "./Dialog";
import { genQuestion } from "../utils/questions";
import { setQuestions } from "../redux/reducers/examSlice";
import Input from "./Input";
import Select from "./Select";
import CheckBox from "./CheckBox";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GreyText from "./GreyText";
import { Info } from "react-feather";

const StartQuickExamButton = styled.button`
  border: none;
  background: #13b2ec;
  color: #fff;
  height: 40px;
  width: 300px;
  border-radius: 5px;
  cursor: pointer;
  margin: 16px 0;
  @media only screen and (max-width: 600px) {
    cursor: default;
  }
`;
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
  const examId = useSelector((state) => state.exam.examId);
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
    const s = genQuestion(50);
    dispatcher(setQuestions(s));
    dispatcher(setIsGeneratingQuestion(false));
    navigate("quick-exams/" + examId);
  };
  return (
    <Dialog show={show} title="Start a new exam" onClose={onClose}>
      <DialogBody padding="20px 50px" center={true}>
        <InputHolder>
          <Input
            type="number"
            margin="10px 15px"
            label="Total questions"
            placeholder="15"
          />
          <Input
            type="number"
            max="60"
            margin="10px 15px"
            label="Time"
            placeholder="15 min"
          />
        </InputHolder>
        <InputHolder>
          <Select
            label="Subjects"
            margin="10px 15px"
            options={[
              "Bangla",
              "English",
              "Math",
              "Science",
              "Physics",
              "Chemistry",
            ]}
          />
          <Select label="Chapters" margin="10px 15px" />
        </InputHolder>
        <InputHolder>
          <CheckBox label="Allow negative markings (0.25)" />
        </InputHolder>
        <Button style={{ marginTop: "20px" }}>Start Exam</Button>
        <Flex>
          <GreyText onClick={handleStartQuickExam}>
            Start a quick exam.
          </GreyText>
          <Info style={{ marginLeft: "5px" }} size="15" color="grey" />
        </Flex>
      </DialogBody>
    </Dialog>
  );
}
