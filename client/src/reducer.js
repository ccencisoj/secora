import { combineReducers } from "redux";
import commonReducer from 'reducers/common';
import colorPanelReducer from 'reducers/colorPanel';
import colorListReducer from 'reducers/colorList';
import notificationReducer from 'reducers/notification';
import colorActionReducer from "reducers/colorAction";

export default combineReducers({
  common: commonReducer,
  colorPanel: colorPanelReducer,
  notification: notificationReducer,
  colorList: colorListReducer,
  colorAction: colorActionReducer
});