export default function formatLocalTime(timeString) {
  // "12:56:54 PM"
  //alert(timeString);
  const arr = timeString.split(" ");
  const timeArr = arr[0].split(":");
  timeArr.pop();
  if (arr[1]) {
    const time = timeArr.join(":") + " " + arr[1];
    return time;
  } else {
    const ampm = timeArr[0] > 12 ? "PM" : "AM";
    const hr = timeArr[0] % 12;
    const min = timeArr[1];
    return `${hr}:${min} ${ampm}`;
  }
}
