import React from 'react';
import styles from './ToolLayout1.module.scss';
import ColorPanel1 from 'components/ColorPanel/ColorPanel1';
import NotificationList1 from 'components/NotificationList/NotificationList1';

class ToolLayout1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const colors = [
      "#fff",
      "#f5f5ff",
      "#f1f1ff",
      "#e9e9ff",
    ];

    return (
      <div className={styles.tool_layout}>
        <div className={styles.notifications}>
          <NotificationList1/>
        </div>
        <div className={styles.color_list}>
          {colors.map((color)=> 
            <div key={color} className={styles.color}  
            style={{backgroundColor: color}}></div>)}
        </div>
        <div className={styles.color_panel}>
          <ColorPanel1/>        
        </div>
      </div>
    )
  }
}

export default ToolLayout1;