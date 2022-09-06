export default class QuestionModel {
  constructor(label, options, correctIndex, selectedIndex, touched, id, count) {
    this.count = count;
    this.id = id;
    this.label = label;
    this.options = options;
    this.correctIndex = correctIndex;
    this.selectedIndex = selectedIndex;
    this.touched = touched;
    this.doubleAnswered = false;
  }
  selectedCorrect() {
    return this.correctIndex === this.selectedIndex;
  }
  setSelectedIndex(index) {
    this.selectedIndex = index;
  }
  isTouched() {
    this.touched = true;
  }
  isDoubleAnswered() {
    this.doubleAnswered = true;
  }
}
