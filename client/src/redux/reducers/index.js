import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import contentIndexSlice from "./contentIndexSlice";
import dashboardQuestionSlice from "./dashboardQuestionSlice";
import sidebarSlice from "./sidebarSlice";
import disableContentSlice from "./disableContentSlice";
import examSlice from "./examSlice";
import positionSlice from "./positionSlice";
import loadingSlice from "./loadingSlice";
import pastExamSlice from "./pastExamSlice";
import examCountSlice from "./examCountSlice";
import socketSlice from "./socketSlice";
import toastSlice from "./toastSlice";
import liveChallengeSlice from "./liveChallengeSlice";
import notificationSlice from "./notificationSlice";
const rootReducer = {
  user: userSlice,
  theme: themeSlice,
  contentIndex: contentIndexSlice,
  dashboardQuestion: dashboardQuestionSlice,
  showSidebar: sidebarSlice,
  isExamStarted: disableContentSlice,
  exam: examSlice,
  position: positionSlice,
  loading: loadingSlice,
  pastExams: pastExamSlice,
  examCount: examCountSlice,
  socket: socketSlice,
  toast: toastSlice,
  liveChallenge: liveChallengeSlice,
  notification: notificationSlice,
};
export default rootReducer;
