export default class QuestionModel {
  constructor(id, count, label, options, correctAnswer) {
    this.id = id;
    this.count = count;
    this.label = label;
    this.options = options;
    this.selectedIndex = [];
    this.touched = false;
    this.doubleAnswered = false;
    this.correctAnswer = correctAnswer;
  }
  getIsCorrectlyAnswered() {
    if (this.doubleAnswered) return false;
    const firstAnswer = this.selectedIndex[0];
    if (firstAnswer === this.correctAnswer) return true;
    else {
      if (this.selectedIndex.length === 0) return null;
      else return false;
    }
  }
  setSelectedIndex(index) {
    this.selectedIndex.push(index);
  }
  isTouched() {
    this.touched = true;
  }
  isDoubleAnswered() {
    this.doubleAnswered = true;
  }
  isIncorrect(correctIndex, j) {
    const optionSelected = this.selectedIndex.indexOf(j) > -1;
    if (optionSelected) {
      return correctIndex !== j;
    } else return false;
  }
  isCorrect(correctIndex, j) {
    const optionSelected = this.selectedIndex.indexOf(j) > -1;
    if (optionSelected) {
      return correctIndex === j;
    } else return false;
  }
}
