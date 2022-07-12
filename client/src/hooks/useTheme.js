import { useSelector } from "react-redux";
import theme from "../utils/theme";
export default function useTheme(id) {
  const currentThemeMode = useSelector((state) => state.theme.value);
  const themeData = theme[currentThemeMode];
  if (id) return themeData[id];
  return themeData;
}
