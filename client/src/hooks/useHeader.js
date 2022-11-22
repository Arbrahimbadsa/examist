import useUser from "./useUser";

export default function useHeader() {
  const user = useUser();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };
  return { headers };
}
