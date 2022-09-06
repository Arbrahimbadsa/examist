import testSlice from "./testSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import contentIndexSlice from "./contentIndexSlice";
import dashboardQuestionSlice from "./dashboardQuestionSlice";
import sidebarSlice from "./sidebarSlice";
import disableContentSlice from "./disableContentSlice";
import examSlice from "./examSlice";
import positionSlice from "./positionSlice";
const rootReducer = {
  counter: testSlice,
  user: userSlice,
  theme: themeSlice,
  contentIndex: contentIndexSlice,
  dashboardQuestion: dashboardQuestionSlice,
  showSidebar: sidebarSlice,
  isExamStarted: disableContentSlice,
  exam: examSlice,
  position: positionSlice,
};
export default rootReducer;
