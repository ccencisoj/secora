import { 
  HIDDEN_NEW_COLOR_DIALOG, 
  SHOWN_NEW_COLOR_DIALOG,
  TOGGLE_NEW_COLOR_DIALOG,
  HIDDEN_COLOR_PANEL,
  SHOWN_COLOR_PANEL
} from "constants/actionTypes";

const initialState = {
  hiddenNewColorDialog: true,
  hiddenColorPanel: false
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case HIDDEN_NEW_COLOR_DIALOG:
      return {
        ...state, 
        hiddenNewColorDialog: true
      };

    case SHOWN_NEW_COLOR_DIALOG:
      return {
        ...state, 
        hiddenNewColorDialog: false
      };

    case TOGGLE_NEW_COLOR_DIALOG:
      return {
        ...state,
        hiddenNewColorDialog: state.hiddenNewColorDialog ? false : true
      };

    case HIDDEN_COLOR_PANEL: 
      return {
        ...state,
        hiddenColorPanel: true
      };

    case SHOWN_COLOR_PANEL:
      return {
        ...state,
        hiddenColorPanel: false
      };

    default:
      return state;
  }
}