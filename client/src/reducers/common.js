import {
  SET_COLOR_NAME,
  SET_COLOR_RANGE,
  SHOW_PAGE_ANIMATION,
  HIDE_PAGE_ANIMATION
} from 'constants/actionTypes';

const initialState = {
  colorRange: null,
  colorName: null,
  hiddenPageAnimation: true
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case SET_COLOR_RANGE:
      return {
        ...state,
        colorRange: action.payload.colorRange
      };
      
    case SET_COLOR_NAME:
      return {
        ...state,
        colorName: action.payload.colorName
      };

    case SHOW_PAGE_ANIMATION:
      return {
        ...state,
        hiddenPageAnimation: false
      };

    case HIDE_PAGE_ANIMATION:
      return {
        ...state,
        hiddenPageAnimation: true
      };

    default:
      return state;
  }
}