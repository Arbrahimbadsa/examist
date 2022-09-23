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
    String.raw`Calculate the value of -  $**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$ and this would render and if $*x = 5*$ then find the value of this. $**(x+y) / 3 = 5**$`,
    [
      String.raw`$**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$`,
      "This is a very long answer that I can never write.",
      30,
      String.raw`$**\int ^{\infty }_{0}\dfrac{xdx}{1+x^{4}}**$`,
    ],
    4,
    null,
    false,
    "this-is-some-id",
    1
  ),
  new QuestionModel(
    "What is the value of 5 + 3?",
    [10, 25, 30, 8],
    4,
    null,
    false,
    "this-is-some-id1",
    2
  ),
  new QuestionModel(
    "What is the value of 3 + 8?",
    [10, 25, 11, 6],
    3,
    null,
    false,
    "this-is-some-id2",
    3
  ),
  new QuestionModel(
    "What is the value of 3 + 7?",
    [10, 25, 30, 6],
    1,
    null,
    false,
    "this-is-some-id3",
    4
  ),
];

export const genQuestion = (count) => {
  const set_threee = [];
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const options = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      num1 + num2,
      Math.floor(Math.random() * 100),
    ];
    const question = new QuestionModel(
      i + 1,
      `some-id-${i}`,
      `What is the value of ${num1} + ${num2} ?`,
      options
    );
    set_threee.push(question);
  }
  return set_threee;
};
