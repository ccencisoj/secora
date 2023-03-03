import React from 'react';
import clsx from 'clsx';
import styles from './Field.module.scss';

class Field extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      name,
      label, 
      error,
      placeholder, 
      uppercase,
      onBlur, 
      value,
      onChange 
    } = this.props;

    const styles_field = clsx({
      [styles.field]: true,
      [styles.uppercase]: uppercase
    }); 

    return (
      <div className={styles_field}>
        {label&& <p className={styles.label}>{label}</p>}
        <input type="text" 
          name={name}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}/>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}

export default Field;