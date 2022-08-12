/* eslint-disable no-useless-escape */
// dummy questions
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
