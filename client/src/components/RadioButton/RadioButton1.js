import React from 'react';
import clsx from 'clsx';
import styles from './RadioButton1.module.scss';

class RadioButton1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { image, label, actived, onClick } = this.props;

    const styles_radio_button = clsx({
      [styles.radio_button]: true,
      [styles.actived]: actived,
      [styles.disactived]: !actived
    });

    return (
      <div className={styles_radio_button} onClick={onClick}>
        <div className={styles.circle}></div>
        {image && <img className={styles.image} src={image}/>}
        {label && <p className={styles.label}>{label}</p>}
      </div>
    )
  }
}

export default RadioButton1;