import testSlice from "./testSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import contentIndexSlice from "./contentIndexSlice";
const rootReducer = {
  counter: testSlice,
  user: userSlice,
  theme: themeSlice,
  contentIndex: contentIndexSlice,
};
export default rootReducer;
