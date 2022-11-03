export const getDate = () => {
  const monthInfo = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const today = new Date();
  const y = today.getFullYear();
  const m =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let dateString = "";
  let suff = "";
  if (d !== "11") {
    const last = d[d.length - 1];
    if (last === "1") suff = "st";
  } else {
    suff = "th";
  }
  if (d === "02") suff = "nd";
  else suff = "th";
  if (d === "03") suff = "rd";
  else suff = "th";
  dateString = `${parseInt(d)}${suff} ${monthInfo[m]}, ${y}`;
  return dateString;
};
