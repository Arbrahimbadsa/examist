export default function formatLocalTime(timeString) {
  // "12:56:54 PM"
  const arr = timeString.split(" ");
  const timeArr = arr[0].split(":");
  timeArr.pop();
  const time = timeArr.join(":") + " " + arr[1];
  return time;
}
