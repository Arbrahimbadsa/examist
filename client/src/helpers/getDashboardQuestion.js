import { questions } from "../utils/questions";
export function getRandomQuestion() {
  const random = Math.floor(Math.random() * questions.length);
  return questions[random];
}
