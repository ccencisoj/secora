import React from 'react';
import styles from './ColorNotification1.module.scss';

class ColorNotification1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <div className={styles.color_notification}>
        <p className={styles.label}>Se ha agregado el color</p>
        <p className={styles.color}>VERDE</p>
      </div>
    )
  }
}

export default ColorNotification1;