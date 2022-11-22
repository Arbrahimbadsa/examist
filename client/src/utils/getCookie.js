export default function getCookie(name) {
  const arr = document.cookie.split("; ");
  const key = `${name}=`;
  let val = arr.find((item) => item.indexOf(key) > -1);
  let cookie = null;
  if (val) {
    val = val.split(key)[1];
    cookie = val;
  }
  return JSON.parse(cookie);
}
