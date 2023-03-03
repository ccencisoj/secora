import React from 'react';
import clsx from 'clsx';
import styles from './NotificationCard1.module.scss';

class NotificationCard1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { label, value, animationStep } = this.props;

    const styles_notification_card = clsx({
      [styles.notification_card]: true,
      [styles.animation_step_one]: animationStep === 1,
      [styles.animation_step_two]: animationStep === 2,
      [styles.animation_step_three]: animationStep === 3,
      [styles.animation_step_four]: animationStep === 4,
    }); 

    return (
      <div className={styles_notification_card}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    )
  }
}

export default NotificationCard1;