import { useSelector } from "react-redux";
export default function useContentIndex() {
  const index = useSelector((state) => state.contentIndex.value);
  return index;
}
