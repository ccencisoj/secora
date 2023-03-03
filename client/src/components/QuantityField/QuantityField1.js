import React from 'react';
import styles from './QuantityField1.module.scss';

class QuantityField1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { label, initialValue } = this.props;

    return (
      <div className={styles.quantity_field}>
        <input type="text" 
          className={styles.input}
          defaultValue={initialValue}/>
        <p className={styles.label}>{label}</p>
      </div>
    )
  }
}

export default QuantityField1;