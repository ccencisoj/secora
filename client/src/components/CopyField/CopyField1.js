import React from 'react';
import { connect } from 'react-redux';
import styles from './CopyField1.module.scss';
import { ADD_NOTIFICATION } from 'constants/actionTypes';
import { SUCCESS_NOTIFICATION } from 'constants/notificationTypes';

const mapActionsToProps = (dispatch)=> ({
  addNotification: (notification)=> dispatch({
    type: ADD_NOTIFICATION,
    payload: {notification}
  })
});

class CopyField1 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = {
      input: React.createRef()
    };
  }

  copy = ()=> {    
    const { addNotification } = this.props;
    const input = this.ref.input.current;
    input.focus();
    input.setSelectionRange(0, input.value.length);
    document.execCommand("copy");
    addNotification({
      type: SUCCESS_NOTIFICATION,
      message: "Se ha copiado correctamente"
    });
  }

  render = ()=> {
    const { value } = this.props;

    return (
      <div className={styles.copy_field}>
        <input
          className={styles.value} 
          value={value || "..."}  
          ref={this.ref.input}
          onChange={()=> 1}/>
        <button className={styles.copy_button} onClick={this.copy}>copiar</button>
      </div>
    )
  }
}

const ConnCopyField1 = connect(
  null, mapActionsToProps)(CopyField1);

export default ConnCopyField1;