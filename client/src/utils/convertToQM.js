import QuestionModel from "./classes/QuestionModel";
export default function convertToQM(arr, type) {
  const newArr = [];
  if (arr) {
    arr.forEach((item) => {
      if (type === "full") {
        const model = new QuestionModel(
          item.id,
          item.count,
          item.label,
          item.options,
          item.correctAnswer
        );
        model.selectedIndex = item.selectedIndex;
        model.touched = item.touched;
        newArr.push(model);
      } else {
        const model = new QuestionModel(
          item.id,
          item.count,
          item.label,
          item.options,
          item.correctAnswer
        );
        newArr.push(model);
      }
    });
  }
  return newArr;
}
