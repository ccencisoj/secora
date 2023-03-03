import { nanoid } from 'nanoid';
import { 
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  ADD_COLOR_NOTIFICATION 
} from 'constants/actionTypes';

const initialState = {
  notificationsND: [],
  notifications: [],
  colorNotifications: []
};

export default (state=initialState, action)=> {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const notification = {
        ...action.payload.notification, 
        id: nanoid(), deleted: false,
      };
      return {
        ...state,
        notifications: [
          notification,
          ...state.notifications
        ],
        notificationsND: [
          notification,
          ...state.notificationsND
        ]
      };

    case DELETE_NOTIFICATION:
      return {
        ...state, 
        notifications: state.notifications.map((notification)=> 
          notification.id === action.payload.notificationId ?
          ({...notification, deleted: true}) : notification),
        notificationsND: state.notificationsND.filter((notificationND)=>
          notificationND.id !== action.payload.notificationId)
      }

    case ADD_COLOR_NOTIFICATION:
      return {
        ...state,
        colorNotifications: [
          ...state.colorNotifications, 
          action.payload.colorNotification
        ]
      }

    default:
      return state;
  }
}