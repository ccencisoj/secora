import React from 'react';
import styles from './SquareButton1.module.scss';

class SquareButton1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { icon: Icon, onClick } = this.props;

    return (
      <button className={styles.square_button} onClick={onClick}>
        <Icon className={styles.icon}/>
      </button>
    )
  }
}

export default SquareButton1;