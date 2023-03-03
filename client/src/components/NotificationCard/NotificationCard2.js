import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import styles from './NotificationCard2.module.scss';
import { DELETE_NOTIFICATION } from 'constants/actionTypes';
import CloseButton1 from 'components/CloseButton/CloseButton1';
import { 
  ERROR_NOTIFICATION, 
  SUCCESS_NOTIFICATION 
} from 'constants/notificationTypes';

const mapActionsToProps = (dispatch)=> ({
  deleteNotification: (notificationId)=> dispatch({
    type: DELETE_NOTIFICATION,
    payload: {notificationId}
  })
}); 

class NotificationCard2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    const { deleteNotification, id: notificationId } = this.props;

    setTimeout(()=> {
      deleteNotification(notificationId);
    }, 3500);
  }

  render = ()=> {
    const { 
      type,
      message, 
      deleted, 
      deleteNotification,
      id: notificationId 
    } = this.props;

    const styles_notification_card = clsx({
      [styles.notification_card]: true,
      [styles.visible]: !deleted,
      [styles.hidden]: deleted,
      [styles.error_notification]: type===ERROR_NOTIFICATION,
      [styles.success_notification]: type===SUCCESS_NOTIFICATION
    });

    return (
      <div className={styles_notification_card}>
        <div className={styles.wrapper}>
          <CloseButton1 onClick={()=> deleteNotification(notificationId)}/>
          <div className={styles.icon_container}>
            {type === ERROR_NOTIFICATION &&
            <Icon.AlertCircle className={styles.icon}/>}
            {type === SUCCESS_NOTIFICATION &&
            <Icon.Check className={styles.icon}/>}
          </div>        
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    )
  }
}

const ConnNotificationCard2 = connect(
  null, mapActionsToProps)(NotificationCard2);

export default ConnNotificationCard2;