/* eslint-disable no-useless-escape */
// dummy questions
import QuestionModel from "./classes/QuestionModel";
export const questions = [
  {
    label: "Who is your favorite player?",
    options: ["Shakib", "Mushfiq", "Mashrafi", "Mustafizur"],
    correctIndex: 2,
    selectedIndex: null,
    touched: false,
  },
  {
    label: "What is 5 + 5?",
    options: [100, 200, 500, 10],
    correctIndex: 3,
    selectedIndex: null,
    touched: false,
  },
  {
    label: "Which one is a colour?",
    options: ["Arb", "Ador", "Tushar", "Blue"],
    correctIndex: 3,
    selectedIndex: null,
    touched: false,
  },
  {
    label: "When did you last eat?",
    options: ["at Morning", "at Night", "at Afternoon", "None of them"],
    correctIndex: 3,
    selectedIndex: null,
    touched: false,
  },
  {
    label: String.raw`Find out the value of $*Cool*$? and this would not render in latex?`,
    options: [0, 5, 24, "None"],
    correctIndex: 3,
    selectedIndex: null,
    touched: false,
  },
  {
    label: String.raw`Calculate the value of -  $**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$ and this would render and if $*x = 5*$ then find the value of this. $**(x+y) / 3 = 5**$`,
    options: [0, 5, 24, "None"],
    correctIndex: 3,
    selectedIndex: null,
    touched: false,
  },
];

export const set_two = [
  new QuestionModel(
    1,
    "question-id-1",
    String.raw`Calculate the value of -  $**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$ and this would render and if $*x = 5*$ then find the value of this. $**(x+y) / 3 = 5**$`,
    [
      String.raw`$**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$`,
      "This is a very long answer that I can never write.",
      30,
      String.raw`$**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$`,
    ],
    1
  ),
  new QuestionModel(
    2,
    "id-2",
    String.raw`If $*x^{2}-25=0*$ then find the value of $*x*$`,
    [
      String.raw`$*+5, -5*$`,
      String.raw`$*0*$`,
      String.raw`$*6, -3*$`,
      String.raw`$*+2*$`,
    ],
    1
  ),
];

export const genQuestion = (count) => {
  const set_threee = [];
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const ops = [];
    const random = Math.floor(Math.random() * 4);
    for (let j = 0; j < 4; j++) {
      const o = `$*${Math.floor(Math.random() * 100)}*$`;
      const r = `$*${num1 + num2}*$`;
      if (j === random) {
        ops[j] = r;
      } else {
        ops[j] = o;
      }
    }
    console.log(ops);
    const question = new QuestionModel(
      i + 1,
      `some-id-${i}`,
      `What is the value of $*${num1} + ${num2}*$ ?`,
      ops,
      random + 1
    );
    set_threee.push(question);
  }
  return set_threee;
};
