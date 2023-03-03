import React from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import styles from './NotificationList1.module.scss';
import NotificationCard1 from 'components/NotificationCard/NotificationCard1';
import { ADD_COLOR_NOTIFICATION } from 'constants/actionTypes';

const mapStateToProps = (store)=> ({
  colorNotifications: store.notification.colorNotifications
});

const mapActionsToProps = (dispatch)=> ({
  addColorNotification: (colorNotification)=> dispatch({
    type: ADD_COLOR_NOTIFICATION,
    payload: {
      colorNotification: colorNotification
    }
  })
});

class NotificationList1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenNotificationList: true
    };
    this.currentTimeout = null;
    this.prevNotificationsLenght = 0;
  }

  componentDidUpdate = ()=> {
    const { colorNotifications } = this.props;

    if(colorNotifications.length != this.prevNotificationsLenght) {
      this.prevNotificationsLenght = colorNotifications.length;

      clearTimeout(this.currentTimeout);
      this.setState({hiddenNotificationList: false});

      this.currentTimeout = setTimeout(()=> {
        this.setState({hiddenNotificationList: true})
      }, 3000);
    }
  }

  render = ()=> {
    const { hiddenNotificationList } = this.state;
    const { colorNotifications } = this.props;

    const styles_notification_list = clsx({
      [styles.notification_list]: true,
      [styles.hidden_notification_list]: hiddenNotificationList,
      [styles.visible_notification_list]: !hiddenNotificationList
    })

    return (
      <div className={styles_notification_list}>
        {colorNotifications.map((colorNotification, index)=> {

          const animationStep = (
          (colorNotifications.length - 1) === index ? 1 : 
          (colorNotifications.length - 2) === index ? 2 :
          (colorNotifications.length - 3) === index ? 3 : 4)

          return <NotificationCard1 
              key={colorNotification.id}
              label={colorNotification.label}
              value={colorNotification.value} 
              animationStep={animationStep}/>
        })}    
      </div>
    )
  }
}

const ConnNotificationList1 = connect(
  mapStateToProps, mapActionsToProps)(NotificationList1);

export default ConnNotificationList1;