import React from 'react';
import styles from './RangeThumb1.module.scss';

class RangeThumb1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { refThumb } = this.props;

    return (
      <div className={styles.range_thumb1} ref={refThumb}>
        <div className={styles.line}></div>
        <div className={styles.circle}></div>
      </div>
    )
  }
}

export default RangeThumb1;