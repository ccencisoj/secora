import { 
  LOAD_COLOR_LIST,
  ADD_COLOR,
  DELETE_COLOR
} from 'constants/actionTypes';

const initialState = {
  colorList: null,
  colorListLength: null
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case LOAD_COLOR_LIST: 
      return {
        ...state, 
        colorList: action.payload.colorList.map((color)=> 
        ({...color, deleted: false})),
        colorListLength: action.payload.colorList.length
      };

    case ADD_COLOR:
      return {
        ...state,
        colorList: [
          ...state.colorList, 
          {...action.payload.color, deleted: false}
        ],
        colorListLength: state.colorListLength + 1
      }

    case DELETE_COLOR:
      return {
        ...state,
        colorList: state.colorList.map((color)=>
          color.id === action.payload.colorId ? 
          {...color, deleted: true} : color),
        colorListLength: state.colorListLength - 1
      };

    default:
      return state;
  }
}