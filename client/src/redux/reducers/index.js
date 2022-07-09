import testSlice from "./testSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
const rootReducer = {
  counter: testSlice,
  user: userSlice,
  theme: themeSlice,
};
export default rootReducer;
