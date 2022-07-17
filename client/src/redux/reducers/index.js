import testSlice from "./testSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import contentIndexSlice from "./contentIndexSlice";
import dashboardQuestionSlice from "./dashboardQuestionSlice";
import sidebarSlice from "./sidebarSlice";
const rootReducer = {
  counter: testSlice,
  user: userSlice,
  theme: themeSlice,
  contentIndex: contentIndexSlice,
  dashboardQuestion: dashboardQuestionSlice,
  showSidebar: sidebarSlice,
};
export default rootReducer;
