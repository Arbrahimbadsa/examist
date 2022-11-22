export default function deleteCookie(name) {
  document.cookie = `${name}=; expires=Sun, 20 Aug 2000 12:00:00 UTC`;
}
