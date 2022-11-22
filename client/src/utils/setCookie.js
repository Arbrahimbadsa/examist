export default function setCookie(name, obj, t) {
  // time must be provided in hours (t)
  if (!t) t = 2; // default time is 2 hours.
  const time = new Date();
  time.setSeconds(time.getSeconds() + t * 60 * 60);
  const tString = time.toUTCString();
  const str = JSON.stringify(obj);
  document.cookie = `${name}=${str}; Expires=${tString} Secure`;
}
