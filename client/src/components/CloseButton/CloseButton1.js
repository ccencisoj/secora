import React from 'react';
import * as Icon from 'react-feather';
import styles from './CloseButton1.module.scss';

class CloseButton1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { onClick } = this.props;

    return (
      <div className={styles.close_button} onClick={onClick}>
        <Icon.X className={styles.icon} strokeWidth={2}/>
      </div>
    )
  }
}

export default CloseButton1;