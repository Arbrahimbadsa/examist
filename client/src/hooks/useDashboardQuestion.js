import { useSelector } from "react-redux";

export default function useDashboardQuestion() {
  const { label, options, correctIndex, selectedIndex, touched } = useSelector(
    (state) => state.dashboardQuestion.value
  );
  return { label, options, correctIndex, selectedIndex, touched };
}
