import { 
  SET_SELECTED_LANGUAGE
} from 'constants/actionTypes';

const initialState = {
  selectedLanguage: null
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload.language
      };

    default:
      return state;
  }
}