import { useSelector } from "react-redux";
import theme from "../utils/theme";
export default function useTheme() {
  const currentThemeMode = useSelector((state) => state.theme.value);
  const themeData = theme[currentThemeMode];
  return themeData;
}
