import React from 'react';
import { connect } from 'react-redux';
import styles from './NotificationList2.module.scss';
import NotificationCard2 from 'components/NotificationCard/NotificationCard2';
import { 
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION 
} from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  notifications: store.notification.notifications,
  notificationsND: store.notification.notificationsND,
  notificationsLength: store.notification.notificationsLength
});

const mapActionsToProps = (dispatch)=> ({
  addNotification: (notification)=> dispatch({
    type: ADD_NOTIFICATION,
    payload: {notification}
  }),
  deleteNotification: (notificationId)=> dispatch({
    type: DELETE_NOTIFICATION,
    payload: {notificationId}
  })
}); 

class NotificationList2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = ()=> {
    const { 
      notificationsND, 
      deleteNotification
    } = this.props;

    if(notificationsND.length > 3) 
      deleteNotification(notificationsND[notificationsND.length - 1].id);
  }

  render = ()=> {
    const { notifications } = this.props;

    return (
      <div className={styles.notification_list}>
        {notifications.map((notification, i)=> {
          return <NotificationCard2 
            key={notification.id} 
            {...notification}/>
        })}
      </div>
    )
  }
}

const ConnNotificationList2 = connect(
  mapStateToProps, mapActionsToProps)(NotificationList2);

export default ConnNotificationList2;