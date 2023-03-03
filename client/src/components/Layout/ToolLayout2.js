import React from 'react';
import { connect } from 'react-redux';
import styles from './ToolLayout2.module.scss';
import ColorBar2 from 'components/ColorBar/ColorBar2';
import ColorPanel2 from 'components/ColorPanel/ColorPanel2';
import NotificationList1 from 'components/NotificationList/NotificationList1';

const mapStateToProps = (store)=> ({
  colorRange: store.common.colorRange
});

class ToolLayout2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { colorRange } = this.props;

    return (
      <div className={styles.tool_layout}>
        <div className={styles.notifications}>
          <NotificationList1/>
        </div>
        <div className={styles.background}>
          <ColorBar2
            width="100%"
            height="100%"
            fromDegree={colorRange ? colorRange[0][0] : 0}
            toDegree={colorRange ? colorRange[1][0]: 360}/>
        </div>
        <div className={styles.color_panel}>
          <ColorPanel2/>        
        </div>
      </div>
    )
  }
}

const ConnToolLayout2 = connect(
  mapStateToProps, null)(ToolLayout2);

export default ConnToolLayout2;